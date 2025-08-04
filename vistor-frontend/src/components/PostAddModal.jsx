import { useState, useEffect } from "react";
import axios from "axios";

export default function AddPostModal({ isOpen, onClose, onAdd }) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Public");
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Lỗi khi tải danh sách users:", err);
      }
    }

    fetchUsers();
  }, []);

  const handleImageUpload = async (file) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/upload-image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setImageUrl(res.data.imageUrl);
    } catch (err) {
      console.error("Lỗi upload ảnh:", err);
      alert("Không thể upload ảnh");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !status || !userId) {
      alert("Vui lòng nhập đủ thông tin!");
      return;
    }
    onAdd({ title, status, userId, imageUrl });
    setTitle("");
    setStatus("Public");
    setUserId("");
    setImageUrl("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="d-flex justify-content-center">
      <div className="col-5 mb-3">
        <div className="bg-white rounded p-4 shadow">
          <div className="flex justify-between items-center mb-3">
            <h5 className="font-bold text-lg">Thêm bài viết</h5>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Tiêu đề</label>
              <input
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Nhập tiêu đề"
              />
            </div>

            <div className="form-group mt-2">
              <label>Status</label>
              <select
                className="form-control"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </select>
            </div>

            <div className="form-group mt-2">
              <label>Người tạo</label>
              <select
                className="form-control"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              >
                <option value="">-- Chọn người dùng --</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.username}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group mt-2">
              <label>Ảnh chính</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    handleImageUpload(file);
                  }
                }}
              />
              {uploading && <small>Đang tải ảnh...</small>}
              {imageUrl && (
                <div className="mt-2 text-center">
                  <img
                    src={imageUrl}
                    alt="preview"
                    className="img-fluid rounded"
                    style={{ maxHeight: "200px" }}
                  />
                </div>
              )}
            </div>

            <div className="mt-3 d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-secondary me-2"
                onClick={onClose}
              >
                Hủy
              </button>
              <button type="submit" className="btn btn-primary">
                Lưu
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
