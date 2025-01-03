import axios from "axios";

// Function to update a team member
const updatePageData = async (updatedFields, collection) => {
      const baseUrl = `${process.env.NEXT_PUBLIC_PRODUCTION_SERVER_API}/${collection}/update`;

      console.log("collection:", collection, "updatedFields:", updatedFields);

      try {
            const response = await axios.put(
                  baseUrl, // Use the constructed URL
                  updatedFields,
                  {
                        headers: {
                              "Content-Type": "application/json", // Ensure the content type is JSON
                        },
                  }
            );

            console.log("Update successful:", response.data);
            return response.data;
      } catch (error) {
            console.error("Error updating team member:", error.response?.data || error.message);
            throw error;
      }
};

export default updatePageData;
