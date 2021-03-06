export const totalPropertyCount = () => {
    return `select count(*) as total_property from property where property.for_rent = 1`;
};

export const bedroomCount = () =>{
    return "(SELECT count(*)from pr_room as pr WHERE pr.room_type_id=1 and pr.property_id=property.id)as bedrooms"
}

export const imgUrl = () =>{
    return "select distinct photo.property_id,p.id,photo.url from property as p inner join pr_photo as photo ON p.id=photo.property_id where p.for_rent=1"
}

export const gettingProperty =()=>{
    return "Select * from property where property.for_rent=1"
}

export const gettingPropertyName =() =>{
    return 'select property_name from property where property.for_rent=1'
}
