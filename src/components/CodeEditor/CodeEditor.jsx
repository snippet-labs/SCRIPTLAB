import React, { useEffect, useRef, useMemo, memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation, useInView } from 'framer-motion';
import Editor from '@monaco-editor/react';

// ICONS
import { FaSun, FaMoon } from 'react-icons/fa';
import { RiHome9Line } from 'react-icons/ri';
import { TbDeviceMobileCancel } from 'react-icons/tb';
import { FaPlay } from 'react-icons/fa';
import { IoTerminal } from 'react-icons/io5';
import { IoSettings } from 'react-icons/io5';

// STORE
import useThemeStore from '../../utils/Store/themeStore';

// CODE SNIPPET
import { CODE_EDITOR_DEFAULT } from './CodeSnippet';

// COMPONENTS
import Footer from '../Footer/Footer';

// CONSTANTS
const CONTAINER_VARIANTS = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

// THEME STYLE GENERATOR
const getThemeStyles = (theme) => ({
  headlineOne:
    theme === 'light' ? 'headline-one headline-one-light' : 'headline-one headline-one-dark',
  headlineTwo:
    theme === 'light' ? 'headline-two headline-two-light' : 'headline-two headline-two-dark',
  headlineFour:
    theme === 'light' ? 'headline-four headline-four-light' : 'headline-four headline-four-dark',
  paragraph: theme === 'light' ? 'paragraph-document-light' : 'paragraph-document-dark',
  nav: theme === 'light' ? 'bg-light border-black' : 'bg-dark border-zinc-500',
  navHover: theme === 'light' ? 'hover:border-gray-400' : 'hover:border-gray-300',
  text: theme === 'light' ? 'text-black' : 'text-white',
  background: theme === 'light' ? 'bg-light' : 'bg-dark',
  infoBlock: theme === 'light' ? 'infoblock-light' : 'infoblock-dark',
  icon: theme === 'light' ? 'text-green-800' : 'text-green-300',
});

const CodeEditor = () => {
  // APPLICATION STATES
  const [code, setCode] = useState(CODE_EDITOR_DEFAULT);
  const [output, setOutput] = useState('');
  const [isTerminalOpen, setIsTerminalOpen] = useState(true);

  // FUNCTION TO RUN THE CODE
  const runCode = () => {
    setOutput('');
    const originalConsoleLog = console.log;
    const logs = [];

    // REPLACING THE DEFAULT CODE SNIPPET
    console.log = (...args) => {
      logs.push(
        args
          .map((arg) => (typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)))
          .join(' ')
      );
    };

    try {
      // CODE EXECUTION
      eval(code);
      setOutput(logs.join('\n'));
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    } finally {
      // RESTORING THE ORIGINAL CODE
      console.log = originalConsoleLog;
    }
  };

  // NEW: Automatically run code on every change
  useEffect(() => {
    runCode();
  }, [code]);

  // FUNCTION TO TOGGLE THE TERMINAL
  const toggleTerminal = () => {
    setIsTerminalOpen(!isTerminalOpen);
  };

  // THEME STORE
  const { theme, toggleTheme } = useThemeStore();

  // FRAMER MOTION SETUP
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, threshold: 0.3 });
  const controls = useAnimation();

  // MEMOIZED THEME STYLES
  const themeStyles = useMemo(() => getThemeStyles(theme), [theme]);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [inView, controls]);

  // MEMOIZE CODE EDITOR NAVIGATION
  const CodeEditorNavigation = useMemo(
    () => (
      <>
        <nav className={`${themeStyles.nav} border-b fixed top-0 w-full z-50`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center backdrop-blur-3xl">
                <h1 className={`font-cursive ml-3 font-bold text-2xl ${themeStyles.text}`}>
                  scriptground
                </h1>
              </div>

              {/* MOBILE MENU BUTTON AND THEME TOGGLE */}
              <div className="flex items-center space-x-4">
                <Link to="/">
                  <RiHome9Line
                    size={25}
                    className={`${themeStyles.text} hover:text-green-600 hover:cursor-pointer transition-all`}
                  />
                </Link>
                <button
                  onClick={toggleTheme}
                  className={`${themeStyles.text} hover:text-green-600 hover:cursor-pointer transition-all`}
                >
                  {theme === 'dark' ? <FaSun size={20} /> : <FaMoon size={20} />}
                </button>
              </div>
            </div>
          </div>
        </nav>
      </>
    ),
    [themeStyles]
  );

  // MEMOIZE THE CODE EDITOR CONTENT
  const CodeEditorContent = useMemo(
    () => (
      <>
        {CodeEditorNavigation}
        <div className="pt-30 px-4 md:px-9 lg:px-9">
          {/* MOBILE WARNING */}
          <div className="lg:hidden flex  h-[500px] text-white p-4 items-center justify-center">
            <div className="flex items-center flex-col text-center space-y-4">
              <TbDeviceMobileCancel size={80} className={`${themeStyles.icon}`} />
              <h1 className={`${themeStyles.headlineFour}`}>ALERT</h1>
              <p className={`${themeStyles.text}`}>
                <span>scriptground</span> is optimized to be used in larger screens. Please move to a large screen so that you can experience the best of what you we have built for you.
              </p>
            </div>
          </div>

          {/* DESKTOP EDITOR */}
          <div className="hidden lg:flex h-screen text-white mb-5">
            {/* SIDEBAR */}
            <div className="w-12 bg-green-950/80 p-4 flex flex-col items-center gap-6 rounded-xl mr-2">
              <button
                onClick={toggleTerminal}
                className={`p-2 rounded-lg hover:cursor-pointer transition-colors ${
                  isTerminalOpen ? 'text-white' : 'text-gray-800'
                }`}
                title="Toggle Terminal"
              >
                <IoTerminal className="w-6 h-6" />
              </button>
            </div>

            {/* MAIN CONTENT */}
            <div className="flex-1 flex flex-col gap-2">
              {/* EDITOR */}
              <div
                className={`${isTerminalOpen ? 'h-2/3' : 'h-[900px]'} transition-all duration-300 overflow-hidden border-1 border-white rounded-xl`}
              >
                <Editor
                  height="100%"
                  defaultLanguage="javascript"
                  theme="vs-dark"
                  value={code}
                  onChange={(value) => setCode(value || '')}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 12,
                    padding: { top: 30 },
                    scrollBeyondLastLine: false,
                    lineNumbers: 'on',
                    roundedSelection: false,
                    automaticLayout: true,
                  }}
                  className="rounded-xl overflow-hidden"
                />
              </div>

              {/* TERMINAL */}
              <motion.div
                className=" bg-green-950/80 p-4 font-mono text-sm overflow-auto rounded-xl transition-all duration-300"
                animate={isTerminalOpen ? { height: '33vh', opacity: 1 } : { height: '7vh', opacity: 1 }}
                initial={{ height: '33vh', opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-2 mb-3 text-white">
                  <IoTerminal className="w-4 h-4" />
                  <span>OUTPUT</span>
                </div>
                <pre className="whitespace-pre-wrap">{output}</pre>
              </motion.div>
            </div>
          </div>
          <Footer />
        </div>
      </>
    ),
    [themeStyles, isTerminalOpen, output]
  );
  return (
    <motion.div
      ref={ref}
      className="overflow-x-hidden"
      variants={CONTAINER_VARIANTS}
      initial="hidden"
      animate={controls}
    >
      {CodeEditorContent}
    </motion.div>
  );
};

export default memo(CodeEditor);
