import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import React from "react";
export default function Topbar() {
  /*<div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>*/
  /* <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>*/
  /* <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>*/
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
   <>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/css/bootstrap.min.css"></link>
    
   
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/js/bootstrap.min.js"></script>

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container">
    <Link to="/" className="navbar-brand">Pdf Books Analysis</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link to="/Stylometry" className="nav-link">Analyse</Link>
        </li>
         {/*<li className="nav-item">
          <Link to="Show" className="nav-link">Show</Link>
  </li>*/}
        <li className="nav-item">
          <Link to={`/profile/${user.username}`} className="nav-link">Profile</Link>
        </li>
      </ul>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/" className="nav-link">Deconnect</Link>
        </li>
      </ul>
      <Link to={`/profile/${user.username}`} className="nav-link">
        <img
          src={
            user.profilePicture
              ? PF + user.profilePicture
              : PF + "person/noAvatar.png"
          }
          alt=""
          className="topbarImg"
        />
      </Link>
    </div>
  </div>
</nav> </>
   /* <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Pdf Book</span>
        </Link>
      </div>
      <div className="topbarCenter">

      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
         
        </div>
        <div className="topbarIcons">
         
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>*/
  );
}
