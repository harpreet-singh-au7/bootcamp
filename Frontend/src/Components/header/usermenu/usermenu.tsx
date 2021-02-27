import React from 'react'
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IonCol, IonGrid, IonRow } from "@ionic/react";
import { useState } from 'react';
import { render } from '@testing-library/react';
import './usermenu.css'

function Usermenu() {
    const [open, setOpen] = useState(false);

    
    return (
        <div>
            <IonRow className="userMenu d-flex ion-justify-content-between ion-align-items-end">
                                    <IonCol size="6">
                                        <div className="dropdownButton mr_top tocursor">
                                            <FontAwesomeIcon
                                                id="bars1"
                                                icon={faBars}
                                                className="menuIcon"
                                                onClick={() => {
                                                    setOpen(!open);
                                                }}
                                            />
                                        </div>
                                        <FontAwesomeIcon
                                        
                                                icon={faUser}
                                                className="us_icon circle menuIcon"
                                                onClick={() => {
                                                    setOpen(!open);
                                                }}
                                            />
                                    </IonCol>
                                    </IonRow>
           
        </div>
    )
}

export default Usermenu
