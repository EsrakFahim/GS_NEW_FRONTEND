import axios from "axios";

// Function to update a team member
const updateData = async (id, updatedFields, collection) => {
      const baseUrl = `${process.env.NEXT_PUBLIC_PRODUCTION_SERVER_API}/${collection}/update`;
      const url = id ? `${baseUrl}/${id}` : baseUrl;

      console.log("Updating team member with ID:", id, "collection:", collection, "updatedFields:", updatedFields);

      try {
            const response = await axios.put(
                  url, // Use the constructed URL
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

export default updateData;
