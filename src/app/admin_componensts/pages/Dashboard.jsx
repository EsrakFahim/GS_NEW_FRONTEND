import ActivityLog from "../Components/ActivityLog";
import PanelCard from "../Components/PanelCard";

const Dashboard = () => {
  return (
    <>
        <div className="row g-3 mb-2">
          <PanelCard
            amount="50"
            label="Projects"
            colorClass="bg-primary"
            iconName="medkit-outline"
            link="/"
            linkText="View Projects"
          />
          <PanelCard
            amount="12"
            label="Team Members"
            colorClass="text-success bg-success"
            iconName="people"
            link="/"
            linkText="View Teams"
          />
          <PanelCard
            amount="11"
            label="Blogs"
            colorClass="text-info bg-info"
            iconName="create-outline"
            link="/"
            linkText="View All"
          />
          <PanelCard
            amount="7"
            label="Pages"
            colorClass="text-danger bg-danger"
            iconName="documents-outline"
            link="/"
            linkText="View Pages"
          />
        </div>

        <div className="row g-3 mb-2">
          <div className="col-lg-6 offset-lg-6">
            <ActivityLog />
          </div>
        </div>
    </>
  );
};

export default Dashboard;
