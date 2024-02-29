import { useState } from "react";
import AddProject from "./AddProject";
import ProjectsSection from "./ProjectsSection";

const Projects = () => {
  const [addProject, setAddProject] = useState(false);
  {
    return addProject ? (
      <AddProject setAddProject={setAddProject} />
    ) : (
      <ProjectsSection setAddProject={setAddProject} />
    );
  }
};

export default Projects;
