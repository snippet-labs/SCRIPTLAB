import React, { useEffect, useRef, useMemo, memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation, useInView } from 'framer-motion';

// ICONS
import { FaSun, FaMoon } from 'react-icons/fa';
import { RiHome9Line } from 'react-icons/ri';
import { TbDeviceMobileCancel } from 'react-icons/tb';
import { FaPlay } from 'react-icons/fa';

// STORE
import useThemeStore from '../../utils/Store/themeStore';

// CODE SNIPPET
import { CODE_EDITOR_DEFAULT } from './CodeSnippet';

// COMPONENTS
import UnderDevelopment from '.././../pages/UnderDevelopment';
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
  paragraph: theme === 'light' ? 'paragraph-document-light' : 'paragraph-document-dark',
  nav: theme === 'light' ? 'bg-light border-black' : 'bg-dark border-zinc-500',
  navHover: theme === 'light' ? 'hover:border-gray-400' : 'hover:border-gray-300',
  text: theme === 'light' ? 'text-black' : 'text-white',
  background: theme === 'light' ? 'bg-light' : 'bg-dark',
  infoBlock: theme === 'light' ? 'infoblock-light' : 'infoblock-dark',
  icon: theme === 'light' ? 'text-green-800' : 'text-green-300',
});

// FUNCTION TO RUN THE CODE
const runCode = () => {
  // CLEARING OUT THE DEFAULT CODE IN THE EDITOR
  setOutput('');
  const originalConsoleLog = console.log;
  const logs = [];

  // OVERRIDING CONSOLE.LOG TO CAPTURE THE OUTPUT
  console.log = (...args) => {
    logs.push(
      args
        .map((arg) => (typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)))
        .join(' ')
    );
  };

  try {
    // EXECUTE THE CODE
    eval(code);
    setOutput(logs.join('\n'));
  } catch (error) {
    setOutput(`ERROR: ${error.message}`);
  } finally {
    // RESTORING THE ORIGINAL DEFAULT CODE
    console.log = originalConsoleLog;
  }
};

// FUNCTION TO TOGGLE THE TERMINAL
const toggleTerminal = () => {
  setTerminalOpen(!isTerminalOpen);
};

const CodeEditor = () => {
  // APPLICATION STATES
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [code, setCode] = useState(CODE_EDITOR_DEFAULT);
  const [output, setOutput] = useState('');
  const [isTerminalOpen, setTerminalOpen] = useState(true);

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
          {/* WARNING FOR SMALLER SCREEN DISPLAYS */}
          <div
            className={`${themeStyles.background} ${themeStyles.text} lg:hidden min-h-[500px] p-4 flex items-center justify-center`}
          >
            <div className="text-center space-y-4">
              <TbDeviceMobileCancel size={90} className={`${themeStyles.icon} m-auto mb-5`} />
              <p className={`${themeStyles.text}`}>
                {' '}
                scriptground is optimized for desktop screens only. To use it to it's full potential
                please use a larger screen for the best experience we intended for you have !
              </p>
            </div>
          </div>
          {/* DESKTOP SCREEN */}
          <div className={`hidden lg:flex h-screen text-white pb-5`}>
            {/* SIDEBAR */}
            <div className={`w-16 bg-green-900 p-4 flex flex-col items-center gap-6 rounded-xl mr-4`}>
              <button
                onClick={runCode}
                className={`p-2 hover:text-black hover:cursor-pointer rounded-full transition-colors`}
                title="CodeRunner"
              >
                <FaPlay size={18}/>
              </button>
            </div>
          </div>
          <Footer />
        </div>
      </>
    ),
    [themeStyles]
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
