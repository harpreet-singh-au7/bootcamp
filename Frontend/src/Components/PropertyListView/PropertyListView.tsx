import React, { useEffect, useRef, useState } from "react";
import { IonGrid, IonRow, IonCol, IonText } from "@ionic/react";
import "./PropertyListView.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTh, faThList } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "./Dropdown/Dropdown";

function PropertyListView() {
  return (
    <div className="listView">
      <IonRow className="propertySearchContainer">
        <IonText className="heading body mt_30 p_0 md hydrated">
          Properties to rent in London
        </IonText>{" "}
      </IonRow>
      <IonGrid className="mt_24 p_0 d-flex sort-by-col">
        <div className="cursor-pointer toggle-view-button">
          <IonRow className="container d-flex grid-mosaic-options-div border radius_8 f14_l17 ml_0 justify_content_between">
            <IonCol className="d-flex justify_content_center align-item-center radius_8">
              <FontAwesomeIcon icon={faTh} />
            </IonCol>
            <IonCol className="list-grid-background-grey d-flex justify_content_center align-item-center radius_8">
              <FontAwesomeIcon icon={faThList} />
            </IonCol>
          </IonRow>
        </div>
        <Dropdown />
      </IonGrid>
    </div>
  );
}

export default PropertyListView;
