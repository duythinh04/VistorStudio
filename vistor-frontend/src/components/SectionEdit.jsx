import { useState } from "react";

export default function SectionEditor({ section, onChange, onDelete }) {
  const [localSection, setLocalSection] = useState(section);

const handleImageUpload = async (e) => {
  const file = e.target.files[0];
  const formData = new FormData();
  if (!file) {
  alert("Chưa chọn ảnh");
  return;
}
  formData.append("image", file);
  formData.append("postId", localSection.postId);    
  formData.append("sectionId", localSection.id);       
  formData.append("order", localSection.order);        

  try {
    const res = await fetch(
  `${process.env.REACT_APP_API_URL}/api/upload-image?postId=${localSection.postId}&sectionId=${localSection.id}&order=${localSection.order}`,
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: formData,
  }
);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Upload thất bại");

    const updated = { ...localSection, imageUrl: data.imageUrl };
    console.log("Image URL trả về:", data.imageUrl);
    setLocalSection(updated);
    onChange(updated);
  } catch (err) {
    alert("Lỗi upload ảnh");
    console.error(err);
  }
};

  const handleFieldChange = (e) => {
    const updated = { ...localSection, [e.target.name]: e.target.value };
    setLocalSection(updated);
    onChange(updated);
  };
  

  return (
    <div className="p-3 mb-3">
      <div className="form-group">
        <label>Nội dung</label>
        <textarea
          name="text"
          value={localSection.text || ""}
          onChange={handleFieldChange}
          className="form-control"
        />
      </div>
      <div className="form-group mt-2">
        <label>Ảnh (nếu có)</label>
        <input type="file" onChange={handleImageUpload} className="form-control" />
        {localSection.imageUrl && (
          <img
            src={localSection.imageUrl}
            className="img-fluid mt-2"
            style={{ maxHeight: "200px" }}
            alt="Section"
          />
        )}
      </div>
      <div className="form-group mt-2">
        <label>Thứ tự (order)</label>
        <input
          type="number"
          name="order"
          value={localSection.order || 0}
          onChange={handleFieldChange}
          className="form-control"
        />
      </div>

      <button className="btn btn-danger mt-2" onClick={onDelete}>
        Xóa phần này
      </button>
    </div>
  );
}
