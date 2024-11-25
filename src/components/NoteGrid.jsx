import React from 'react';
import { useTransition, animated } from 'react-spring';
import NoteCard from './NoteCard';

const NoteGrid = ({ notes, onEdit, onDelete, onTogglePin }) => {
  if (!notes || notes.length === 0) {
    return (
      <p className="text-center text-lg text-[#025951] opacity-75">
        No notes found. Create a new note to get started!
      </p>
    );
  }

  const transitions = useTransition(notes, {
    keys: note => note.id,
    from: { opacity: 0, transform: 'scale(0.3)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    // leave: { opacity: 0, transform: 'scale(0.9)' },
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {transitions((style, note) => (
        <animated.div style={style} key={note.id}>
          <NoteCard
            note={note}
            onEdit={onEdit}
            onDelete={onDelete}
            onTogglePin={onTogglePin}
          />
        </animated.div>
      ))}
    </div>
  );
};

export default NoteGrid;