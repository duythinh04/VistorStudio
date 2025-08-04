import { useState } from "react";

export default function AddUserModal({ isOpen, onClose, onAdd }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Member");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      alert("Vui lòng nhập đủ thông tin!");
      return;
    }
    onAdd({ username, password, email, role });
    setUsername("");
    setPassword("");
    setEmail("");
    setRole("Member");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="d-flex justify-content-center">

    <div className="col-5 mb-3">
      <div className="bg-white rounded p-4 shadow">
        <div className="flex justify-between items-center mb-3">
          <h5 className="font-bold text-lg">Thêm người dùng</h5>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>User</label>
            <input
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nhập họ tên"
            />
          </div>
          <div className="form-group">
            <label>Mật khẩu</label>
            <input
              className="form-control"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu"
            />
          </div>
          <div className="form-group mt-2">
            <label>Email</label>
            <input
              className="form-control"
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email"
            />
          </div>
          <div className="form-group mt-2">
            <label>Vai trò</label>
            <select
              className="form-control"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="Admin">Admin</option>
              <option value="Member">Member</option>
            </select>
          </div>
          <div className="mt-3 d-flex justify-content-end">
            <button type="button" className="btn btn-secondary mr-2" onClick={onClose}>Hủy</button>
            <button type="submit" className="btn btn-primary">Lưu</button>
          </div>
        </form>
      </div>
    </div>
    </div>

  );
}
