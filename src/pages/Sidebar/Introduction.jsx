import { useEffect, useRef, useMemo, useState, memo } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

//ICONS
import { FaInfoCircle } from 'react-icons/fa';

// STORE
import useThemeStore from '../../utils/Store/themeStore';

// COMPONENTS
import Footer from '../../components/Footer/Footer';
import InfoModal from '../../utils/InfoModal/InfoModal';
import Chapter from '../../utils/Chapter/Chapter';
import Pagination from '../../utils/Pagination/Pagination';

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
  text: theme === 'light' ? 'text-black' : 'text-white',
  background: theme === 'light' ? 'bg-light' : 'bg-dark',
  infoBlock: theme === 'light' ? 'infoblock-light' : 'infoblock-dark',
  token: theme === 'light' ? 'token-light' : 'token-dark',
});

const Introduction = () => {
  // THEME STORE
  const theme = useThemeStore((state) => state.theme);

  // FRAMER MOTION SETUP
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, threshold: 0.3 });
  const controls = useAnimation();

  // MEMOIZED THEME STYLES
  const themeStyles = useMemo(() => getThemeStyles(theme), [theme]);

  const [isModalVisible, setModalVisible] = useState(false);
  const [modalHeading, setModalHeading] = useState('');

  const [modalContent, setModalContent] = useState('');

  const handleIconClick = () => {
    setModalHeading('What is a Scripting Language?');
    setModalContent(
      'This term refers to languages that are interpreted or compiled at runtime. It is essential in understanding how JavaScript operates.'
    );
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setModalContent('');
  };

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [inView, controls]);

  // MEMOIZE INTRODUCTION CONTENT
  const IntroductionSection = useMemo(
    () => (
      <div className="flex flex-col">
        <h1 className={themeStyles.headlineOne}> INTRODUCTION TO JAVASCRIPT </h1>
        <p className={`${themeStyles.paragraph} mt-3`}>
          JavaScript is one of the core technologies of the web, alongside HTML and CSS. It is a
          versatile, high-level programming language primarily used to create interactive and
          dynamic user experiences on websites. Whether you are building a simple interactive form
          or a complex single-page application, JavaScript is an essential tool in your development
          arsenal.
        </p>
        <h2 className={`${themeStyles.headlineTwo} border-l-3 border-green-600 pl-1.5 mb-3`}>
          {' '}
          WHAT IS JAVASCRIPT?{' '}
        </h2>
        <p className={`${themeStyles.paragraph} border-l-3 border-transparent pl-1.5`}>
          JavaScript is a{' '}
          <span className="relative inline-flex items-center">
            <strong>scripting language</strong>
            <div
              className="relative inline-flex items-center cursor-pointer"
              onClick={handleIconClick}
            >
              <FaInfoCircle className="ml-1 text-blue-500" />
            </div>
            <InfoModal
              isVisible={isModalVisible}
              onClose={handleCloseModal}
              content={modalContent}
              heading={modalHeading}
            />
          </span>{' '}
          that runs in the browser as well as on the server (using environments like Node.js).
          Originally developed to add interactivity to web pages, JavaScript has evolved into a
          powerful language that supports object-oriented, functional, and imperative programming
          styles. Its flexibility and extensive ecosystem of libraries and frameworks (like React,
          Angular, and Vue) make it a top choice for modern web development.
        </p>

        <h2 className={`${themeStyles.headlineTwo} border-l-3 border-green-600 pl-1.5 mb-3`}>
          KEY FEATURES
        </h2>
        <ul className="border-l-3 border-transparent pl-1.5">
          <li className={themeStyles.paragraph}>
            <span className={themeStyles.token}>Interactivity</span>&nbsp;: JavaScript allows you to
            respond to user events (clicks, form submissions, etc.) and update the page content
            dynamically without reloading the entire page.
          </li>
          <li className={themeStyles.paragraph}>
            <span className={themeStyles.token}>Dynamic Typing</span>&nbsp;: Variables in JavaScript
            can hold data of any type without needing explicit type declarations.
          </li>
          <li className={themeStyles.paragraph}>
            <span className={themeStyles.token}>First-Class Functions</span>&nbsp;: Functions in
            JavaScript are treated as objects, meaning they can be assigned to variables, passed as
            arguments, and returned by other functions.
          </li>
          <li className={themeStyles.paragraph}>
            <span className={themeStyles.token}>Event-Driven Programming</span>&nbsp;: JavaScript is
            built around an event loop, making it well-suited for handling asynchronous tasks like
            API calls, animations, and user interactions.
          </li>
          <li className={themeStyles.paragraph}>
            <span className={themeStyles.token}>Evolving Standards</span>&nbsp;: With ECMAScript
            (the standard behind JavaScript), the language continues to evolve, introducing new
            syntax and features (such as arrow functions, template literals, and async/await).
          </li>
        </ul>
        <p className={`${themeStyles.infoBlock} mt-5`}>Hope this was convincing enough,set your peddles tight. See you in the next chapter... </p>
      </div>
    ),
    [themeStyles, isModalVisible]
  );

  return (
    <motion.div
      ref={ref}
      className="overflow-x-hidden"
      variants={CONTAINER_VARIANTS}
      initial="hidden"
      animate={controls}
    >
      <div>{IntroductionSection}</div>
      <Chapter title="Why Javascript ?" />
      <Pagination to={'/'} previous={'/'} />
      <Footer />
    </motion.div>
  );
};

export default memo(Introduction);
