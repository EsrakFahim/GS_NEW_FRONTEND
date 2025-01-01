"use client";

import useFetchDataFromDB from '@/API/FetchData';
import { TableContainer } from '@/app/admin_componensts/pages/TableContainer'
import Loader from '@/app/ui/Loader/Loader';
import React from 'react'

const page = () => {

      const {
            data: members,
            isLoading,
            isError,
            error,
            isFetching
      } = useFetchDataFromDB("team-member")

      if (isLoading) return <Loader />
      if (isError) return <div>Error: {error.message}</div>
      if (isFetching) return <Loader />


      return (
            <TableContainer
                  title="All Team Member"
                  tableHeader={["Name", "Bio", "Experience", "Actions"]}
                  tableData={members?.data}
            />
      )
}

export default page