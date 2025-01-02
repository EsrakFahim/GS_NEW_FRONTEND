"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const page = () => {
      const searchParams = useSearchParams();


      console.log(searchParams);


      return
      <Suspense fallback={<div>Loading...</div>}>
            <div>Page ID: {id}</div>;
      </Suspense>
};

export default page;
