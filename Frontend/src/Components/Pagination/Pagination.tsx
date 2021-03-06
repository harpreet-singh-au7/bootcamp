import { IonGrid, IonNav } from '@ionic/react'
import React from 'react'
import "./pagination.css"

function Pagination(props: { count:number,propertyPerPage:number,paginate:any }) {

    const pageNumbers=[]

    for(let i = 1 ; i<=Math.ceil(props.count/props.propertyPerPage);i++ ){
        pageNumbers.push(i)
    }
    console.log(pageNumbers)
    return (
            <div className="Pagination">
                {pageNumbers.map(number =>{
                   return(
                    <a href="!#" onClick={() => props.paginate(number)} >
                        {number}
                    </a>
                    
                )})}
            </div>
            
    )
}

export default Pagination
function totalProperty(totalProperty: any) {
    throw new Error('Function not implemented.')
}

function paginate(number: number): void {
    throw new Error('Function not implemented.')
}

