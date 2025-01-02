"use client";

import { useSearchParams } from "next/navigation";

const Page = () => {
      const searchParams = useSearchParams();
      const id = searchParams.get("id"); // Get the "id" parameter

      

      return <div>Page ID: {id}</div>;
};

export default Page;
