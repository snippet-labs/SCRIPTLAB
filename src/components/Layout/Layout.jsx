// import { useState, useCallback, useMemo, memo, lazy } from 'react';
// import { Route, Routes, NavLink, useLocation, Link } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';

// // STORE
// import useThemeStore from '../../utils/Store/themeStore.js';

// // ICONS
// import { BsLayoutSidebarInset } from 'react-icons/bs';
// import { RxHamburgerMenu } from 'react-icons/rx';
// import { IoClose } from 'react-icons/io5';
// import { IoMdArrowRoundBack } from 'react-icons/io';
// import { FaSun, FaMoon } from 'react-icons/fa';
// import { IoMdArrowDropleft } from 'react-icons/io';
// import { IoMdArrowDropright } from 'react-icons/io';
// import { FaLaptopCode } from 'react-icons/fa';

// // NAVIGATION COMPONENTS
// const Homepage = lazy(() => import('../../pages/Navigation/HomePage.jsx'));
// const Errorpage = lazy(() => import('../../pages/ErrorPage'));
// const TermsAndConditions = lazy(() => import('../../pages/TermsAndConditions'));
// const FlashCardsPage = lazy(() => import('../../pages/Navigation/FlashCardsPage'));
// const CodeEditor = lazy(() => import('../../components/CodeEditor/CodeEditor'));
// const Contact = lazy(() => import('../../pages/Navigation/Contact'));

// // SIDEBAR COMPONENTS
// const InputAndOutput = lazy(() => import('../../pages/Sidebar/InputAndOutput'));

// // CONSTANTS
// const NAV_LINKS = [
//   { name: 'Home', href: '/' },
//   { name: 'About', href: '/about' },
//   { name: 'Github', href: '/github' },
//   { name: 'Flashcards', href: '/flashcards' },
//   { name: 'Contact', href: '/contact' },
// ];

// const SIDEBAR_LINKS = [
//   { name: 'Introduction', href: '/introduction' },
//   { name: 'Why JavaScript ?', href: '/why-javascript' },
//   { name: 'Inputs & Outputs', href: '/io' },
//   { name: 'Variables & Data Types', href: '/variables-datatypes' },
//   { name: 'Operators & Expressions', href: '/operators-expressions' },
//   { name: 'Control structures', href: '/control-structures' },
//   { name: 'Javascript functions', href: '/functions' },
//   { name: 'Arrays', href: '/arrys' },
//   { name: 'Objects', href: '/objects' },
//   { name: 'Getting started with DOM', href: '/getting-started-dom' },
//   { name: 'Mastering DOM', href: '/mastering-dom' },
// ];

// // THEME STYLE GENERATOR
// const getThemeStyles = (theme) => ({
//   nav: theme === 'light' ? 'bg-light border-black' : 'bg-dark border-zinc-500',
//   navHover: theme === 'light' ? 'hover:border-gray-400' : 'hover:border-gray-300',
//   text: theme === 'light' ? 'text-black' : 'text-white',
//   hover: theme === 'light' ? 'hover:bg-gray-300' : 'hover:bg-zinc-800',
//   sidebar:
//     theme === 'light'
//       ? 'bg-light border-black *: hover:bg-gray-300'
//       : 'bg-zinc-850 border-gray-500',
//   sidebarToggleButton:
//     theme === 'light'
//       ? 'transition-all duration-75 text-black hover:text-green-600 cursor-pointer'
//       : 'transition-all duration-75 text-white hover:text-green-600 cursor-pointer',
//   background: theme === 'light' ? 'bg-light' : 'bg-dark',
// });

// const Layout = () => {
//   const [isSidebarOpen, setIsSideBarOpen] = useState(true);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const location = useLocation();
//   const isIdePath = location.pathname === '/ide';

//   // THEME STORE
//   const { theme, toggleTheme } = useThemeStore();

//   // MEMOIZED THEME STYLES
//   const themeStyles = useMemo(() => getThemeStyles(theme), [theme]);

