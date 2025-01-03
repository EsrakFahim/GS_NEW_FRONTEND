"use client";

import React from 'react'
import { TableContainer } from '../../admin_componensts/pages/TableContainer'
import useFetchDataFromDB from '@/API/FetchData'
import Loader from '@/app/ui/Loader/Loader'

const page = () => {

      const {
            data,
            isError,
            isLoading
      } = useFetchDataFromDB("projects/all")

      if (isLoading) return <Loader />
      if (isError) return <div>Error</div>


      return (
            <TableContainer
                  title="All Projects"
                  tableHeader={["Project Title", "Project Description", "Project Type", "Actions"]}
                  tableData={data?.data}
                  rootPath="projects"
            />
      )
}

export default page