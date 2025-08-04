import { useEffect, useState } from 'react';
import axios from 'axios';
import LoginFloatButton from "../components/LoginFloatButton";
import ProjectModal from "../components/ProjectModal";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3001/api/posts')
      .then(res => setProjects(res.data))
      .catch(err => console.error("Lỗi tải projects:", err));
  }, []);

  const openModal = async (project) => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:3001/api/posts/${project.id}/sections`);
      setSelectedProject(project);
      setSections(res.data);
    } catch (err) {
      console.error("Lỗi khi tải sections:", err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <div className="site-container py-4 px-5 d-flex flex-wrap">
        {projects.map((p) => (
          <div
            key={p.id}
            className="card position-relative m-1"
            style={{ width: '25rem', cursor: 'pointer',height: '30rem', borderRadius: 'none'}}
            onClick={() => openModal(p)}
          >
            <img src={p.imageUrl} className="card-img-top" alt={p.title} />
            <div className="card-overlay d-flex align-items-center justify-content-center">
              <p className="card-text">{p.title}</p>
            </div>
          </div>
        ))}
      </div>

      <ProjectModal
        isOpen={!!selectedProject}
        onClose={() => {
          setSelectedProject(null);
          setSections([]);
        }}
        project={selectedProject}
        sections={sections}
        loading={loading}
      />

      <LoginFloatButton />
    </>
  );
}

export default Projects;