//   // MEMOIZED FILTERED LINKS
//   const filteredLinks = useMemo(
//     () =>
//       SIDEBAR_LINKS.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase())),
//     [searchQuery]
//   );

//   // SIDEBAR TOGGLE CALLBACK
//   const toggleSidebar = useCallback(() => {
//     setIsSideBarOpen((prev) => !prev);
//   }, []);

//   const toggleMobileMenu = useCallback(() => {
//     setIsMobileMenuOpen((prev) => !prev);
//   }, []);

//   const handleSearchChange = useCallback((e) => {
//     setSearchQuery(e.target.value);
//   }, []);

//   // MEMOIZED NAVIGATION LINK RENDERER
//   const renderNavLinks = useMemo(
//     () =>
//       NAV_LINKS.map((link) => (
//         <NavLink
//           key={link.name}
//           to={link.href}
//           className={({ isActive }) =>
//             `${
//               isActive ? 'border-green-600' : 'border-transparent'
//             } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${themeStyles.text} ${
//               themeStyles.navHover
//             }`
//           }
//         >
//           {link.name}
//         </NavLink>
//       )),
//     [theme, themeStyles.text]
//   );

//   return (
//     <div className="min-h-screen overflow-x-hidden">
//       {/* CONDITIONAL RENDERING BASED ON ROUTE */}
//       {isIdePath ? (
//         <div className={`${themeStyles.background} min-h-screen`}>
//           <Routes>
//             <Route path="/ide" element={<CodeEditor />} />
//           </Routes>
//         </div>
//       ) : (
//         <>
//           {/* TOP NAVIGATION */}
//           <nav className={`${themeStyles.nav} border-b fixed top-0 w-full z-50`}>
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//               <div className="flex justify-between items-center h-16">
//                 <div className="flex items-center backdrop-blur-3xl">
//                   <button onClick={toggleSidebar} className={themeStyles.text}>
//                     <BsLayoutSidebarInset
//                       size={25}
//                       className="cursor-pointer hover:text-green-600 transition-all"
//                     />
//                   </button>

//                   <h1 className={`font-cursive ml-3 font-bold text-2xl ${themeStyles.text}`}>
//                     {import.meta.env.VITE_SECRET}
//                   </h1>
//                 </div>

//                 {/* DESKTOP NAVIGATION */}
//                 <div className="hidden sm:flex space-x-8">{renderNavLinks}</div>

//                 {/* MOBILE MENU BUTTON AND THEME TOGGLE */}
//                 <div className="flex items-center space-x-4">
//                   <motion.button
//                     onClick={toggleMobileMenu}
//                     className={`${themeStyles.text} sm:hidden hover:text-green-600 hover:cursor-pointer`}
//                     animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     {isMobileMenuOpen ? <IoClose size={25} /> : <RxHamburgerMenu size={25} />}
//                   </motion.button>

//                   <Link to="/ide" className="pt-1.5">
//                     <button
//                       className={`${themeStyles.text} hover:text-green-600 hover:cursor-pointer transition-all`}
//                     >
//                       <FaLaptopCode size={22} />
//                     </button>
//                   </Link>

//                   <button
//                     onClick={toggleTheme}
//                     className={`${themeStyles.text} hover:text-green-600 hover:cursor-pointer transition-all`}
//                   >
//                     {theme === 'dark' ? <FaSun size={19} /> : <FaMoon size={19} />}
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* MOBILE MENU WITH ANIMATION */}
//             <AnimatePresence>
//               {isMobileMenuOpen && (
//                 <motion.div
//                   initial={{ opacity: 0, y: -20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.3 }}
//                   className={`sm:hidden ${themeStyles.text}`}
//                 >
//                   <div className="px-2 pt-2 pb-3 space-y-2">
//                     {NAV_LINKS.map((link) => (
//                       <NavLink
//                         key={link.name}
//                         to={link.href}
//                         className={`${themeStyles.hover} block px-3 py-2 rounded-md text-base font-medium`}
//                         onClick={toggleMobileMenu}
//                       >
//                         {link.name}
//                       </NavLink>
//                     ))}
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </nav>

