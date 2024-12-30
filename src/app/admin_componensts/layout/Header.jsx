import Link from "next/link";

const Header = ({ sidebarRef }) => {
  const handleToggle = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth > 768) {
      sidebarRef.current.classList.toggle("collapsed");
    } else {
      sidebarRef.current.classList.toggle("active");

      sidebarRef.current.classList.remove("collapsed"); // for mobile view
    }
  }
  
  return (
    <header className="main-header">
      <ul className="header-nav">
        <li className="dropdown-toggler" id="nav-toggler" onClick={handleToggle}>
          <ion-icon name="menu-sharp"></ion-icon>
        </li>
        <li className="search-container hide-xs">
          <form className="form-search">
            <input
              type="search"
              placeholder="Search Settings"
              className="fs-md"
            />
            <button type="submit">
              <ion-icon name="search-sharp"></ion-icon>
            </button>
          </form>
        </li>
        <li className="scan hide-xs">
          <Link href="" className="text-white">
            <ion-icon name="scan"></ion-icon>
          </Link>
        </li>

        <li className="site-logo show-xs">
          <Link href="./index.html">GalaxySpark</Link>
        </li>

        <li className="logout ms-auto hide-xs">
          <Link href="" className="text-white me-2">
            <ion-icon name="power"></ion-icon>
            <span className="ms-1">Logout</span>
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
