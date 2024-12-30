import ProjectForm from "../Components/projects/ProjectForm";

const CreateNewProject = () => {
  return (
    <>
        <main className="p-3">
          <div className="panel">
            <div className="panel-header border-bottom">Create New Project</div>
            <ProjectForm />
          </div>
        </main>
    </>
  );
};

export default CreateNewProject;
