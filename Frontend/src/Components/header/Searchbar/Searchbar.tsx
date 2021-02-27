import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IonCol, IonGrid, IonRow } from "@ionic/react";
import React from "react";
import "./searchBar.css"

function Searchbar() {
  return (
    <div className="searchbar">
      <IonGrid className="searchBar ion-no-padding d-flex w_100 ion-align-items-center ion-text-center md hydrated">
        <IonRow className="ion-align-items-center searchRow">
          <IonCol className="label text-center">All London</IonCol>
          <IonCol className="label text-center">Add Rent</IonCol>
          <IonCol className="label text-center">+More Filters</IonCol>
        </IonRow>
        <div className="ion-text-end">
          <div className="cursor-pointer white-circle mr_5">
            <FontAwesomeIcon icon={faSearch} className="searchIcon" />
          </div>
        </div>
      </IonGrid>
    </div>
  );
}

export default Searchbar;
