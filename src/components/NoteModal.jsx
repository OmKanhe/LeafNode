import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { XIcon } from 'lucide-react';

const NoteModal = ({ note, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setTagline(note.tagline);
      setBody(note.body);
    }
  }, [note]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, tagline, body, pinned: note ? note.pinned : false });
  };

  const modalSpring = useSpring({
    opacity: 1,
    transform: 'translateY(0%)',
    from: { opacity: 0, transform: 'translateY(-50%)' },
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <animated.div style={modalSpring} className="bg-white rounded-lg p-8 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{note ? 'Edit Note' : 'Add New Note'}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XIcon className="w-6 h-6" />
          </button>
        </div>
        <form className='font-mono' onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Tagline"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          />
          <textarea
            placeholder="Body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full p-2 mb-4 border rounded h-32"
            required
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#025951] text-white font-semibold py-2 px-4 rounded hover:opacity-90 transition duration-300"
            >
              Save Note
            </button>
          </div>
        </form>
      </animated.div>
    </div>
  );
};

export default NoteModal;