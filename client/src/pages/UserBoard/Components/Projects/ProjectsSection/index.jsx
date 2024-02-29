const ProjectsSection = ({ setAddProject }) => {
  return (
    <div className="projects-sec">
      <div className="projects-sec-left">
        <div
          className="projects-addProject-btn-sec"
          onClick={() => setAddProject(true)}
        >
          <h3 className="projects-addProject-btn-label">Add Project</h3>
          <div className="projects-addProject-btn-arrow-sec"></div>
        </div>
        <div className="projects-list-sec">
          <div className="projects-project-sec">
            <h3 className="projects-project-header">FreshFromFarm</h3>
          </div>
        </div>
      </div>
      <div className="projects-sec-right"></div>
    </div>
  );
};

export default ProjectsSection;
