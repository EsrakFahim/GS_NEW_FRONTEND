"use client";

import useFetchDataFromDB from '@/API/FetchData';
import { TableContainer } from '@/app/admin_componensts/pages/TableContainer'
import Loader from '@/app/ui/Loader/Loader';
import React from 'react'

const page = () => {

      const {
            data: services,
            isLoading,
            isError,
            error,
            isFetching
      } = useFetchDataFromDB("service")

      if (isLoading) return <Loader />
      if (isError) return <div>Error: {error.message}</div>
      if (isFetching) return <Loader />


      return (
            <TableContainer
                  title="All Services"
                  tableHeader={["Service Name", "Service Description", "Service Category", "Actions"]}
                  tableData={services?.data}
                  rootPath="service"
            />
      )
}

export default page