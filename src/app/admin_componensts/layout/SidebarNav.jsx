import Link from "next/link";
import { useState } from "react";

const SidebarNav = () => {
  // State to track which dropdown is open
  const [openIndex, setOpenIndex] = useState(null);

  const handleDropdown = (index) => {
    // If the same dropdown is clicked again, close it
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index); // Open the clicked dropdown
    }
  };

  return (
    <>
      <nav className="sidbar-nav">
        <ul>
          <li className="dashboard">
            <Link href="/admin">
              <div className="icon-container">
                <ion-icon name="desktop-sharp"></ion-icon>
              </div>
              <span>Dashboard</span>
            </Link>
          </li>

          <li>
            <Link
              href=""
              className={`inner-toggle ${openIndex === 0 ? "open" : ""}`}
              onClick={() => handleDropdown(0)} // Handle click for the "Pages" dropdown
            >
              <div className="icon-container">
                <ion-icon name="document-text-outline"></ion-icon>
              </div>
              <p>Pages</p>
              <i
                className={`fa-solid fa-chevron-left toggle-icon ${openIndex === 0 ? "rotate" : ""
                  }`}
              ></i>
            </Link>
            <ul className="inner-drop">
              <li>
                <Link href="/admin/pages/home">Home</Link>
              </li>
              <li>
                <Link href="/admin/pages/about">About</Link>
              </li>
              <li>
                <Link href="/admin/pages/contact">Contact</Link>
              </li>
            </ul>
          </li>

          <li>
            <Link
              href=""
              className={`inner-toggle ${openIndex === 3 ? "open" : ""}`}
              onClick={() => handleDropdown(3)} // Handle click for the second dropdown
            >
              <div className="icon-container">
                <ion-icon name="code-working-outline"></ion-icon>
              </div>
              <span>Portfolio</span>
              <i
                className={`fa-solid fa-chevron-left toggle-icon ${openIndex === 3 ? "rotate" : ""
                  }`}
              ></i>
            </Link>
            <ul className="inner-drop">
              <li>
                <Link href="/admin/projects">All Projects</Link>
              </li>
              <li>
                <Link href="/admin/projects/create">+ New Project</Link>
              </li>
            </ul>
          </li>

          <li>
            <Link
              href=""
              className={`inner-toggle ${openIndex === 4 ? "open" : ""}`}
              onClick={() => handleDropdown(4)} // Handle click for the second dropdown
            >
              <div className="icon-container">
                <ion-icon name="code-working-outline"></ion-icon>
              </div>
              <span>Services</span>
              <i
                className={`fa-solid fa-chevron-left toggle-icon ${openIndex === 4 ? "rotate" : ""
                  }`}
              ></i>
            </Link>
            <ul className="inner-drop">
              <li>
                <Link href="/admin/services">All Service</Link>
              </li>
              <li>
                <Link href="/admin/services/create">+ New Services</Link>
              </li>
            </ul>
          </li>

          <li>
            <Link
              href=""
              className={`inner-toggle ${openIndex === 5 ? "open" : ""}`}
              onClick={() => handleDropdown(5)} // Handle click for the second dropdown
            >
              <div className="icon-container">
                <ion-icon name="people-outline"></ion-icon>
              </div>
              <span>Team</span>
              <i
                className={`fa-solid fa-chevron-left toggle-icon ${openIndex === 5 ? "rotate" : ""
                  }`}
              ></i>
            </Link>
            <ul className="inner-drop">
              <li>
                <Link href="/admin/team-member/">All Team Members</Link>
              </li>
              <li>
                <Link href="/admin/team-member/create">+ New Team Member</Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default SidebarNav;
