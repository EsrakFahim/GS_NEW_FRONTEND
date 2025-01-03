"use client"

import useFetchSingleData from '@/API/FetchSingleData';
import AddTeamMember from '@/app/admin_componensts/pages/AddTeamMember';
import { useParams } from 'next/navigation';
import React from 'react'

const page = () => {
      const params = useParams();
      const id = params.id; // Dynamic segment
      const {
            data: teamMemberData,
            isLoading,
            isError,
            error,
      } = useFetchSingleData("team-member", id);


      if (isLoading) return <div>Loading...</div>;
      if (isError) return <div>Error: {error.message}</div>;

      console.log(teamMemberData);

      return (
            <AddTeamMember
                  initialData={teamMemberData?.data}
                  operation="edit"
            />
      )
}

export default page