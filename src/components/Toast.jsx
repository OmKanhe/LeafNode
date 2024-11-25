import React from 'react';
import { useTransition, animated } from 'react-spring';
import { CheckCircleIcon, XCircleIcon } from 'lucide-react';

const Toast = ({ show, message, type }) => {
  const transitions = useTransition(show, {
    from: { opacity: 0, transform: 'translateY(100%)' },
    enter: { opacity: 1, transform: 'translateY(0%)' },
    leave: { opacity: 0, transform: 'translateY(100%)' },
  });

  return transitions(
    (style, item) =>
      item && (
        <animated.div
          style={style}
          className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg ${
            type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white flex items-center`}
        >
          {type === 'success' ? (
            <CheckCircleIcon className="w-6 h-6 mr-2" />
          ) : (
            <XCircleIcon className="w-6 h-6 mr-2" />
          )}
          {message}
        </animated.div>
      )
  );
};

export default Toast;