import { useEffect, useState, useRef, useMemo, useCallback } from 'react';

// STORE
import useThemeStore from '../../utils/Store/themeStore';

// COMPONENTS
import Footer from '../../components/Footer/Footer';

// FRAMER MOTION
import { motion, AnimatePresence } from 'framer-motion';
import { useAnimation, useInView } from 'framer-motion';

// ICONS
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';

// CONSTANTS
import facts from '../../constants/cardDetails.json';

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
  cardButton: theme === 'light' ? 'bg-gray-300 text-black' : 'bg-gray-100',
});

const FlashCardsPage = () => {
  // THEME STORE
  const theme = useThemeStore((state) => state.theme);

  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, threshold: 0.3 });
  const controls = useAnimation();

  // MEMOIZE THE THEME STYLES
  const themeStyles = useMemo(() => getThemeStyles(theme), [theme]);

  // MEMOIZE SUFFELED CARDS LOGIC
  const selectedCards = useMemo(() => {
    return [...facts.facts].sort(() => 0.5 - Math.random()).slice(0, 5);
  }, []);

  useEffect(() => {
    if (inView) controls.start('visible');
    else controls.start('hidden');
  }, [inView, controls]);

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % selectedCards.length);
  }, [selectedCards.length]);

  const handlePrev = useCallback(() => {
    setActive((prev) => (prev - 1 + selectedCards.length) % selectedCards.length);
  }, [selectedCards.length]);

  const randomRotateY = useMemo(() => {
    return Math.floor(Math.random() * 21) - 10;
  }, []);

  return (
    <motion.div ref={ref} variants={CONTAINER_VARIANTS} initial="hidden" animate={controls}>
      <div className="px-4 py-6">
        <div className={`headline-one ${themeStyles.headlineOne}`}>DID YOU KNOW ?</div>
        <div className="max-w-sm md:max-w-4xl mx-auto px-4 md:px-8 lg:px-12 py-20">
          <div className="relative h-80 w-full">
            <AnimatePresence>
              {selectedCards.map((card, index) => {
                const isActive = index === active;
                return (
                  <motion.div
                    key={index}
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                      z: -100,
                      rotate: randomRotateY,
                    }}
                    animate={{
                      opacity: isActive ? 1 : 0.7,
                      scale: isActive ? 1 : 0.95,
                      z: isActive ? 0 : -100,
                      rotate: isActive ? 0 : randomRotateY,
                      zIndex: isActive ? 15 : selectedCards.length + 2 - index,
                      y: isActive ? [0, -80, 0] : 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.9,
                      z: 15,
                      rotate: randomRotateY,
                    }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className={`absolute inset-0 origin-bottom rounded-3xl ${card.color} flex items-center justify-center`}
                  >
                    {/* CARD CONTENT */}
                    <div className="text-center p-6 space-y-4 text-white">
                      <p className="text-2xl font-card-description">{card.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
          {/* BUTTON CONTAINER*/}
          <div className="flex justify-center gap-8 pt-8">
            <button
              onClick={handlePrev}
              className={`${themeStyles.cardButton} hover:bg-green-600 h-16 w-16 rounded-full flex items-center justify-center`}
            >
              <IconArrowLeft className="h-8 w-8 text-black" />
            </button>
            <button
              onClick={handleNext}
              className={`${themeStyles.cardButton} hover:bg-green-600 h-16 w-16 rounded-full flex items-center justify-center`}
            >
              <IconArrowRight className="h-8 w-8 text-black" />
            </button>
          </div>
        </div>
      </div>
      {/* FOOTER */}
      <Footer theme={theme} />
    </motion.div>
  );
};

export default FlashCardsPage;
