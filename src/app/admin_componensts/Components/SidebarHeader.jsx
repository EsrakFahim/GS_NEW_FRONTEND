// import logo from "../assets/images/faviconGS.png";

import Link from "next/link";

const SidebarHeader = () => {
  return (
    <div className="sidebar-header">
      <div className="logo">
        <Link href="/">
          <div className="logo-container">
            {/* <img src={logo} alt="Logo" /> */}
          </div>
          <span className="logo-text">GalaxySpark</span>
        </Link>
      </div>
    </div>
  );
};

export default SidebarHeader;
