import { useQuery } from "react-query";
import axios from "axios";

const useFetchDataFromDB = (collection) => {
      const { data, isError, isLoading } = useQuery(
            ["data", collection],
            async () => {
                  const { data } = await axios.get(
                        `${process.env.NEXT_PUBLIC_PRODUCTION_SERVER_API}/${collection}`
                  );
                  console.log("Fetched data with axios:", data);
                  return data;
            },
            {
                  refetchOnWindowFocus: false,
            }
      );

      return { data, isError, isLoading };
};

export { useFetchDataFromDB };
