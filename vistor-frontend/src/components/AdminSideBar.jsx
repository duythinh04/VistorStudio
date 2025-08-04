import { NavLink } from "react-router-dom";

export default function AdminSideBar() {
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark" style={{ width: "250px", minHeight: "100vh" }}>
      <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <i className="fas fa-tachometer-alt me-2"></i>
        <span className="fs-4">Admin</span>
      </a>
      <hr />

      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <NavLink to="/admin" className="nav-link text-white" end>
            <i className="fas fa-fw fa-tachometer-alt me-2"></i>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/users" className="nav-link text-white">
            <i className="fas fa-users me-2"></i>
            Users
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/posts" className="nav-link text-white">
            <i className="fas fa-file-alt me-2"></i>
            Posts
          </NavLink>
        </li>
      </ul>

      <hr />
      <div className="text-white-50">© 2025 Admin</div>
    </div>
  );
}
