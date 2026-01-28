
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import BlogList from './pages/BlogList';
import BlogPostDetail from './pages/BlogPostDetail';
import About from './pages/About';
import ScrollToTop from './components/ScrollToTop';
import { AppProvider } from './context/AppContext';

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/post/:id" element={<BlogPostDetail />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
};

export default App;
