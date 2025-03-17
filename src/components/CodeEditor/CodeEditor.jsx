import React, { useEffect, useRef, useMemo, memo, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation, useInView } from 'framer-motion';

// ICONS
import { FaSun, FaMoon } from 'react-icons/fa';
import { RiHome9Line } from 'react-icons/ri';

// STORE
import useThemeStore from '../../utils/Store/themeStore';

// LOTTIE

// COMPONENTS
import UnderDevelopment from '.././../pages/UnderDevelopment';

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
  hover: theme === 'light' ? 'hover:bg-gray-300' : 'hover:bg-zinc-800',
  sidebar:
    theme === 'light'
      ? 'bg-light border-black *: hover:bg-gray-300'
      : 'bg-zinc-850 border-gray-500',
  sidebarToggleButton:
    theme === 'light'
      ? 'transition-all duration-75 text-black hover:text-green-600 cursor-pointer'
      : 'transition-all duration-75 text-white hover:text-green-600 cursor-pointer',
  background: theme === 'light' ? 'bg-light' : 'bg-dark',
  infoBlock: theme === 'light' ? 'infoblock-light' : 'infoblock-dark',
  capsule: theme === 'light' ? 'bg-green-800/30' : 'bg-green-800/30',
  capsuleContent: theme === 'light' ? 'text-green-600' : 'text-green-800',
  cardButton: theme === 'light' ? 'bg-gray-300 text-black' : 'bg-gray-100',
});

const CodeEditor = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  // MEMOIZE ERROR CONTENT
  const CodeEditorContent = useMemo(
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
  return (
    <motion.div
      ref={ref}
      className="min-h-screen overflow-x-hidden"
      variants={CONTAINER_VARIANTS}
      initial="hidden"
      animate={controls}
    >
      <div>
        {CodeEditorContent} <UnderDevelopment />
      </div>
    </motion.div>
  );
};

export default memo(CodeEditor);
