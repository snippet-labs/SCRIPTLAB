import { useEffect, useRef, React, useMemo, memo } from 'react';
import { Link } from 'react-router-dom';
import packages from '../../package.json';

// STORE
import useThemeStore from '../utils/Store/themeStore';

// COMPONENTS
import Footer from '../components/Footer/Footer';

// FRAMER MOTION
import { motion, useAnimation, useInView } from 'framer-motion';

// LOTTIE

// REACT SYNTAX HIGHLIGHTER

// CONSTANTS
const CONTAINER_VARIANTS = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

// THEME TOGGLER
const getThemeStyles = (theme) => ({
  headlineOne:
    theme === 'light' ? 'headline-one headline-one-light' : 'headline-one headline-one-dark',
  paragraph: theme === 'light' ? 'paragraph-document-light' : 'paragraph-document-dark',
  infoBlock: theme === 'light' ? 'infoblock-light' : 'infoblock-dark',
  capsule: theme === 'light' ? 'bg-green-800/30' : 'bg-green-800/30',
  capsuleContent: theme === 'light' ? 'text-green-600' : 'text-green-800',
});

const TermsAndConditions = () => {
  // THEME STORE
  const theme = useThemeStore((state) => state.theme);

  // FRAMER MOTION SETUP
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, threshold: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [inView, controls]);

  // MEMOIZE THE THEME STYLES
  const themeStyles = useMemo(() => getThemeStyles(theme), [theme]);

  // MEMOIZE TERMSANDCONDITIONS SECTION
  const TermsAndConditionsSection = useMemo(() => (
    <div className="flex flex-col">
      <p className={`${themeStyles.headlineOne}`}>TERMS & CONDITIONS</p>
      <p
        className={`${theme === 'light' ? 'paragraph-document-light' : 'paragraph-document-dark'} font-bold mt-3 ml-1`}
      >
        <span className={`${themeStyles.capsule} border-white p-1 rounded-xl text-sm`}>
          V <span className={`${themeStyles.capsuleContent}`}>{packages.version}</span>
        </span>
      </p>
      <p className={`${themeStyles.paragraph} mt-8`}>
        The content provided on this page is for informational purposes only. You are free to use
        the code examples and documentation for learning and development purposes only.
      </p>
      <p className={`${themeStyles.paragraph}`}>
        <span className="font-cursive">{import.meta.env.VITE_SECRET} </span> took help from &nbsp;
        <Link to="" className="text-gray-400  hover:text-green-600 hover:cursor-pointer">
          mdn
        </Link>
        ,
        <Link className="text-gray-400  hover:text-green-600 hover:cursor-pointer">
          &nbsp; w3schools &nbsp;
        </Link>
        and &nbsp;
        <Link className="text-gray-400  hover:text-green-600 hover:cursor-pointer">
          programiz &nbsp;
        </Link>
        in completing the website.
      </p>
      <p className={`${themeStyles.paragraph}`}>
        Our team is not responsible for any wrong information, understand that it is not
        intentional. Feel free to reach out to us and be a proud contributor.
      </p>
      <p className={`${themeStyles.infoBlock} mb-5`}>
        <Link to="https://lottiefiles.com/">
          The illustration are taken from
          <span className="hover:cursor-pointer hover:text-green-600"> LottieFiles </span>
        </Link>
      </p>
      <p className="paragraph-code"> Thank you so much for visiting our page ✨ </p>
    </div>
  ));

  return (
    <motion.div
      ref={ref}
      variants={CONTAINER_VARIANTS}
      initial="hidden"
      animate={controls}
      className="min-h-screen overflow-x-hidden"
    >
      <div className=""> {TermsAndConditionsSection} </div>
      {/* FOOTER */}
      <Footer theme={theme} />
    </motion.div>
  );
};

export default memo(TermsAndConditions);
