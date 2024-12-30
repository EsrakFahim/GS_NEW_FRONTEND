import { forwardRef } from "react";
import SidebarHeader from "../Components/SidebarHeader";
import ProfileSection from "../Components/ProfileSection";
import SidebarNav from "./SidebarNav";

const Sidebar = forwardRef((props, ref) => {
  return (
    <div className="sidebar" ref={ref}>
      <SidebarHeader />
      <ProfileSection />
      <SidebarNav />
    </div>
  );
});

Sidebar.displayName = "Sidebar"; // Set the display name for debugging

export default Sidebar;
