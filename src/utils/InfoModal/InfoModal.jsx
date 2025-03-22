import { useMemo } from 'react';
import { FaTimes } from 'react-icons/fa';
import useThemeStore from '../../utils/Store/themeStore';
const getThemeStyles = (theme) => ({
  headlineThree:
    theme === 'light'
      ? 'headline-three headline-three-light'
      : 'headline-three headline-three-dark',
  text: theme === 'light' ? 'text-black' : 'text-white',
  background: theme === 'light' ? 'bg-light' : 'bg-dark',
});
const InfoModal = ({ isVisible, onClose, content, heading }) => {
  const theme = useThemeStore((state) => state.theme);
  const themeStyles = useMemo(() => getThemeStyles(theme), [theme]);
  if (!isVisible) return null;

  const handleClose = (e) => {
    if (e.target.id === 'wrapper') onClose();
  };

  return (
    <div
      className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50 gap-2"
      id="wrapper"
      onClick={handleClose}
    >
      <div className={`w-full px-4 sm:px-6 md:px-0 max-w-[600px] flex flex-col relative`}>
        <button
          className={`${
            theme === 'dark' ? 'text-white' : 'text-black'
          } text-lg place-self-end mb-1 bg-transparent hover:bg-red-600 p-1 rounded-full transition flex items-center justify-center`}
          onClick={onClose}
          aria-label="Close modal"
        >
          <FaTimes />
        </button>
        <div className={`${themeStyles.background} p-4 text-black rounded-md`}>
          {heading && (
            <div className={`${themeStyles.headlineThree} text-left pb-2`}>{heading}</div>
          )}
          <div>
            <p className={`${themeStyles.text} text-sm md:text-lg lg:text-lg`}>{content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
