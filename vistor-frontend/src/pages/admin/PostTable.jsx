import DataTable from "react-data-table-component";
import AddPostModal from "../../components/PostAddModal";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function Posts() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/posts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      alert("Lỗi khi tải bài viết");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleDeletePost = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa bài viết?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/posts/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Lỗi khi xóa bài viết");

      setPosts((prev) => prev.filter((p) => p.id !== id));
      alert("Đã xóa bài viết");
    } catch (err) {
      alert("Xóa bài viết thất bại");
      console.error(err);
    }
  };

  const handleAddPost = async (newPost) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newPost),
      });

      const created = await res.json();
      if (!res.ok) throw new Error(created.message || "Lỗi khi thêm bài viết");

      setPosts((prev) => [...prev, created]);
      setShowModal(false);
      alert("Thêm bài viết thành công");
    } catch (err) {
      alert("Thêm bài viết thất bại");
      console.error(err);
    }
  };

  const columns = [
    { name: "ID", selector: (row) => row.id, sortable: true, width: "80px" },
    { name: "Tiêu đề", selector: (row) => row.title, sortable: true },
    { name: "Trạng thái", selector: (row) => row.status },
    {
      name: "Người đăng",
      selector: (row) => row.User?.username || "Không rõ",
      sortable: true,
    },
    {
      name: "Tạo lúc",
      selector: (row) => new Date(row.createdAt).toLocaleString("vi-VN"),
    },
    {
      name: "Cập nhật",
      selector: (row) => new Date(row.updatedAt).toLocaleString("vi-VN"),
    },
    {
      name: "Hành động",
      cell: (row) => (
        <>
          <button
            className="btn btn-sm btn-primary me-2"
            onClick={() => navigate(`/admin/posts/${row.id}`)}
          >
            ✏️ Sửa
          </button>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => handleDeletePost(row.id)}
          >
            🗑 Xóa
          </button>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div className="container-fluid">
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <h4 className="text-primary">Danh sách bài viết</h4>
        <button className="btn btn-success" onClick={() => setShowModal(true)}>
          + Thêm bài viết
        </button>
      </div>

      <AddPostModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onAdd={handleAddPost}
      />

      <div className="shadow mb-4 p-2">
        <div className="card-body">
          <DataTable
            columns={columns}
            data={posts}
            progressPending={loading}
            pagination
            highlightOnHover
            striped
            responsive
            noDataComponent="Chưa có bài viết nào"
          />
        </div>
      </div>
    </div>
  );
}
