import { useMemo, memo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// STORE
import useThemeStore from '../Store/themeStore';

// ICONS
import { MdOutlineArrowBackIos } from 'react-icons/md';
import { MdArrowForwardIos } from 'react-icons/md';

// THEME STYLE GENERATOR
const getThemeStyles = (theme) => ({
  link: theme === 'light' ? 'link-light' : 'link-dark',
});

const Pagination = ({ to, previous }) => {
  // THEME STORE
  const theme = useThemeStore((state) => state.theme);

  // MEMOIZED THEME STYLES
  const themeStyles = useMemo(() => getThemeStyles(theme), [theme]);

  // MEMOIZE PAGINATION CONTENT
  const PaginationSection = useMemo(
    () => (
      <div className="pagination">
        <Link to={previous} className={themeStyles.link}>
          <MdOutlineArrowBackIos size={25} />
        </Link>
        <Link to={to} className={themeStyles.link}>
          <MdArrowForwardIos size={25} />
        </Link>
      </div>
    ),
    [themeStyles]
  );

  return <div className="py-6">{PaginationSection}</div>;
};

Pagination.propTypes = {
  to: PropTypes.string.isRequired,
  previous: PropTypes.string.isRequired,
};

export default memo(Pagination);
