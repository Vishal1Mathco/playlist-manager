import { useLocation } from "react-router-dom";
import "./style.css";

const Navbar = () => {
  const location = useLocation();

  const NavTitle =
    location.pathname === "/add-new-song"
      ? "Add New Song"
      : location.pathname === "/edit-song"
      ? "Edit Song"
      :location.pathname === "/song-details"?"Song Details": "My PlayLists";

  return (
    <div className="nav-bar">
      <h1>{NavTitle}</h1>
    </div>
  );
};

export default Navbar;
