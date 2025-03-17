import React, { useRef, useEffect, useMemo, memo } from 'react';
import Lottie from 'lottie-react';
import { Link } from 'react-router-dom';

// STORE
import useThemeStore from '../../utils/Store/themeStore';

// COMPONENTS
import Pagination from '../../utils/Pagination/Pagination';
import Chapter from '../../utils/Chapter/Chapter';
import Footer from '../../components/Footer/Footer';

// ICONS
import { FaCode } from 'react-icons/fa';

// FRAMER MOTION
import { motion, useAnimation, useInView } from 'framer-motion';

// LOTTIE
import Homelottie from '../../../public/lottie/Homelottie.json';

// REACT SYNTAX HIGHLIGHTER
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

// CONSTANTS
const CODE_SNIPPETS = {
  HomeCodeString: 'console.log("Snippet team is here!")',
  HomeCodeConsole: 'Snippet team is here!',
};

const CONTAINER_VARIANTS = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

// MEMOIZED STYLED COMPONENTS
const MemoizedSyntaxHighlighter = memo(({ theme, children }) => (
  <SyntaxHighlighter
    language="javascript"
    style={atomOneDark}
    className={`${theme === 'light' ? 'snippet-light' : 'snippet-dark'}`}
  >
    {children}
  </SyntaxHighlighter>
));

// THEME TOGGLER
const getThemeStyles = (theme) => ({
  headlineOne:
    theme === 'light' ? 'headline-one headline-one-light' : 'headline-one headline-one-dark',
  headlineTwo:
    theme === 'light' ? 'headline-two headline-two-light' : 'headline-two headline-two-dark',
  paragraph: theme === 'light' ? 'paragraph-document-light' : 'paragraph-document-dark',  
  infoBlock: theme === 'light' ? 'infoblock-light' : 'infoblock-dark', 
  editorButton: theme === 'light' ? 'tryityourself' : 'tryityourself',
  icon: theme === 'light' ? 'text-black' : 'text-white',
});

const HomePage = () => {
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

  // MEMOIZE HEADER SECTIONS
  const HeaderSection = useMemo(
    () => (
      <>
        <h1
          className={`${themeStyles.headlineOne} max-w-[15ch] sm:max-w-[20ch] lg:max-w-[15ch] mt-5 mb-8 lg:mb-10 tracking-wider text-justify`}
        >
          SCRIPTLAB;
        </h1>

        <p className={themeStyles.paragraph}>
          Welcome to {import.meta.env.VITE_SECRET}, Your one stop JavaScript solution.
        </p>

        <p className={themeStyles.paragraph}>
          Do you know? JavaScript holds a unique position as both the most cherished and the most
          critized programming language in the world.
        </p>

        <p className={themeStyles.paragraph}>
          But why do you think some developers dislike it? The hard truth is, many frustrations stem
          from a lack of understanding of its core principles.
        </p>
      </>
    ),
    [themeStyles]
  );

  // MEMOIZE CODE SECTIONS
  const CodeSection = useMemo(
    () => (
      <>
        <h2
          className={`${themeStyles.headlineTwo} max-w-[15ch] sm:max-w-[20ch] lg:max-w-[15ch] mt-5 mb-8 lg:mb-10 tracking-wider`}
        >
          LETS MAKE JAVASCRIPT EASIER
        </h2>
        <p className={themeStyles.paragraph}>Let's get our hands dirty with JavaScript</p>

        <p className="paragraph-code">Your first JavaScript code:</p>

        <MemoizedSyntaxHighlighter theme={theme}>
          {CODE_SNIPPETS.HomeCodeString}
        </MemoizedSyntaxHighlighter>

        <div className="flex items-center gap-1 mt-2">
          <Link
            to="/ide"
            target="_blank"
            className={`${themeStyles.editorButton} text-sm rounded-md px-2 transition-all`}
          >
            TRY IT YOURSELF
          </Link>
          <FaCode className={`${themeStyles.icon} animate-pulse`} />
        </div>

        <p className="paragraph-console">Console:</p>

        <MemoizedSyntaxHighlighter theme={theme}>
          {CODE_SNIPPETS.HomeCodeConsole}
        </MemoizedSyntaxHighlighter>
      </>
    ),
    [theme, themeStyles]
  );

  // MEMOIZE INFORMAITON SECTIONS
  const InfoSection = useMemo(
    () => (
      <div>
        <p className={themeStyles.paragraph}>
          Let's make JavaScript easier and fun to learn. The best way to use this documentation is
          to get going and writing code with the little help that you will get reading this
          documentation, or else if you know JavaScript, treat it like your companion.
        </p>

        <p className={themeStyles.paragraph}>
          Go through the examples and easy explanations to better understand the core of the
          language.
        </p>

        <p className={themeStyles.infoBlock}>
          If you find anything wrong in mindScript, kindly consider mailing us at &nbsp;
          <a
            href="mailto:snippetlabsbusiness@gmail.com"
            className="hover:text-green-600 underline inline-block"
          >
            snippetlabsbusiness@gmail.com
          </a>
          . We would love to see you as a contributor.
        </p>
      </div>
    ),
    [themeStyles]
  );

  return (
    <motion.div
      ref={ref}
      variants={CONTAINER_VARIANTS}
      initial="hidden"
      animate={controls}
      className="min-h-screen overflow-x-hidden"
    >
      <div>
        <div className="flex flex-col">
          {HeaderSection}

          <div className="flex items-center justify-center">
            <Lottie animationData={Homelottie} loop={true} className="lottie-animation-json" />
          </div>

          {CodeSection}

          <p
            className={`${themeStyles.paragraph} mb-5 mt-3 md:mb-8 lg:text-lg w-full tracking-tight`}
          >
            <span className={themeStyles.headlineTwo}>Yooooooooooo!</span>
            <br />
            Congratulations on your first JavaScript code.
          </p>
        </div>

        {InfoSection}

        {/* PAGE CHAPTER */}
        <Chapter title="Introduction to JavaScript" />

        {/* PAGINATION */}
        <Pagination to={'/introduction'} />
      </div>

      {/* FOOTER */}
      <Footer />
    </motion.div>
  );
};

export default memo(HomePage);
