import { IonGrid, IonRow, IonCol } from "@ionic/react";
import React from "react";
import { animated, useSpring } from "react-spring";
import "./Header.css"
import Searchbar from "./Searchbar/Searchbar"
import Usermenu from "./usermenu/usermenu";
import usermenu from "./usermenu/usermenu";

const NavBarImage = ({ condition, onClick }: any) => {
  // transition try one

  const transformSpring = {
    transform: condition ? "translate3d(0,1px,0)" : "translate3d(0,0px,0)",
  };
  const spring = useSpring(transformSpring);
  return (
    <div className="image-stack">
      {" "}
      <animated.img
        style={spring}
        onClick={onClick}
        src="https://propertyloop-qa-dev.azurewebsites.net/build/assets/white-pl-logo.svg"
        // key = {src}
        className={` pr_25 logo-txt logo-icon`}
      />
    </div>
  );
};
function Header() {
  return (
    <div className="navbar navbar-bg">
      <IonGrid className="ion-no-padding">
        <IonRow className="ion-align-items-center justify_content_space_between">
          <IonCol className="d-flex ion-text-start ion-align-items-center ">
            <NavBarImage onClick={() => {}} />
           
          </IonCol>
          <IonCol className="searchbar ion-text-center md hydrated"> <Searchbar /></IonCol>
          
          <IonCol className=" align-items-center lf  d-flex ion-justify-content-end ion-text-end md hydrated">
            <IonCol className="renter rt label tocursor font-weight-600 f14_l17 text-white"> Renters </IonCol>
          <IonCol className="renter label tocursor mx_40_sm_20 font-weight-600 f14_l17"> Owners </IonCol>
          <div className="menubars">
          <IonCol className="userMenu  d-flex ion-justify-content-between ion-align-items-end md hydrated"><Usermenu /></IonCol>
          </div>
          </IonCol>
         
         
          
        </IonRow>
      </IonGrid>
    </div>
  );
}

export default Header;
