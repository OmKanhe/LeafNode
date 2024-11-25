import { db } from '../config/firebase.js';
import { collection, query, orderBy, limit, startAfter, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const NOTES_PER_PAGE = 6;

export const fetchNotes = async (page) => {
  const notesRef = collection(db, 'notes');
  const baseQuery = query(
    notesRef,
    orderBy('pinned', 'desc'),
    orderBy('lastEdited', 'desc'),
    limit(NOTES_PER_PAGE)
  );

  let finalQuery = baseQuery;

  if (page > 1) {
    const previousSnapshots = await getDocs(baseQuery); 
    const lastVisible = previousSnapshots.docs[previousSnapshots.docs.length - 1];

    if (lastVisible) {
      finalQuery = query(
        notesRef,
        orderBy('pinned', 'desc'),
        orderBy('lastEdited', 'desc'),
        startAfter(lastVisible),
        limit(NOTES_PER_PAGE)
      );
    } else {
      throw new Error("No documents to paginate from");
    }
  }

  const snapshot = await getDocs(finalQuery);
  const notes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  
  const totalNotesSnapshot = await getDocs(collection(db, 'notes'));
  const totalNotes = totalNotesSnapshot.size;
  const totalPages = Math.ceil(totalNotes / NOTES_PER_PAGE);

  return { notes, totalPages };
};


export const addNote = async (note) => {
  const notesRef = collection(db, 'notes');
  const docRef = await addDoc(notesRef, { ...note, lastEdited: new Date() });
  return docRef.id;
};

export const updateNote = async (id, note) => {
  const noteRef = doc(db, 'notes', id);
  await updateDoc(noteRef, { ...note, lastEdited: new Date() });
};

export const deleteNote = async (id) => {
  const noteRef = doc(db, 'notes', id);
  await deleteDoc(noteRef);
};

export const togglePin = async (id, isPinned) => {
  const noteRef = doc(db, 'notes', id);
  await updateDoc(noteRef, { pinned: !isPinned, lastEdited: new Date() });
};
