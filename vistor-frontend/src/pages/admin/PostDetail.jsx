import { useEffect, useState } from "react";
import SectionEditor from "../../components/SectionEdit";
import { useParams } from "react-router-dom";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchData() {
      try {
        const [resPost, resSection] = await Promise.all([
          fetch(`${process.env.REACT_APP_API_URL}/api/posts/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${process.env.REACT_APP_API_URL}/api/posts/${id}/sections`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (!resPost.ok || !resSection.ok) throw new Error("Lỗi tải dữ liệu");

        const postData = await resPost.json();
        const sectionData = await resSection.json();

        setPost(postData);
        setSections(sectionData);
      } catch (err) {
        alert("Không thể tải bài viết");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id, token]);

  const handlePostChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handlePostSave = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(post),
      });

      if (!res.ok) throw new Error("Lỗi cập nhật bài viết");

      alert("Cập nhật bài viết thành công");
    } catch (err) {
      alert("Cập nhật thất bại");
      console.error(err);
    }
  };

  const handleSectionChange = (index, updated) => {
    const updatedSections = [...sections];
    updatedSections[index] = updated;
    setSections(updatedSections);
  };

  const handleSectionDelete = async (sectionId) => {
    // Nếu là section mới chưa lưu
    if (sectionId.toString().length > 10) {
      setSections((prev) => prev.filter((s) => s.id !== sectionId));
      return;
    }

    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/posts/${id}/sections/${sectionId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      setSections((prev) => prev.filter((s) => s.id !== sectionId));
    } catch (err) {
      alert("Lỗi khi xoá section");
      console.error(err);
    }
  };

  const handleSectionAdd = () => {
    setSections((prev) => [
      ...prev,
      {
        id: Date.now(),
        postId: id,
        text: "",
        imageUrl: "",
        order: prev.length + 1,
      },
    ]);
  };

  const handleSectionSave = async () => {
    setSaving(true);
    try {
      await Promise.all(
        sections.map((s) =>
          fetch(
            s.id.toString().length > 10
              ? `${process.env.REACT_APP_API_URL}/api/posts/${id}/sections`
              : `${process.env.REACT_APP_API_URL}/api/posts/${id}/sections/${s.id}`,
            {
              method: s.id.toString().length > 10 ? "POST" : "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(s),
            }
          )
        )
      );
      alert("Đã lưu sections");
    } catch (err) {
      alert("Lỗi khi lưu sections");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Đang tải dữ liệu...</p>;

  return (
    <div className="d-flex row">
      {/* Phần chỉnh sửa bài viết */}
      <div className="col-6">
        <h3>Chỉnh sửa bài viết</h3>
        <div className="p-3 mb-4">
          <div className="form-group">
            <label>Tiêu đề</label>
            <input
              name="title"
              value={post.title}
              onChange={handlePostChange}
              className="form-control"
            />
          </div>
          <div className="form-group mt-2">
            <label>Trạng thái</label>
            <select
              name="status"
              value={post.status}
              onChange={handlePostChange}
              className="form-control"
            >
              <option value="private">Riêng tư</option>
              <option value="public">Công khai</option>
            </select>
          </div>
          <div className="form-group mt-2">
            <label>Người đăng</label>
            <input
              value={post.User?.username || `ID: ${post.userId}`}
              className="form-control"
              disabled
            />
          </div>
          <button className="btn btn-primary mt-3" onClick={handlePostSave}>
            Lưu bài viết
          </button>
        </div>
      </div>

      {/* Phần sections */}
      <div className="col-6">
        <h4>Các phần trong bài viết</h4>
        {sections.map((section, index) => (
          <SectionEditor
            key={section.id}
            section={section}
            onChange={(updated) => handleSectionChange(index, updated)}
            onDelete={() => handleSectionDelete(section.id)}
          />
        ))}

        <div className="mt-3">
          <button className="btn btn-secondary me-2" onClick={handleSectionAdd}>
            + Thêm section
          </button>
          <button className="btn btn-success" onClick={handleSectionSave} disabled={saving}>
            {saving ? "Đang lưu..." : "💾 Lưu sections"}
          </button>
        </div>
      </div>
    </div>
  );
}
