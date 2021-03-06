import React, { useEffect, useState } from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonSlides,
  IonSlide,
} from "@ionic/react";
import "./PropertyList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import Axios from 'axios'
import Pagination from "../../Pagination/Pagination"

function PropertyList() {

  const [rentPropList,setrentPropList] = useState([])
  const [totalCount,setTotalCount] = useState([])
  const [loading,setLoading] = useState(false)
  const [currentPage,setCurrentPage]=useState(1)
  const [propertyPerPage,setPropertyPerPage]=useState(20)

  const paginate:any = (pageNumber:number) => setCurrentPage(pageNumber)

  useEffect(() => {
    const rowData=async()=>await Axios.get('http://localhost:5000/api/rowcount').then((res)=>{
      setLoading(true)
      setTotalCount(res.data)
      setLoading(false)
    })
   rowData()
  }, []);

  const count=Array.from(Array(65).keys())
  const indexOfLastPage = currentPage * propertyPerPage;
  const indexOfFirstPage = indexOfLastPage - propertyPerPage
  const currentProperty = count.slice(indexOfFirstPage,indexOfLastPage)
  return (
  <>
  {
    currentProperty.map(i=>{
      if(loading){
       return <h2>Loading .....</h2>
      }
      return (

    <IonGrid className="px_0 mr_l py_0 mb_24">
      <IonRow>
        <IonCol size="6" className="cursor-pointer px_0">
          <IonGrid className="images-array p_0">
            <IonSlide className="property-images-slides slide-image ove radius_8">
              <img
                src="https://propertymediaserver.blob.core.windows.net/images/Okcf7AtY%2Ftha0tf%2Fsmall%2Fimage.png"
                alt="property Image"
                className="i_mob"
              />

              
            </IonSlide>
          </IonGrid>
        </IonCol>
        <IonCol
                size="6"
                className="px_16 py_0 res d-flex flex-direction-column "
              >
                <div className="d-flex flex-direction-column justify_content_between">
                  <div className="mb_6 font-14 d-flex ion-align-items-center justify_content_between">
                    <span className="text_grey_600">Flat/Apartment</span>
                    <div className="proeprty-card-like"></div>
                  </div>
                  <div className="mb_16 w_full text_grey_900 ps_16 font-weight-600 d-flex ion-align-items-center cursor-pointer">
                    {/* Ringwood Gardens, E14 */}
                    {/* {rentPropList.map((val)=>{
                       console.log(Object.values(val))
                      return <span>{val[1]}</span>
                      
                    })} */}
                  </div>
                  <div className="mb_6 bd f14_l17 d-flex ion-align-items-center text_grey_600">
                  <img alt="" src="https://propertyloop-qa-dev.azurewebsites.net/build/assets/pl-icons/svg/bedroom.svg" className="iconSize margin-r-10  margin-xs-r-5 property-card-icon" />
                  &nbsp; 1 Bedroom
                  </div>
                  <div className="mb_6 ba d-flex ion-align-items-center text_grey_600">
                  <IonText className="margin-r-20 margin-xs-r-0 disp-flex align-item-center ts_14">
                  <img alt="" src="https://propertyloop-qa-dev.azurewebsites.net//build/assets/pl-icons/svg/bathtub_gray.svg" className="iconSize margin-r-10  margin-xs-r-5 property-card-icon" />
                  &nbsp; 1 Bath
                  </IonText>
                  </div>
                  <div className="text_grey_600 av d-flex ion-align-items-center ts_14">
                <FontAwesomeIcon
                  icon={faClock}
                  className="mr_10 ts_16  property-card-icon"
                />
                <IonText>Available Now</IonText>
              </div>
                </div>
                <IonRow className="ts_16 pdt_23">
                  <IonText className="w_100 ts_16 text_grey_800">
                  <span className="font-weight-600 des_m">£ 2300 </span> 
                   / month

                  </IonText>
                  <IonText className="w_100 ts_14 text_grey_500 mt_5">
                  <span >£ 400 </span> 
                   / week
                  </IonText>
                </IonRow>
              </IonCol>
      </IonRow>
    </IonGrid>
   )
  })} 
  <Pagination propertyPerPage={propertyPerPage} count={count.length} paginate={paginate}/>
   </>
  );
}

export default PropertyList;
