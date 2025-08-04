// UserEditModal.jsx
import { useState, useEffect } from "react";

export default function EditUserModal({ isOpen, user, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "Member",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        role: user.role || "Member",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  if (!isOpen || !user) return null;

  return (
    <div className="d-flex justify-content-center">
      <div className="col-5 mb-3">
        <div className="bg-white rounded p-4 shadow">
          <h5 className="font-bold text-lg mb-3">Chỉnh sửa người dùng</h5>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Họ tên</label>
              <input
                className="form-control"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Nhập họ tên"
              />
            </div>
            <div className="form-group mt-2">
              <label>Email</label>
              <input
                className="form-control"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Nhập email"
              />
            </div>
            <div className="form-group mt-2">
              <label>Vai trò</label>
              <select
                className="form-control"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="Admin">Admin</option>
                <option value="Member">Member</option>
              </select>
            </div>
            <div className="mt-3 d-flex justify-content-end">
              <button type="button" className="btn btn-secondary mr-2" onClick={onClose}>
                Hủy
              </button>
              <button type="submit" className="btn btn-primary">Lưu</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
