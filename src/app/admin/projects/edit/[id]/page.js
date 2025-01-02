"use client";

import { useParams } from "next/navigation";


const Page = () => {
      const params = useParams();
      const id = params.id; // Dynamic segment



      return <div>Page ID: {id}</div>;
};

export default Page;
