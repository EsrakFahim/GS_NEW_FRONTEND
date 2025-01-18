import axios from "axios";
import { useMutation } from "react-query";

// Create an Axios instance
const api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_PRODUCTION_SERVER_API,
      withCredentials: true, // Ensures cookies are sent with the request
});

// Generic API request handler
const handleRequest = async (method, url, data = {}, headers = {}) => {
      try {
            const response = await api({
                  method,
                  url,
                  data,
                  headers,
            });
            return response.data;
      } catch (error) {
            console.error(`Error in ${method.toUpperCase()} request to ${url}:`, error?.response?.data || error.message);
            throw error;
      }
};

// API Functions

/**
 * Create a new project
 * @param {Object} projectData - The project data to create
 */
export const createProject = (projectData) =>
      handleRequest("post", "/projects/create", projectData);

/**
 * Create the homepage content
 * @param {Object} homepageData - The homepage data to create
 */
export const createHomepage = (homepageData) =>
      handleRequest("post", "/home-page", homepageData, { "Content-Type": "multipart/form-data" });

/**
 * Create the about page content
 * @param {Object} aboutPageData - The about page data to create
 */
export const createAboutPage = (aboutPageData) =>
      handleRequest("post", "/about-page", aboutPageData, { "Content-Type": "application/json" });


/* 
      * Create the services page content
      * @param {Object} servicesPageData - The services page data to create
*/
export const createServicesPage = (servicesPageData) =>
      handleRequest("post", "/service/upload", servicesPageData, { "Content-Type": "application/json" });


/**
 * Create the about page content
 * @param {Object} contactPageData - The about page data to create
 */
export const createContactPage = (contactPageData) =>
      handleRequest("post", "/contact/social", contactPageData, { "Content-Type": "application/json" });

/**
 * Add a team member
 * @param {Object} teamMemberData - The team member data to add
 */
export const addTeamMember = (teamMemberData) =>
      handleRequest("post", "/team-member/add", teamMemberData, { "Content-Type": "multipart/form-data" });

/**
 * Fetch all projects
 * @returns {Promise<Array>} - The list of projects
 */
export const getProjects = () => handleRequest("get", "/projects");

// React Query Mutations

/**
 * Use a dynamic mutation to create resources in specific collections
 * @returns {Mutation} - The mutation object from React Query
 */
export const useCreateMutation = () =>
      useMutation(async ({ collection, data }) =>
            handleRequest("post", `/${collection}`, data, { "Content-Type": "application/json" })
      );

// Export the Axios instance for additional custom requests
export default api;
