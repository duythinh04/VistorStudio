import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LogoutModal from "./LogoutModal";

export default function AdminTopBar() {
  const [open, setOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand bg-light border-bottom shadow-sm px-3">
        <div className="ms-auto d-flex align-items-center position-relative" ref={dropdownRef}>
          <button
            className="btn btn-light d-flex align-items-center"
            onClick={() => setOpen(!open)}
          >
            <span className="me-2 d-none d-md-inline fw-semibold text-dark">
              Douglas McGee
            </span>
          </button>

          {open && (
            <div className="dropdown-menu dropdown-menu-end show position-absolute" style={{ right: 0, top: 50}}>
              <button
                className="dropdown-item"
                onClick={() => setShowLogout(true)}
              >
                <i className="fas fa-sign-out-alt me-2 text-secondary"></i>
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      <LogoutModal
        isOpen={showLogout}
        onClose={() => setShowLogout(false)}
        onConfirm={handleLogout}
      />
    </>
  );
}
