import axios from 'axios';

const useDeleteData = async (collection,id) => {

      const url = `${process.env.NEXT_PUBLIC_PRODUCTION_SERVER_API}/${collection}/delete`;
      console.log('URL:', url);

      try {
            const response = await axios.delete(`${url}/${id}`);
            console.log('Data deleted:', response.data);
            return response.data;
      } catch (error) {
            console.error('Error deleting data:', error);
            throw error;
      }
};

export default useDeleteData;