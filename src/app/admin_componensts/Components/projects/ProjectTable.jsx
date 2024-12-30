const projects = [
  { name: "Project 1", description: "Project 1 Description", type: "Active" },
  { name: "Project 2", description: "Project 2 Description", type: "Active" },
  { name: "Project 3", description: "Project 3 Description", type: "Active" },
  { name: "Project 4", description: "Project 4 Description", type: "Active" },
];

const ProjectTable = () => {
  return (
    <div className="table-responsive">
      <table className="table table-bordered table-hover table-striped">
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Project Description</th>
            <th>Project Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => (
            <tr key={index}>
              <td>{project.name}</td>
              <td>{project.description}</td>
              <td>{project.type}</td>
              <td className="d-flex gap-1 flex-wrap">
                <button className="btn btn-primary btn-sm">
                  <i className="fa-solid fa-pen"></i>
                </button>
                <button className="btn btn-danger btn-sm">
                  <i className="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;
