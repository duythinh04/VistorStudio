import DataTable from "react-data-table-component";
import AddUserModal from "../../components/UserAddModal";
import EditUserModal from "../../components/UserEditModal";
import { useEffect, useState, useCallback } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        throw new Error("API trả về không đúng định dạng");
      }
    } catch (err) {
      console.error("Lỗi khi lấy danh sách người dùng:", err);
      alert("Lỗi khi tải người dùng");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xoá người dùng này?")) return;
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Lỗi xoá người dùng");
      }

      setUsers((prev) => prev.filter((u) => u.id !== id));
      alert("Đã xoá người dùng thành công");
    } catch (err) {
      console.error(err);
      alert("Xoá thất bại");
    }
  };

  const handleAddUser = async (newUser) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newUser),
      });

      const created = await res.json();
      if (!res.ok) throw new Error(created.message || "Thêm người dùng thất bại");

      setUsers((prev) => [...prev, created]);
      setShowAddModal(false);
      alert("Thêm người dùng thành công");
    } catch (err) {
      console.error(err);
      alert("Lỗi khi thêm người dùng");
    }
  };

  const handleUpdateUser = async (updatedUser) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/users/${editUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedUser),
      });

      const updated = await res.json();
      if (!res.ok) throw new Error(updated.message || "Cập nhật thất bại");

      setUsers((prev) =>
        prev.map((u) => (u.id === updated.id ? updated : u))
      );
      setEditUser(null);
      alert("Cập nhật người dùng thành công");
    } catch (err) {
      console.error(err);
      alert("Lỗi khi cập nhật người dùng");
    }
  };

  const columns = [
    { name: "ID", selector: (row) => row.id, sortable: true, width: "80px" },
    { name: "Username", selector: (row) => row.username, sortable: true },
    { name: "Email", selector: (row) => row.email },
    { name: "Role", selector: (row) => row.role },
    {
      name: "Tạo lúc",
      selector: (row) => new Date(row.createdAt).toLocaleString("vi-VN"),
      sortable: true,
    },
    {
      name: "Cập nhật",
      selector: (row) => new Date(row.updatedAt).toLocaleString("vi-VN"),
      sortable: true,
    },
    {
      name: "Hành động",
      cell: (row) => (
        <div className="d-flex gap-2">
          <button className="btn btn-sm btn-primary" onClick={() => setEditUser(row)}>
            ✏️ Sửa
          </button>
          <button className="btn btn-sm btn-danger" onClick={() => handleDeleteUser(row.id)}>
            🗑 Xoá
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div className="container-fluid">
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <h4 className="text-primary">Danh sách người dùng</h4>
        <button className="btn btn-success" onClick={() => setShowAddModal(true)}>
          + Thêm người dùng
        </button>
      </div>

      <AddUserModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddUser}
      />

      <EditUserModal
        isOpen={!!editUser}
        user={editUser}
        onClose={() => setEditUser(null)}
        onUpdate={handleUpdateUser}
      />

      <div className="shadow">
        <div className="card-body p-2">
          <DataTable
            columns={columns}
            data={users}
            pagination
            highlightOnHover
            striped
            responsive
            progressPending={loading}
            noDataComponent="Không có người dùng nào"
          />
        </div>
      </div>
    </div>
  );
}
