const AddProject = ({ setAddProject }) => {
  return (
    <div className="addProject-sec">
      <form className="addProject-form">
        <div className="addProject-form-sec">
          <p className="addProject-form-label">Name your Project</p>
          <input type="text" className="addProject-form-input" />
        </div>
        <button className="addProject-form-btn cta-btn">Add project</button>
      </form>
    </div>
  );
};

export default AddProject;
