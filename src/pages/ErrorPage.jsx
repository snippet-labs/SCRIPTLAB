import React, { useEffect, useRef, useMemo, memo } from 'react';
import Lottie from 'lottie-react';
import { motion, useAnimation, useInView } from 'framer-motion';

// STORE
import useThemeStore from '../utils/Store/themeStore';

// LOTTIE
import Errorlottie from '../../public/lottie/Errorlottie.json';

// COMPONENTS
import Footer from '../components/Footer/Footer';

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
});

const ErrorPage = () => {
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
  const ErrorSection = useMemo(
    () => (
      <div className="flex flex-col">
        <h1 className={themeStyles.headlineOne}> 404 </h1>
        <h2 className={themeStyles.headlineTwo}> PAGE NOT FOUND ! </h2>
        <p className={`${themeStyles.paragraph} mt-3`}>
          This page is either not available or it is under development.
        </p>
        <p className={themeStyles.paragraph}>
          Help us create our next page, &nbsp;
          <span className="underline hover:cursor-pointer">
            contribute on our open source repository
          </span>
          .
        </p>
        <div className="flex items-center justify-center">
          <Lottie animationData={Errorlottie} loop={true} className="lottie-animation-json" />
        </div>
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
      className="overflow-x-hidden"
    >
      <div className='mb-25'>{ErrorSection}</div>
      {/* FOOTER */}
      <Footer />
    </motion.div>
  );
};

export default memo(ErrorPage);
