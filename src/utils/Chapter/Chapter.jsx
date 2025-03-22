import React, { useMemo, memo } from 'react';
import Lottie from 'lottie-react';

// STORE
import useThemeStore from '../Store/themeStore';

// LOTTIE
import Footerlottie from '../../../public/lottie/Footerlottie.json';

// THEME TOGGLER
const getThemeStyles = (theme) => ({
  chapterText: theme === 'light' ? 'text-gray-700' : 'text-gray-400',
});

const Chapter = ({ title }) => {
  // STORE THEME
  const theme = useThemeStore((state) => state.theme);

  // MEMOIZED THEME STYLES
  const themeStyles = useMemo(() => getThemeStyles(theme), [theme]);

  // MEMOIZED CHAPTER SECTION
  const ChapterSection = useMemo(() => (
    <>
      <div className="flex items-center justify-center mt-10">
        {/* <Lottie animationData={Footerlottie} loop={true} className="lottie-animation-json" /> */}
      </div>
      <p className={`${themeStyles.chapterText} text-center`}>
        <span className="text-green-700">Next Chapter :</span> {title}
      </p>
    </>
  ));

  return <div> {ChapterSection} </div>;
};

export default memo(Chapter);

