import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      className="navbar bg-light py-3 px-4"
      style={{ height: "120px" }}
    >
      <div className="container-fluid row align-items-center">

        <div className="col-4 d-flex gap-4">
          <Link to="/" className="nav-link">XIN CHÀO</Link>
          <Link to="/projects" className="nav-link">CÁC DỰ ÁN CỦA CHÚNG TÔI</Link>
        </div>

        <div className="col-4 text-center">
          <Link to="/">
            <img src="/logo.png" alt="Logo" style={{ maxHeight: "90px" }} />
          </Link>
        </div>

        <div className="col-4 text-end">
          <ul className="list-inline m-0">
            <li className="list-inline-item me-3">
              <a href="https://www.behance.net/Vistor" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-behance fa-lg"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="https://www.facebook.com/vistorstudio" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f fa-lg"></i>
              </a>
            </li>
          </ul>
        </div>

      </div>
    </nav>
  );
}