//           {/* MAIN CONTAINER WITH SIDEBAR */}
//           <div className={`${themeStyles.background} flex items-center pt-16 justify-center`}>
//             {/* SIDEBAR WITH ANIMATION */}
//             <motion.div
//               initial={{ x: -300 }}
//               animate={{ x: isSidebarOpen ? 0 : -300 }}
//               transition={{ duration: 0.3, ease: 'easeInOut' }}
//               className={`${themeStyles.sidebar} fixed top-0 left-0 h-[100%] w-64 border-r z-20 backdrop-blur-lg`}
//             >
//               {/* SIDEBAR HEADER */}
//               <div className={`pt-20 flex items-center justify-between border-${themeStyles.text}`}>
//                 <div className="pl-3 flex items-center">
//                   <IoMdArrowRoundBack
//                     onClick={toggleSidebar}
//                     size={28}
//                     className={`${themeStyles.text} cursor-pointer transition border p-1 rounded-md hover:bg-green-600 hover:border-green-600`}
//                   />
//                 </div>
//               </div>

//               {/* SIDEBAR SEARCH BAR */}
//               <div className="px-3 mt-4">
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   value={searchQuery}
//                   onChange={handleSearchChange}
//                   className={`${themeStyles.background} ${themeStyles.text} border-gray-600 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
//                 />
//               </div>

//               {/* SIDEBAR LINKS */}
//               <nav className="mt-4 px-2">
//                 {filteredLinks.length > 0 ? (
//                   filteredLinks.map((item) => (
//                     <NavLink
//                       key={item.name}
//                       to={item.href}
//                       onClick={toggleSidebar}
//                       className={({ isActive }) =>
//                         `group flex items-center px-2 py-2 mb-2 text-base font-medium rounded-md ${
//                           isActive
//                             ? 'bg-green-600 text-white'
//                             : `${themeStyles.text} ${themeStyles.hover}`
//                         }`
//                       }
//                     >
//                       {item.name}
//                     </NavLink>
//                   ))
//                 ) : (
//                   <p className="text-gray-400 text-sm px-2 mt-2">No results found</p>
//                 )}
//               </nav>
//             </motion.div>

//             {/* MAIN CONTENT AREA */}
//             <div
//               className={`flex-1 ${isSidebarOpen ? 'lg:ml-64' : ''} pt-6 px-6 md:px-8 lg:px-9 transition-margin duration-300`}
//             >
//               <div>
//                 <button
//                   onClick={toggleSidebar}
//                   className={`${themeStyles.text} hidden lg:flex items-center`}
//                 >
//                   {isSidebarOpen && theme ? (
//                     <IoMdArrowDropleft size={25} className={themeStyles.sidebarToggleButton} />
//                   ) : (
//                     <IoMdArrowDropright size={25} className={themeStyles.sidebarToggleButton} />
//                   )}
//                   <span className="ml-5 cursor-pointer flex items-center justify-center">
//                     {isSidebarOpen ? `Collapse` : 'Expand'} chapter
//                   </span>
//                 </button>

//                 {/* PAGES ROUTES */}
//                 <div className="mt-8">
//                   <Routes>
//                     <Route path="/" element={<Homepage />} />
//                     <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
//                     <Route path="/flashcards" element={<FlashCardsPage />} />
//                     <Route path="/contact" element={<Contact />} />
//                     <Route path="/io" element={<InputAndOutput />} />
//                     <Route path="*" element={<Errorpage />} />
//                   </Routes>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default memo(Layout);

import { useState, useCallback, useMemo, memo, lazy } from 'react';
import { Route, Routes, NavLink, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// STORE
import useThemeStore from '../../utils/Store/themeStore.js';

// ICONS
import { BsLayoutSidebarInset } from 'react-icons/bs';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoClose } from 'react-icons/io5';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { FaSun, FaMoon } from 'react-icons/fa';
import { IoMdArrowDropleft } from 'react-icons/io';
import { IoMdArrowDropright } from 'react-icons/io';
import { FaLaptopCode } from 'react-icons/fa';

