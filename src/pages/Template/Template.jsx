import React, { useEffect, useRef, useMemo, memo } from 'react';
import Lottie from 'lottie-react';
import { motion, useAnimation, useInView } from 'framer-motion';

// STORE
import useThemeStore from '../../utils/Store/themeStore';

// LOTTIE

// COMPONENTS
import Footer from '../../components/Footer/Footer';

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

const Template = () => {
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
  const TemplateSection = useMemo(
    () => (
      <div className="flex flex-col">
        <div> {/*Your content goes here */} </div>
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
      <div>{TemplateSection}</div>
      <Footer />
    </motion.div>
  );
};

export default memo(Template);
