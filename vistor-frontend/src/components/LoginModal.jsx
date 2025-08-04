import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) {
      setUsername("");
      setPassword("");
      setErr("");
      setLoading(false);
      setShowPass(false);
    }
  }, [isOpen]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setErr("Vui lòng nhập đầy đủ tài khoản và mật khẩu");
      return;
    }

    setErr("");
    setLoading(true);

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErr(data.message || "Đăng nhập thất bại");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      if (typeof onLoginSuccess === "function") onLoginSuccess();

      onClose();
      navigate("/admin");
    } catch (err) {
      setErr("Lỗi kết nối đến server");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal fade show"
      tabIndex="-1"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={handleLogin}>
            <div className="modal-header">
              <h5 className="modal-title">Đăng nhập</h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={onClose}
              ></button>
            </div>

            <div className="modal-body">
              {err && <div className="alert alert-danger">{err}</div>}

              <div className="mb-3">
                <label className="form-label">Tài khoản</label>
                <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Mật khẩu</label>
                <input
                  type={showPass ? "text" : "password"}
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
                <div className="form-check mt-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="showPassword"
                    checked={showPass}
                    onChange={() => setShowPass(!showPass)}
                  />
                  <label className="form-check-label" htmlFor="showPassword">
                    Hiện mật khẩu
                  </label>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
                disabled={loading}
              >
                Hủy
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Đang đăng nhập..." : "Đăng nhập"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
