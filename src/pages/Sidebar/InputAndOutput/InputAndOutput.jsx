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
  token: theme === 'light' ? 'token-light' : 'token-dark',
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
        <h2 className={`${themeStyles.headlineTwo} border-l-3 border-green-600 pl-1.5 mb-3`}>
          CONSOLE INPUT AND OUTPUT
        </h2>
        <h3 className={`${themeStyles.headlineFour} border-l-3 border-transparent pl-1.5`}>
          CONSOLE INPUT
        </h3>
        <p className={`${themeStyles.paragraph} border-l-3 border-transparent pl-1.5`}>
          Unlike some programming environments, JavaScript in browsers doesn't support direct
          console input. However, you can simulate input using built-in dialog functions such as:
        </p>
        <div className="mb-6 pl-1.5 border-l-3 border-transparent">
          <div className="overflow-x-auto">
            <div className="min-w-full">
              <CodeHighlighter
                code={INPUT_AND_OUTPUT.INPUT_PROMPT}
                language="javascript"
                title="prompt.js"
              />
            </div>
          </div>
        </div>
        <h3 className={`${themeStyles.headlineFour} pl-1.5 border-l-4 border-transparent`}>
          CONSOLE OUTPUT
        </h3>
        <div className="border-l-3 border-transparent pl-1.5">
          <p className={`${themeStyles.paragraph} `}>
            The simplest form of output in javascript is to use the browser console. Developers use
            it for debugging purposes and even sometimes display status messages. Commonly methods
            include the following :
          </p>
          <ul>
            <li className={`${themeStyles.paragraph}`}>
              <span className={`${themeStyles.token}`}> console.log() </span> &nbsp; : Prints
              particular messages to the browser console.
            </li>
            <li className={`${themeStyles.paragraph}`}>
              <span className={`${themeStyles.token}`}> console.warn() </span> &nbsp; : Prints
              warning messages.
            </li>
            <li className={`${themeStyles.paragraph}`}>
              <span className={`${themeStyles.token}`}> console.error() </span> &nbsp; : Prints
              error messages.
            </li>
          </ul>
          <div className="overflow-x-auto mb-3">
            <div className="min-w-full">
              <CodeHighlighter
                code={INPUT_AND_OUTPUT.OUTPUT_LOG}
                language="javascript"
                title="log.js"
              />
            </div>
          </div>
          <div className="overflow-x-auto mb-3">
            <div className="min-w-full">
              <CodeHighlighter
                code={INPUT_AND_OUTPUT.OUTPUT_WARN}
                language="javascript"
                title="warning.js"
              />
            </div>
          </div>
          <div className="overflow-x-auto mb-3">
            <div className="min-w-full">
              <CodeHighlighter
                code={INPUT_AND_OUTPUT.OUTPUT_ERROR}
                language="javascript"
                title="error.js"
              />
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
