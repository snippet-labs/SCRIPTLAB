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
  text: theme === 'light' ? 'text-black' : 'text-white',
});

const Footer = () => {
  // THEME STORE
  const theme = useThemeStore((state) => state.theme);
  // EMAIL
  const companyEmail = 'snippetlabsbusiness@gmail.com';

  // MEMOIZED THEME STYLES
  const themeStyles = useMemo(() => getThemeStyles(theme), [theme]);

  // MEMOIZE FOOTER SECTION
  const FooterSection = useMemo(
    () => (
      <>
        <hr className={`${themeStyles.text} w-full`} />
        <h4 className="font-cursive mt-6 md:text-xl lg:text-xl text-center text-gray-500 hover:text-green-600 hover:cursor-pointer">
          {import.meta.env.VITE_SECRET}
        </h4>
        <p className="text-gray-500 text-sm text-center mt-5 pl-5 px-5">
          This documentation is created to open the world of Javascript, spread the love of
          programming and enlarge the existing javascript community.
        </p>
        <p className="text-gray-500 text-sm text-center pl-5 px-5">
          For any queries or corrections, reach out to our email
          <span className="hover:text-green-600 hover:cursor-pointer"> {companyEmail} </span>
        </p>

        <div className="flex items-center justify-center gap-3 mt-5 mb-5">
          <DiGithub size={35} className="icons" />
          <TiSocialLinkedinCircular size={35} className="icons" />
          <TiSocialInstagramCircular size={35} className="icons" />
        </div>

        <p className="text-center text-zinc-500 text-sm">
          {' '}
          &copy; 2025-26 snippetlabs Productions !{' '}
        </p>

        <Link to="/terms-and-conditions">
          <p className="text-center text-zinc-400 text-sm hover:cursor-pointer hover:text-zinc-600">
            Terms & Conditions
          </p>
        </Link>

        <p className="text-center text-green-500 mb-3"> TEAM SNIPPET </p>
      </>
    ),
    [themeStyles]
  );

  return <div className="flex flex-col">{FooterSection}</div>;
};

export default memo(Footer);
