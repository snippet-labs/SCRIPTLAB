import React, { useMemo, memo } from 'react';
import { Link } from 'react-router-dom';

// ICONS
import { FaCode } from 'react-icons/fa';

// STORE
import useThemeStore from '../Store/themeStore';

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
  paragraph: theme === 'light' ? 'paragraph-document-light' : 'paragraph-document-dark',
  editorButton: theme === 'light' ? 'tryityourself' : 'tryityourself',
  icon: theme === 'light' ? 'text-black' : 'text-white',
});

const Button = () => {
  // THEME STORE
  const theme = useThemeStore((state) => state.theme);

  // MEMOIZED THEME STYLES
  const themeStyles = useMemo(() => getThemeStyles(theme), [theme]);

  // MEMOIZE ERROR CONTENT
  const ButtonSection = useMemo(
    () => (
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
    ),
    [themeStyles]
  );

  return <div>{ButtonSection}</div>;
};

export default memo(Button);
