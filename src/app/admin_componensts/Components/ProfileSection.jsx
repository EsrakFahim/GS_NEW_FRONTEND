import Link from "next/link";
// import profileImg from "../assets/images/profile.jpg";


const ProfileSection = () => {
  return (
    <div className="profile py-2 mb-3">
      <div className="profile-img-container">
        {/* <img src={profileImg} alt="Profile image" /> */}
      </div>
      <div className="content">
        <div className="dropdown">
          <Link
            className="dropdown-toggle"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            John Snow
          </Link>

          <ul className="dropdown-menu rounded-0 border-light-subtle">
            <li>
              <Link className="dropdown-item" href="#">
                {" "}
                <ion-icon name="person"></ion-icon> My Account
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" href="#">
                <ion-icon name="hammer"></ion-icon> Change Password
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" href="#">
                <ion-icon name="power"></ion-icon> Logout
              </Link>
            </li>
          </ul>
        </div>
        <span className="designation">Administrator</span>
      </div>
    </div>
  );
}

export default ProfileSection