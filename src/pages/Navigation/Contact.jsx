import React, { useState, useEffect, useRef, useMemo, memo } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

// STORE
import useThemeStore from '../../utils/Store/themeStore';

// LOTTIE
import Contactlottie from '../../../public/lottie/Contactlottie.json';

// ICONS
import { BsGithub } from 'react-icons/bs';
import { GrLinkedin } from 'react-icons/gr';
import { FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

// COMPONENTS
import Footer from '../../components/Footer/Footer';

// CONSTANTS
const CONTAINER_VARIANTS = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

// THEME STYLE GENERATOR
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
  feedbackButton:
    theme === 'light'
      ? 'w-12 h-12 text-black grid place-items-center ring-inset ring-2 ring-zinc-900 rounded-lg transition-[background-color,color] hover:bg-zinc-900 hover:text-white active:bg-zinc-50/80'
      : 'w-12 h-12 grid place-items-center ring-inset ring-2 ring-zinc-50/5 rounded-lg transition-[background-color,color] hover:bg-zinc-50 hover:text-zinc-950 active:bg-zinc-50/80',
  textfield: theme === 'light' ? 'text-field-light' : 'text-field-dark',
  errorText: theme === 'light' ? 'text-red-600' : 'text-red-400',
  successText: theme === 'light' ? 'text-green-600' : 'text-green-400',
  errorBorder: theme === 'light' ? 'border-red-600' : 'border-red-400',
  successBorder: theme === 'light' ? 'border-green-600' : 'border-green-400',
});

const Contact = () => {
  // THEME STORE
  const theme = useThemeStore((state) => state.theme);

  // FRAMER MOTION SETUP
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, threshold: 0.3 });
  const controls = useAnimation();

  // FORM STATE
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [formTouched, setFormTouched] = useState({
    name: false,
    email: false,
    message: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // MEMOIZED THEME STYLES
  const themeStyles = useMemo(() => getThemeStyles(theme), [theme]);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [inView, controls]);

  // FORM VALIDATION
  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'name':
        if (!value.trim()) {
          error = 'Name is required';
        } else if (value.trim().length < 2) {
          error = 'Name must be at least 2 characters';
        }
        break;

      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
          error = 'Invalid email address';
        }
        break;

      case 'message':
        if (!value.trim()) {
          error = 'Message is required';
        } else if (value.trim().length < 10) {
          error = 'Message must be at least 10 characters';
        }
        break;

      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate on change if field has been touched
    if (formTouched[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: validateField(name, value),
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    // Mark field as touched
    setFormTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    // Validate on blur
    setFormErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  const validateForm = () => {
    const errors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      message: validateField('message', formData.message),
    };

    setFormErrors(errors);

    // Return true if no errors
    return !Object.values(errors).some((error) => error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all fields as touched
    setFormTouched({
      name: true,
      email: true,
      message: true,
    });

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      // SIMULATING THE API CALL
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // RESET FORM
      setFormData({
        name: '',
        email: '',
        message: '',
      });

      setFormTouched({
        name: false,
        email: false,
        message: false,
      });

      setSubmitSuccess(true);

      // SUCCESS MESSAGE TIMEOUT
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      setSubmitError('Failed to submit the form. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // SOCIAL LINKS
  const socialLinks = [
    {
      href: '',
      icon: <BsGithub size={25} />,
      alt: 'GitHub',
    },
    {
      href: '',
      icon: <GrLinkedin size={25} />,
      alt: 'LinkedIn',
    },
  ];

  // GET INPUT CLASS BASED ON VALIDATION STATE
  const getInputClass = (fieldName) => {
    let baseClass = themeStyles.textfield;

    if (formTouched[fieldName]) {
      if (formErrors[fieldName]) {
        return `${baseClass} ${themeStyles.errorBorder}`;
      } else if (formData[fieldName]) {
        return `${baseClass} ${themeStyles.successBorder}`;
      }
    }

    return baseClass;
  };

  // MEMOIZE CONTACT CONTENT
  const ContactSection = useMemo(
    () => (
      <>
        <div className="lg:grid lg:grid-cols-2 lg:items-stretch">
          <div className="mb-12 lg:mb-0 lg:flex lg:flex-col">
            <h2 className={`${themeStyles.headlineOne} lg:max-w-[25ch]`}>FEEDBACK HERE</h2>
            <p className={`${themeStyles.paragraph} mt-3 mb-8 max-w-[50ch] lg:max-w-[35ch]`}>
              Reach out today to discuss how is your experience, something to improve or any
              suggestions you feed we need to know !
            </p>
            <div className="flex items-center gap-2 mt-auto">
              {socialLinks.map(({ href, icon }, key) => (
                <a key={key} href={href} target="_blank" className={themeStyles.feedbackButton}>
                  {icon}
                </a>
              ))}
            </div>
          </div>
          <form onSubmit={handleSubmit} method="POST" className="xl:pl-10 2xl:pl-20">
            {submitSuccess && (
              <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/30 rounded flex items-center">
                <FiCheckCircle className={`${themeStyles.successText} mr-2`} />
                <span className={`${themeStyles.successText} text-sm rounded-md`}>
                  Thank you for your feedback! We'll get back to you soon.
                </span>
              </div>
            )}

            {submitError && (
              <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 rounded flex items-center">
                <FiAlertCircle className={`${themeStyles.errorText} mr-2`} />
                <span className={themeStyles.errorText}>{submitError}</span>
              </div>
            )}

            <div className="md:grid md:items-start md:grid-cols-2 md:gap-2">
              <div className="mb-4">
                <label htmlFor="name" className={`${themeStyles.text} label`}>
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClass('name')}
                />
                {formTouched.name && formErrors.name && (
                  <div className="mt-1 flex items-center">
                    <FiAlertCircle className={`${themeStyles.errorText} mr-1`} size={14} />
                    <span className={`${themeStyles.errorText} text-sm`}>{formErrors.name}</span>
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="email" className={`${themeStyles.text} label`}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClass('email')}
                />
                {formTouched.email && formErrors.email && (
                  <div className="mt-1 flex items-center">
                    <FiAlertCircle className={`${themeStyles.errorText} mr-1`} size={14} />
                    <span className={`${themeStyles.errorText} text-sm`}>{formErrors.email}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="message" className={`${themeStyles.text} label`}>
                Message
              </label>
              <textarea
                name="message"
                id="message"
                placeholder="Tell us what you think of this page!"
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${getInputClass('message')} resize-y min-h-32 max-h-80`}
              ></textarea>
              {formTouched.message && formErrors.message && (
                <div className="mt-1 flex items-center">
                  <FiAlertCircle className={`${themeStyles.errorText} mr-1`} size={14} />
                  <span className={`${themeStyles.errorText} text-sm`}>{formErrors.message}</span>
                </div>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`button button-primary [&]:max-w-full w-full justify-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
      </>
    ),
    [formData, formErrors, formTouched, isSubmitting, submitSuccess, submitError, themeStyles]
  );

  return (
    <motion.div
      ref={ref}
      className="min-h-screen overflow-x-hidden"
      variants={CONTAINER_VARIANTS}
      initial="hidden"
      animate={controls}
    >
      <div className="px-4 py-6">{ContactSection}</div>
      {/* FOOTER */}
      <Footer />
    </motion.div>
  );
};

export default memo(Contact);