// NAVIGATION COMPONENTS
const Homepage = lazy(() => import('../../pages/Navigation/HomePage.jsx'));
const Errorpage = lazy(() => import('../../pages/ErrorPage'));
const TermsAndConditions = lazy(() => import('../../pages/TermsAndConditions'));
const FlashCardsPage = lazy(() => import('../../pages/Navigation/FlashCardsPage'));
const CodeEditor = lazy(() => import('../../components/CodeEditor/CodeEditor'));
const Contact = lazy(() => import('../../pages/Navigation/Contact'));

// SIDEBAR COMPONENTS
const InputAndOutput = lazy(() => import('../../pages/Sidebar/InputAndOutput'));

// CONSTANTS
const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Github', href: '/github' },
  { name: 'Flashcards', href: '/flashcards' },
  { name: 'Contact', href: '/contact' },
];

const SIDEBAR_LINKS = [
  { name: 'Introduction', href: '/introduction' },
  { name: 'Why JavaScript ?', href: '/why-javascript' },
  { name: 'Inputs & Outputs', href: '/io' },
  { name: 'Variables & Data Types', href: '/variables-datatypes' },
  { name: 'Operators & Expressions', href: '/operators-expressions' },
  { name: 'Control structures', href: '/control-structures' },
  { name: 'Javascript functions', href: '/functions' },
  { name: 'Arrays', href: '/arrys' },
  { name: 'Objects', href: '/objects' },
  { name: 'Getting started with DOM', href: '/getting-started-dom' },
  { name: 'Mastering DOM', href: '/mastering-dom' },
];

// THEME STYLE GENERATOR
const getThemeStyles = (theme) => ({
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
});

