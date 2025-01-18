"use client";

import useFetchSingleData from '@/API/FetchSingleData'
import ServiceForm from '@/app/admin_componensts/ServiceComponents/ServiceForm'
import { useParams } from 'next/navigation';
import React from 'react'

const Page = () => {
      const { id } = useParams();
      const {
            data: service,
            isLoading,
            isError,
      } = useFetchSingleData("service", id, null);

      return (
            <div>
                  <ServiceForm
                        initialData={service?.data}
                        operation="edit"
                        serviceDataLoading={isLoading}
                        serviceDataError={isError}
                  />
            </div>
      )
}

export default Page