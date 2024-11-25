import { useState, useEffect } from 'react';
import * as api from '../api/api';

export const useNotes = () => {
  const [notes, setNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, [currentPage]);

  const fetchNotes = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { notes, totalPages } = await api.fetchNotes(currentPage);
      setNotes(notes);
      setTotalPages(totalPages);
    } catch (err) {
      console.log(err);
      
      setError('Failed to fetch notes');
    } finally {
      setIsLoading(false);
    }
  };

  const addNote = async (note) => {
    try {
      await api.addNote(note); 
      fetchNotes(); 
    } catch (err) {
      setError('Failed to add note');
    }
  };
  

  const updateNote = async (id, note) => {
    try {
      await api.updateNote(id, note);
      fetchNotes();
    } catch (err) {
      setError('Failed to update note');
    }
  };

  const deleteNote = async (id) => {
    try {
      await api.deleteNote(id);
      fetchNotes();
    } catch (err) {
      setError('Failed to delete note');
    }
  };

  const togglePin = async (id, isPinned) => {
    try {
      await api.togglePin(id, isPinned);
      fetchNotes();
    } catch (err) {
      setError('Failed to toggle pin');
    }
  };

  return {
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
  };
};