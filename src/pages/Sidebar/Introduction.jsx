import { useEffect, useRef, useMemo, useState, memo } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { FaInfoCircle } from 'react-icons/fa';

// STORE
import useThemeStore from '../../utils/Store/themeStore';

// COMPONENTS
import Footer from '../../components/Footer/Footer';
import InfoModal from '../../utils/InfoModal/InfoModal';

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
const [modalContent, setModalContent] = useState('');

const handleIconClick = () => {
  setModalContent(
    'This term refers to languages that are interpreted or compiled at runtime. It is essential in understanding how JavaScript operates.This term refers to languages that are interpreted or compiled at runtime. It is essential in understanding how JavaScript operates.'
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
        <div>
          <h1 className={themeStyles.headlineOne}> INTRODUCTION TO JAVASCRIPT </h1>
          <p className={`${themeStyles.paragraph} mt-3`}>
            JavaScript is one of the core technologies of the web, alongside HTML and CSS. It is a
            versatile, high-level programming language primarily used to create interactive and
            dynamic user experiences on websites. Whether you are building a simple interactive form
            or a complex single-page application, JavaScript is an essential tool in your
            development arsenal.
          </p>
          <h2 className={themeStyles.headlineTwo}> WHAT IS JAVASCRIPT? </h2>
          <p className={themeStyles.paragraph}>
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
                heading="What is a Scripting Language?"
                theme={theme}
              />
            </span>{' '}
            that runs in the browser as well as on the server (using environments like Node.js).
            Originally developed to add interactivity to web pages, JavaScript has evolved into a
            powerful language that supports object-oriented, functional, and imperative programming
            styles. Its flexibility and extensive ecosystem of libraries and frameworks (like React,
            Angular, and Vue) make it a top choice for modern web development.
          </p>
        </div>
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
      {/* FOOTER */}
      <Footer />
    </motion.div>
  );
};

export default memo(Introduction);
