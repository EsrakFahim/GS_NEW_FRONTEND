// src/api/apiService.js
import axios from "axios";

// Create an Axios instance
const api = axios.create({
      // baseURL: "https://galaxy-spark-server.vercel.app/api/v1",
      baseURL: "http://localhost:5001/api/v1",
      withCredentials: true, // Ensures cookies are sent with the request
});

// Function to handle project creation
export const createProject = async (projectData) => {
      try {
            const response = await api.post("/projects/create", projectData, {
                  // No need to set "Content-Type" explicitly
            });
            return response.data;
      } catch (error) {
            console.error(
                  "Error creating project:",
                  error?.response?.data || error.message
            );
            throw error;
      }
};

// Function to homepage creation
export const createHomepage = async (projectData) => {
      try {
            const response = await api.post("/home-page", projectData, {
                  headers: {
                        "Content-Type": "multipart/form-data",
                  },
            });
            return response.data;
      } catch (error) {
            console.error("Error creating project:", error);
            throw error;
      }
};

// Function to handle team member creation
export const addTeamMember = async (teamMemberData) => {
      try {
            const response = await api.post(
                  "/team-member/add",
                  teamMemberData,
                  {
                        headers: {
                              "Content-Type": "multipart/form-data",
                        },
                  }
            );
            return response.data;
      } catch (error) {
            console.error("Error adding team member:", error);
            throw error;
      }
};

// Function to fetch all projects
export const getProjects = async () => {
      try {
            const response = await api.get("/projects");
            return response.data;
      } catch (error) {
            console.error("Error fetching projects:", error);
            throw error;
      }
};

export default api;
