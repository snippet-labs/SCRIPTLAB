import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

// SMOOTH SCROLL
import { ReactLenis } from 'lenis/react';

// COMPONENTS
import Layout from './components/Layout/Layout';
import Loader from './utils/Loader/Loader';

const Content = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return loading ? <Loader /> : <Layout />;
};

const App = () => {
  return (
    <ReactLenis root>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Content />} />
        </Routes>
      </BrowserRouter>
    </ReactLenis>
  );
};

export default App;
