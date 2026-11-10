import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Home from './pages/Home.jsx';
import ProjectDetail from './pages/ProjectDetail.jsx';
import Login from './pages/Login.jsx';
import Admin from './pages/Admin.jsx';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />

      <main>
        <Routes>
          <Route path='/' element={<Home />} />

          <Route
            path="/projects/:slug"
            element={<ProjectDetail />}
          />

          <Route
            path="/admin/login"
            element={<Login />}
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />

          <Route
            path='*'
            element={
              <p className='px-6 pt-40 text-center text-muted'>
                Page not found.
              </p>
            }
          />
        </Routes>
      </main>
    </>
  );
}