import React from 'react'
import TeamMemberForm from '../Components/Team/TeamMemberForm';

const AddTeamMember = () => {
  return (
    <>
        <main className="p-3">
          <div className="panel">
            <div className="panel-header border-bottom">Add Team Member</div>
            <TeamMemberForm />
          </div>
        </main>
    </>
  );
}

export default AddTeamMember