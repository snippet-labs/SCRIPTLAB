import  { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
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

const CodeHighlighter = ({ code, language, showLineNumbers = true, title }) => {
  const codeRef = useRef(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [code, language]);

  // HANDLE ONCLICK EVENT
  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
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
          className="p-1 text-gray-400 hover:text-white hover:cursor-pointer transition-colors"
          title="Copy code"
        >
          {copied ? <FaCheck size={18} /> : <FaRegCopy size={18} />}
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

CodeHighlighter.propTypes = {
  code: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  showLineNumbers: PropTypes.bool,
  title: PropTypes.string,
};

CodeHighlighter.defaultProps = {
  showLineNumbers: true,
};

export default CodeHighlighter;
