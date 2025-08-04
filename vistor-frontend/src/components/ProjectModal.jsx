import { useEffect,useState } from "react";
import EmailModal from "./EmailModal";

export default function ProjectModal({ isOpen, onClose, project, sections = [] }) {
  const [showEmail, setShowEmail] = useState(false);
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen || !project) return null;

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 pt-5"
      style={{ zIndex: 1050, overflowY: "auto" }}
    >
      <div className="d-flex justify-content-center align-items-start position-relative">
        {/* Phần nội dung chính */} 
        <div className="col-9">
          {/* Header */}
          <div className="col-12 py-4 px-5 text-white bg-primary-subtle">
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <p><strong>Trạng thái:</strong> {project.status}</p>
          </div>

          {/* Ảnh đại diện */}
          {project.imageUrl && (
            <div className="col-12 py-4 text-center bg-light">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="img-fluid rounded"
                style={{ maxHeight: "100vh", objectFit: "cover" }}
              />
            </div>
          )}

          {/* Sections */}
          <div className="p-5 bg-white">
            {sections.length > 0 ? (
              sections.map((section, index) => (
                <div key={section.id || index} className="mb-4">
                  {section.imageUrl && (
                    <img
                      src={section.imageUrl}
                      alt={`section-${index}`}
                      className="img-fluid mb-2"
                    />
                  )}
                  <p>{section.text}</p>
                </div>
              ))
            ) : (
              ""
            )}
          </div>
        </div>

       
          <button
             style={{
                  position: "fixed",
                  right: "9%",
                  top: "20%",
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  backgroundColor: "#0d6efd", // màu xanh Bootstrap
                  color: "white",
                  fontSize: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "none",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
                  zIndex: 2000,
                  cursor: "pointer",
            }}
            onClick={()=>{setShowEmail(true)}}
          >
            <i className="fa-solid fa-envelope"></i>
          </button>
      <EmailModal isOpen={showEmail} onClose={() => setShowEmail(false)} />     
        <button
          className="btn btn-light position-absolute top-0 end-0 m-4"
          onClick={onClose}
        >
          &times;
        </button>
      </div>

    </div>
    
  );
}
