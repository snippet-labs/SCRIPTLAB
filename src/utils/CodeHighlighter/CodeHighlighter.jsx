import React, { useEffect, useRef } from 'react';

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

const CodeHighlighter = ({ code, language, showLineNumbers = true, title }) => {
  const codeRef = useRef(null); ;

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [code, language]);

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(code);
      // NEED TO ADD TOAST FOR NOTIFICATION
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="w-full max-w-full overflow-hidden rounded-lg bg-[#2d2d2d] shadow-lg">
      {/* CODE BLOCK HEADER */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#1e1e1e]">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          {title && <span className="ml-4 text-sm text-gray-400">{title}</span>}
        </div>
        <button
          onClick={handleCopyClick}
          className="p-1 text-gray-400 hover:text-white transition-colors"
          title="Copy code"
        >
          <FaRegCopy size={18} />
        </button>
      </div>

      {/* CODE CONTAINER */}
      <div className="overflow-x-auto">
        <pre className={`p-4 ${showLineNumbers ? 'line-numbers' : ''}`}>
          <code ref={codeRef} className={`language-${language}`}>
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default CodeHighlighter;
