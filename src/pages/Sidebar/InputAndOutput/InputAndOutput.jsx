import React, { useEffect, useRef, useMemo, memo } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

// STORE
import useThemeStore from '../../../utils/Store/themeStore';

// COMPONENTS
import Footer from '../../../components/Footer/Footer';
import CodeHighlighter from '../../../utils/CodeHighlighter/CodeHighlighter';

// CODE SNIPPET 
import { INPUT_AND_OUTPUT } from './CodeSnippet';

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
  headlineThree:
    theme === 'light'
      ? 'headline-three headline-three-light'
      : 'headline-three headline-three-dark',
  headlineFour:
    theme === 'light' ? 'headline-four headline-four-light' : 'headline-four headline-four-dark',
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

const InputAndOutput = () => {
  // THEME STORE
  const theme = useThemeStore((state) => state.theme);

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

  // MEMOIZE ERROR CONTENT
  const InputAndOutputSection = useMemo(
    () => (
      <div className="flex flex-col">
        <h1 className={`${themeStyles.headlineOne}`}> INPUTS AND OUTPUTS </h1>
        <p className={`${themeStyles.paragraph} mt-3 mb-3`}>
          Handling input and output is essential for creating interactive web pages and
          applications. This chapter focuses on the various methods available in JavaScript for
          receiving input from users and displaying output.
        </p>
        <h2 className={`${themeStyles.headlineTwo} border-l-4 border-green-600 pl-4 mb-3`}>
          CONSOLE INPUT AND OUTPUT
        </h2>
        <h3 className={`${themeStyles.headlineFour} border-l-4 border-transparent pl-4`}>
          CONSOLE OUTPUT
        </h3>
        <p className={`${themeStyles.paragraph} border-l-4 border-transparent pl-4`}>
          Unlike some programming environments, JavaScript in browsers doesn't support direct
          console input. However, you can simulate input using built-in dialog functions such as:
        </p>
        <div className="mb-6 pl-4 border-l-4 border-transparent">
          <div className="overflow-x-auto">
            <div className="min-w-full">
              <CodeHighlighter code={INPUT_AND_OUTPUT.INPUT_PROMPT} language="javascript" title="prompt.js" />
            </div>
          </div>
        </div>
      </div>
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
      {InputAndOutputSection}
      <Footer />
    </motion.div>
  );
};

export default memo(InputAndOutput);
