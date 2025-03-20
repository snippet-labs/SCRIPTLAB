import React, { useState, useEffect, useRef } from 'react';

// REACT HOT TOAST
// import toast, { Toaster } from 'react-hot-toast';

// PRISMJS
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-python';

// ICONS
import { FaRegCopy } from 'react-icons/fa6';
import { FaCheck } from 'react-icons/fa6';

const Console = ({ message, language, showLineNumbers = true }) => {
  const consoleRef = useRef(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (consoleRef.current) {
      Prism.highlightElement(consoleRef.current);
    }
  }, [message, language]);

  // HANDLE ONCLICK EVENT
  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      // toast.success("Code copied!", {
      //   position: 'top-center'
      // })
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Failed to copy code:', err);
      // toast.warning("Code copied!", {
      //   position: 'top-center'
      // })
    }
  };

  return (
    <div className="w-full max-w-full overflow-hidden rounded-lg bg-[#2d2d2d] shadow-lg">
      {/* CODE BLOCK HEADER */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#1e1e1e]">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            {' '}
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
        </div>
        <button
          onClick={handleCopyClick}
          className="p-1 text-gray-400 hover:text-white transition-colors"
          title="Copy code"
        >
          {copied ? <FaCheck size={18} /> : <FaRegCopy size={18} />}
        </button>
        {/* <Toaster/> */}
      </div>

      {/* CODE CONTAINER */}
      <div className="overflow-x-auto">
        <pre className={`p-4 ${showLineNumbers ? 'line-numbers' : ''}`}>
          <code ref={consoleRef} className={`language-${language}`}>
            {message}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default Console;
