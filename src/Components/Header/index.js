import React, { Component } from "react";
import "./index.css";
import { IoHome, IoAddCircle, IoPerson } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";

class Header extends Component {
  render() {
    return (
      <nav>
        <div className="nav-content">
          <button className="logo-button">
            <img
              src="https://freelogopng.com/images/all_img/1658587597instagram-png-image.png"
              alt="logo-image"
            ></img>
          </button>
          <ul className="menu-list-container">
            <li>
              <IoHome />
              <button className="menu-item">Home</button>
            </li>
            <li>
              <IoPerson />
              <button className="menu-item">Profile</button>
            </li>
            <li>
              <FaHeart />
              <button className="menu-item">Notification</button>
            </li>
            <li>
              <IoAddCircle />
              <button className="menu-item">Create</button>
            </li>
            <li>
              <button className="logout-button">Logout</button>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
export default Header;
