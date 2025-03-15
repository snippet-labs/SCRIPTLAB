import { useMemo, React } from 'react';

// STORE
import useThemeStore from '../Store/themeStore';

// LDRS
import { jelly } from 'ldrs';

jelly.register();

const getThemeStyles = (theme) => ({
  loader:
    theme === 'light'
      ? 'bg-white w-full h-screen flex items-center justify-center overflow-x-hidden'
      : 'bg-zinc-900 w-full h-screen flex items-center justify-center overflow-x-hidden',
});

const Loader = () => {
  // THEME STORE
  const theme = useThemeStore((state) => state.theme);

  // MEMOIZE THE THEME STYLES
  const themeStyles = useMemo(() => getThemeStyles(theme), [theme]);

  return (
    <div className={`${themeStyles.loader}z-50`}>
      {theme === 'light' ? (
        <l-jelly size="100" speed="0.4" color="black"></l-jelly>
      ) : (
        <l-jelly size="100" speed="0.4" color="white"></l-jelly>
      )}
    </div>
  );
};

export default Loader;
