// import React from 'react';
// import { useSpring, animated } from 'react-spring';
// import { PinIcon, EditIcon, TrashIcon } from 'lucide-react';

// const NoteCard = ({ note, onEdit, onDelete, onTogglePin }) => {
//   const spring = useSpring({
//     scale: 1,
//     from: { scale: 0.8 },
//     config: { tension: 300, friction: 10 },
//   });

//   if (!note) {
//     return null;
//   }

//   const { id, title, tagline, body, pinned } = note;

//   return (
//     <animated.div
//       style={spring}
//       className="bg-[#efefe5] rounded-lg shadow-lg p-6 flex flex-col justify-between h-full"
//     >
//       <div>
//         <h3 className="text-xl font-bold mb-2 text-[#025951]">{title || 'Untitled'}</h3>
//         <p className="text-sm text-[#025951] opacity-75 mb-2">{tagline || 'No tagline'}</p>
//         <p className="text-[#025951]">{body || 'No content'}</p>
//       </div>
//       <div className="flex justify-between items-center mt-4">
//         <button
//           onClick={() => onTogglePin(id, pinned)}
//           className={`p-2 rounded-full ${pinned ? 'bg-[#1a3634] text-[#efefe5]' : 'bg-[#efefe5] text-[#025951] border border-[#025951]'}`}
//         >
//           <PinIcon className="w-4 h-4" />
//         </button>
//         <div>
//           <button
//             onClick={() => onEdit(note)}
//             className="p-2 bg-[#b2f3cc] text-[#000000] rounded-full mr-2"
//           >
//             <EditIcon className="w-4 h-4" />
//           </button>
//           <button
//             onClick={() => onDelete(id)}
//             className="p-2 bg-[#b2f3cc] text-[#000000] rounded-full"
//           >
//             <TrashIcon className="w-4 h-4" />
//           </button>
//         </div>
//       </div>
//     </animated.div>
//   );
// };

// export default NoteCard;



import React from 'react';
import { useSpring, animated } from 'react-spring';
import { PinIcon, EditIcon, TrashIcon } from 'lucide-react';

const NoteCard = ({ note, onEdit, onDelete, onTogglePin }) => {
  const spring = useSpring({
    scale: 1,
    from: { scale: 0.8 },
    config: { tension: 300, friction: 10 },
  });

  if (!note) {
    return null;
  }

  const { id, title, tagline, body, pinned } = note;

  return (
    <animated.div
      style={spring}
      className={`bg-[#efefe5] rounded-lg shadow-lg p-6 flex flex-col justify-between h-full transform transition-all duration-300 hover:scale-105 hover:rotate-1 hover:shadow-xl cursor-pointer ${
        pinned ? 'border-2 border-[#025951]' : ''
      }`}
      onClick={() => onEdit(note)}
    >
      <div className=''>
        <h3 className="text-xl font-bold mb-2 text-[#025951]">{title || 'Untitled'}</h3>
        <p className="text-sm mb-2 text-[#025951] opacity-75">{tagline || 'No tagline'}</p>
        <p className="text-[#025951] overflow-hidden text-ellipsis max-h-20 line-clamp-3">{body || 'No content'}</p>
      </div>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onTogglePin(id, pinned);
          }}
          className={`p-2 rounded-full transition-colors ${
            pinned ? 'bg-[#025951] text-[#efefe5]' : 'bg-[#efefe5] text-[#025951] border border-[#025951]'
          }`}
        >
          <PinIcon className="w-4 h-4" />
        </button>
        <div className="flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(note);
            }}
            className="p-2 bg-[#025951] text-[#efefe5] rounded-full hover:bg-opacity-90 transition-colors"
          >
            <EditIcon className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(id);
            }}
            className="p-2 bg-[#025951] text-[#efefe5] rounded-full hover:bg-opacity-90 transition-colors"
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </animated.div>
  );
};

export default NoteCard;
