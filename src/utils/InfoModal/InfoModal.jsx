import { FaTimes } from 'react-icons/fa';
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
const InfoModal = ({ isVisible, onClose, content, heading, theme }) => {
  if (!isVisible) return null;

  const handleClose = (e) => {
    if (e.target.id === 'wrapper') onClose();
  };
  const themeStyles = getThemeStyles(theme);

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
          {heading && <div className={`${themeStyles.headlineTwo} text-left pb-4`}>{heading}</div>}
          <div>
            <p className={`${themeStyles.text} text-sm md:text-lg lg:text-lg`}>{content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
