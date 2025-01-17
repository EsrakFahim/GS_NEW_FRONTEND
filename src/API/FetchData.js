import { useQuery, QueryClient } from "react-query";
import axios from "axios";

const fetchCollectionData = async (collection) => {
      const { data } = await axios.get(
            `${process.env.NEXT_PUBLIC_PRODUCTION_SERVER_API}/${collection}`
      );
      console.log("Fetched data with axios:", data);
      return data;
};

const useFetchDataFromDB = (collection) => {
      const { data, isError, isLoading } = useQuery(
            ["data", collection],
            () => fetchCollectionData(collection),
            {
                  staleTime: 1000 * 60 * 10, // 10 minutes
                  cacheTime: 1000 * 60 * 60, // 1 hour
                  refetchOnWindowFocus: false,
            }
      );

      return { data, isError, isLoading };
};

// Prefetch function
export const prefetchCollectionData = async (queryClient, collection) => {
      await queryClient.prefetchQuery(["data", collection], () =>
            fetchCollectionData(collection)
      );
};

export { useFetchDataFromDB };
