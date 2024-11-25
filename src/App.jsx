import React, { useState } from 'react';
import { useSpring, animated, config } from 'react-spring';
import { PlusIcon, GithubIcon, LinkedinIcon } from 'lucide-react';
import NoteGrid from './components/NoteGrid';
import NoteModal from './components/NoteModal';
import Pagination from './components/Pagination';
import Toast from './components/Toast';
import { useNotes } from './hooks/useNotes';

export default function App() {
  const {
    notes,
    currentPage,
    totalPages,
    isLoading,
    error,
    setCurrentPage,
    addNote,
    updateNote,
    deleteNote,
    togglePin,
  } = useNotes();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: config.molasses,
  });

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
  };

  const handleSaveNote = (note) => {
    if (editingNote) {
      updateNote(editingNote.id, note);
      showToast('Note updated successfully', 'success');
    } else {
      addNote(note);
      showToast('Note added successfully', 'success');
    }
    setIsModalOpen(false);
    setEditingNote(null);
  };

  const handleDeleteNote = (id) => {
    deleteNote(id);
    showToast('Note deleted successfully', 'success');
  };

  const handleTogglePin = (id, isPinned) => {
    togglePin(id, isPinned);
    showToast(isPinned ? 'Note unpinned' : 'Note pinned', 'success');
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
    setIsModalOpen(true);
  };

  return (
    <animated.div style={fadeIn} className="min-h-screen bg-[#ffffff] text-[#025951] flex flex-col">
      <header className="py-7 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-extrabold mb-2 font-dmSerif mb-4">
            LeafNote 
            {/* <span className="bg-[#025951] text-[#efefe5] px-2 py-1 rounded-md">Note</span> */}
          </h1>
          <p className="text-xl text-[#025951] opacity-100 font-dmSerif">Capture your thoughts, anytime, anywhere</p>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-end mb-8">
          <button
            className="bg-[#025951] text-[#efefe5] font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-opacity-90 transition duration-300 flex items-center transform hover:scale-105"
            onClick={() => {
              setEditingNote(null);
              setIsModalOpen(true);
            }}
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            <span className='font-mono'>Add New Note</span>
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#025951]"></div>
          </div>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <NoteGrid
            notes={notes}
            onEdit={handleEditNote}
            onDelete={handleDeleteNote}
            onTogglePin={handleTogglePin}
          />
        )}

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </main>

      <footer className="mt-auto py-4 px-6 border-t border-[#025951]">
        <div className="container mx-auto flex justify-between items-center">
          <p className="text-sm font-dmSerif">Created by Om Kanhe🍀</p>
          <div className="flex space-x-4">
            <a href="https://github.com/OmKanhe" target="_blank" rel="noopener noreferrer" className="text-[#025951] hover:text-opacity-75 transition-colors">
              <GithubIcon size={20} />
            </a>
            <a href="https://www.linkedin.com/in/om-kanhe-828987206/" target="_blank" rel="noopener noreferrer" className="text-[#025951] hover:text-opacity-75 transition-colors">
              <LinkedinIcon size={20} />
            </a>
          </div>
        </div>
      </footer>
      {isModalOpen && (
        <NoteModal
          note={editingNote}
          onClose={() => {
            setIsModalOpen(false);
            setEditingNote(null);
          }}
          onSave={handleSaveNote}
        />
      )}
      <Toast {...toast} />
    </animated.div>
  );
}