const Layout = () => {
  const [isSidebarOpen, setIsSideBarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const isIdePath = location.pathname === '/ide';

  // THEME STORE
  const { theme, toggleTheme } = useThemeStore();

  // MEMOIZED THEME STYLES
  const themeStyles = useMemo(() => getThemeStyles(theme), [theme]);

  // MEMOIZED FILTERED LINKS
  const filteredLinks = useMemo(
    () =>
      SIDEBAR_LINKS.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase())),
    [searchQuery]
  );

  // SIDEBAR TOGGLE CALLBACK
  const toggleSidebar = useCallback(() => {
    setIsSideBarOpen((prev) => !prev);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  // MEMOIZED NAVIGATION LINK RENDERER
  const renderNavLinks = useMemo(
    () =>
      NAV_LINKS.map((link) => (
        <NavLink
          key={link.name}
          to={link.href}
          className={({ isActive }) =>
            `${
              isActive ? 'border-green-600' : 'border-transparent'
            } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${themeStyles.text} ${
              themeStyles.navHover
            }`
          }
        >
          {link.name}
        </NavLink>
      )),
    [theme, themeStyles.text]
  );

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* CONDITIONAL RENDERING BASED ON ROUTE */}
      {isIdePath ? (
        <div className={`${themeStyles.background} min-h-screen`}>
          <Routes>
            <Route path="/ide" element={<CodeEditor />} />
          </Routes>
        </div>
      ) : (
        <>
          {/* TOP NAVIGATION */}
          <nav className={`${themeStyles.nav} border-b fixed top-0 w-full z-50`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center backdrop-blur-3xl">
                  <button onClick={toggleSidebar} className={themeStyles.text}>
                    <BsLayoutSidebarInset
                      size={25}
                      className="cursor-pointer hover:text-green-600 transition-all"
                    />
                  </button>

                  <h1 className={`font-cursive ml-3 font-bold text-2xl ${themeStyles.text}`}>
                    {import.meta.env.VITE_SECRET}
                  </h1>
                </div>

                {/* DESKTOP NAVIGATION */}
                <div className="hidden sm:flex space-x-8">{renderNavLinks}</div>

                {/* MOBILE MENU BUTTON AND THEME TOGGLE */}
                <div className="flex items-center space-x-4">
                  <motion.button
                    onClick={toggleMobileMenu}
                    className={`${themeStyles.text} sm:hidden hover:text-green-600 hover:cursor-pointer`}
                    animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isMobileMenuOpen ? <IoClose size={25} /> : <RxHamburgerMenu size={25} />}
                  </motion.button>

                  <Link to="/ide" className="pt-1.5">
                    <button
                      className={`${themeStyles.text} hover:text-green-600 hover:cursor-pointer transition-all`}
                    >
                      <FaLaptopCode size={22} />
                    </button>
                  </Link>

                  <button
                    onClick={toggleTheme}
                    className={`${themeStyles.text} hover:text-green-600 hover:cursor-pointer transition-all`}
                  >
                    {theme === 'dark' ? <FaSun size={19} /> : <FaMoon size={19} />}
                  </button>
                </div>
              </div>
            </div>

            {/* MOBILE MENU WITH ANIMATION */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`sm:hidden ${themeStyles.text}`}
                >
                  <div className="px-2 pt-2 pb-3 space-y-2">
                    {NAV_LINKS.map((link) => (
                      <NavLink
                        key={link.name}
                        to={link.href}
                        className={`${themeStyles.hover} block px-3 py-2 rounded-md text-base font-medium`}
                        onClick={toggleMobileMenu}
                      >
                        {link.name}
                      </NavLink>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </nav>

          {/* MAIN CONTAINER WITH SIDEBAR */}
          <div className={`${themeStyles.background} flex min-h-screen w-full`}>
            {/* SIDEBAR WITH ANIMATION */}
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: isSidebarOpen ? 0 : -300 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className={`${themeStyles.sidebar} fixed top-0 left-0 h-screen w-64 border-r z-20 backdrop-blur-lg`}
            >
              {/* SIDEBAR HEADER */}
              <div className={`pt-20 flex items-center justify-between border-${themeStyles.text}`}>
                <div className="pl-3 flex items-center">
                  <IoMdArrowRoundBack
                    onClick={toggleSidebar}
                    size={28}
                    className={`${themeStyles.text} cursor-pointer transition border p-1 rounded-md hover:bg-green-600 hover:border-green-600`}
                  />
                </div>
              </div>

              {/* SIDEBAR SEARCH BAR */}
              <div className="px-3 mt-4">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className={`${themeStyles.background} ${themeStyles.text} border-gray-600 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                />
              </div>

              {/* SIDEBAR LINKS */}
              <nav className="mt-4 px-2">
                {filteredLinks.length > 0 ? (
                  filteredLinks.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      onClick={toggleSidebar}
                      className={({ isActive }) =>
                        `group flex items-center px-2 py-2 mb-2 text-base font-medium rounded-md ${
                          isActive
                            ? 'bg-green-600 text-white'
                            : `${themeStyles.text} ${themeStyles.hover}`
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm px-2 mt-2">No results found</p>
                )}
              </nav>
            </motion.div>

            {/* MAIN CONTENT AREA */}
            <div
              className={`flex-1 min-h-screen w-full overflow-x-hidden ${
                isSidebarOpen ? 'lg:ml-64' : ''
              } pt-16 px-4 md:px-6 lg:px-8 transition-all duration-300`}
            >
              <div className="max-w-[100vw] overflow-x-hidden mt-5">
                <button
                  onClick={toggleSidebar}
                  className={`${themeStyles.text} hidden lg:flex items-center`}
                >
                  {isSidebarOpen && theme ? (
                    <IoMdArrowDropleft size={25} className={themeStyles.sidebarToggleButton} />
                  ) : (
                    <IoMdArrowDropright size={25} className={themeStyles.sidebarToggleButton} />
                  )}
                  <span className="ml-5 cursor-pointer flex items-center justify-center">
                    {isSidebarOpen ? `Collapse` : 'Expand'} chapter
                  </span>
                </button>

                {/* PAGES ROUTES */}
                <div className="mt-8 w-full overflow-x-hidden">
                  <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                    <Route path="/flashcards" element={<FlashCardsPage />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/io" element={<InputAndOutput />} />
                    <Route path="*" element={<Errorpage />} />
                  </Routes>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default memo(Layout);
