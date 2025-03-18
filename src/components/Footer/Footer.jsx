import { useMemo, memo } from 'react';
import { Link } from 'react-router-dom';

// STORE
import useThemeStore from '../../utils/Store/themeStore';

// ICONS
import { DiGithub } from 'react-icons/di';
import { TiSocialLinkedinCircular } from 'react-icons/ti';
import { TiSocialInstagramCircular } from 'react-icons/ti';

// THEME STYLE GENERATOR
const getThemeStyles = (theme) => ({
  background: theme === 'light' ? 'footer-light' : 'footer-dark',
});

const Footer = () => {
  // THEME STORE
  const theme = useThemeStore((state) => state.theme);

  // MEMOIZED THEME STYLES
  const themeStyles = useMemo(() => getThemeStyles(theme), [theme]);

  // MEMOIZE FOOTER SECTION
  const FooterSection = useMemo(
    () => (
      <>
        <div className={`${themeStyles.background} p-1`}>
          <h4 className="font-cursive text-gray-600 text-center text-2xl md:text-2xl lg:text-3xl mt-3 hover:scale-90 hover:cursor-pointer hover:text-green-800 transition-all mb-5">
            {import.meta.env.VITE_SECRET}
          </h4>
          <div className="flex flex-col items-center justify-evenly md:flex-row lg:flex-row">
            <div className="w-[30ch] mb-10 md:w-[50ch] lg:w-[80ch] md:mb-0 lg:mg-0 border-b-4  md:border-b-0 md:border-r-4 lg:border-r-4 border-green-800">
              <p className="text-black text-sm">
                This documentation is created to open the world of Javascript, spread the love of
                programming and enlarge the existing javascript community.
              </p>
              <p className="text-black text-sm mt-2 mb-5">
                For any queries or corrections, reach out to our email
                <span className="animate-pulse hover:cursor-pointer">
                  {' '}
                  <a href="mailto:snippetlabsbusiness@gmail.com">snippetlabsbusiness@gmail.com </a>
                </span>
              </p>
            </div>
            <div className="flex items-center justify-between gap-4 mt-3">
              <Link to={`https://github.com/snippet-labs/SCRIPTLAB`}>
                <DiGithub size={35} className="icons" />
              </Link>
              <TiSocialLinkedinCircular size={35} className="icons" />
              <TiSocialInstagramCircular size={35} className="icons" />
            </div>
          </div>
          <p className="mt-4 text-center text-black">&copy; 2025-26 snippetlabs Productions ! </p>
          <Link to="/terms-and-conditions">
            <p className="text-center text-black hover:cursor-pointer hover:text-gray-700 transition-all">
              Terms & Conditions
            </p>
          </Link>

          <p className="text-center mb-3 text-gray-400"> TEAM SNIPPET </p>
        </div>
      </>
    ),
    [themeStyles]
  );

  return (
    <div className="mt-5">
      <div className="flex flex-col">{FooterSection}</div>
    </div>
  );
};

export default memo(Footer);
