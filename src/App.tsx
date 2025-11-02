import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import TestDashboardLink from './components/TestDashboardLink';
import Home from './pages/Home';
import Hustlers from './pages/Hustlers';
import HustlerProfile from './pages/HustlerProfile';
import Categories from './pages/Categories';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import About from './pages/About';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import NotificationTest from './pages/NotificationTest';
import Favorites from './pages/Favorites';
import AdminDashboard from './pages/AdminDashboard';
import { NotificationProvider } from './components/Notification/NotificationProvider';

function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <NotificationProvider>
          <Router>
            <div className="min-h-screen bg-gray-50 flex flex-col">
              <Header />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/hustlers" element={<Hustlers />} />
                  <Route path="/hustler/:id" element={<HustlerProfile />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/category/:id" element={<Hustlers />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:id" element={<BlogPost />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route path="/dashboard/:id" element={<Dashboard />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="/test-notifications" element={<NotificationTest />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                </Routes>
              </main>
              <Footer />
              <TestDashboardLink />
            </div>
          </Router>
        </NotificationProvider>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;