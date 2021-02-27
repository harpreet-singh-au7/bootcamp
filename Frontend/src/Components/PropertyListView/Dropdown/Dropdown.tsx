import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IonButton } from '@ionic/react';
import React, { useEffect, useRef, useState } from 'react'
import "./Dropdown.css"
import {useDetectOutsideClick} from"./Outsideclick"

function Dropdown() {
    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
    const onClick = () => setIsActive(!isActive);
  
    return (
      <div className="container">
        <div className="menu-container">
          <button onClick={() =>onClick()} className="clickable menu-trigger">
            <span>Sort by</span>
            <FontAwesomeIcon icon={faCaretDown} />
          </button>
        </div>
        {isActive &&  <nav
            ref={dropdownRef}
            className={`drop har ${isActive ? "active" : "inactive"}`}
          >
            <ul>
              <li>
                <a href="#">Price High to low</a>
              </li>
              <li>
                <a href="#">Price Low to high</a>
              </li>
              <li>
                <a href="#">Beds High to low</a>
              </li>
              <li>
                <a href="#">Beds Low to high</a>
              </li>
              <li>
                <a href="#">Baths High to low</a>
              </li>
              <li>
                <a href="#">Beds High to low</a>
              </li>
              <li>
                <a href="#">Baths Low to high</a>
              </li>
              <li>
                <a href="#">Move-in date High to low</a>
              </li>
              <li>
                <a href="#">Move-in date Low to high</a>
              </li>
            </ul>
          </nav>}
      </div>
    
    )
}

export default Dropdown
