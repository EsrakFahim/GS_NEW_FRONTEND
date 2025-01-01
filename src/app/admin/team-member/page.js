import Table from '@/app/admin_componensts/Components/projects/Table'
import React from 'react'

const page = () => {
      return (
            <div className="p-3">
                  <div className="panel">
                        <div className="panel-header border-bottom mb-3">All Team Members</div>

                        <div className="panel-body p-3 pb-0">
                              <Table />
                        </div>
                  </div>
            </div>
      )
}

export default page