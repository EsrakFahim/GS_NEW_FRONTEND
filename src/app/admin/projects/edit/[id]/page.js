"use client";

import useFetchSingleData from "@/API/FetchSingleData";
import ProjectForm from "@/app/admin_componensts/Components/projects/ProjectForm";
import { useParams } from "next/navigation";


const Page = () => {
      const params = useParams();
      const id = params.id; // Dynamic segment
      const {
            data: projectData,
            isLoading,
            isError,
            error,
      } = useFetchSingleData("projects", id);


      if (isLoading) return <div>Loading...</div>;
      if (isError) return <div>Error: {error.message}</div>;

      console.log("Project Data:", projectData);


      return (
            <main className="p-3">
                  <div className="panel">
                        <div className="panel-header border-bottom">Edit Project</div>
                        <ProjectForm
                              initialData={projectData?.data}
                              operation="edit"
                        />
                  </div>
            </main>
      )
};

export default Page;
