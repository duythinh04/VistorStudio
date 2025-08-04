import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Home from './pages/Home';
import Projects from './pages/Projects';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/UserTable";
import Posts from "./pages/admin/PostTable";
import PostDetail from "./pages/admin/PostDetail"






function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="projects" element={<Projects />} />
          {/* các route khác */}
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="posts" element={<Posts />} />
          <Route path="posts/:id" element={<PostDetail />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
