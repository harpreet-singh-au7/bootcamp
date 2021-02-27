import { escape } from 'mysql';

export const getPropertiesList = (offset: number, limit: number, sortBy: string, data: any) => {
    offset = (offset - 1) * limit;
    let whereQuey = '';
    let havingQuery = '';
    // case undefined:
    //     break
    // if (data.bedroomCount) {
    //     havingQuery += ` having bedrooms = '${data.bedroomCount}'`;
    // }

    if (data.noOfChild > 0) {
        whereQuey += `
        and property.id not in (SELECT property.id FROM pr_rule
            join property
            on pr_rule.property_id = property.id
            where pr_rule.sub_type_id = 79)
        `
    }

    if (data.noOfPet > 0) {
        whereQuey += `
        and property.id not in (SELECT property.id FROM pr_rule
            join property
            on pr_rule.property_id = property.id
            where pr_rule.sub_type_id = 76)
        `
    }

    if (data.postcode && data.postcode.length) {
        // ["E", "NW"]
        // postcode like 'E%' OR postcode LIKE 'NW%'
        whereQuey += 'and ('
        data.postcode.forEach((code: string, index: number) => {

            // Let's mark other london as => O
            if (code == "O") {
                ['BR', 'CR', 'EN', 'HA', 'IG', 'KT', 'RM', 'SM', 'TW', 'UB', 'WD'].forEach((oCode: string, oIndex: number) => {
                    if (index == 0 && oIndex == 0) {
                        whereQuey += `address.postcode LIKE '${oCode}%'`
                    }
                    else {
                        whereQuey += `OR address.postcode LIKE '${oCode}%'`
                    }
                })

            } else {
                // First Index
                // if only north is selected then, exclude the NW postcodes.
                if (index == 0) {
                    if (code === 'N')
                        whereQuey += `(address.postcode LIKE '${code}%' AND address.postcode NOT LIKE 'NW%')`
                    else
                        whereQuey += `address.postcode LIKE '${code}%'`
                }
                // Last index
                else {
                    if (code === 'N')
                        whereQuey += `OR (address.postcode LIKE '${code}%' AND address.postcode NOT LIKE 'NW%')`
                    else
                        whereQuey += `OR address.postcode LIKE '${code}%'`
                }
            }

        })
        whereQuey += ')'
    }
    if (data.latTop && data.latBottom) {
        whereQuey += ` and (marker_lattitude <= ${escape(parseFloat(data.latTop))} and marker_lattitude >= ${escape(parseFloat(data.latBottom))})`;
    }
    if (data.longTop && data.longBottom) {
        whereQuey += ` and (marker_longitude <= ${escape(parseFloat(data.longBottom))} and marker_longitude >= ${escape(parseFloat(data.longTop))})`;
    }
    if (data.minPrice) {
        whereQuey += ` and pr_for_rent.asking_price >= ${data.minPrice}`;
    }
    if (data.maxPrice) {
        whereQuey += ` and pr_for_rent.asking_price <= ${data.maxPrice}`;
    }
    if (data.maximumRentalPrice) {
        whereQuey += ` and pr_for_rent.asking_price <= ${escape(data.maximumRentalPrice)}`;
    }
    if (data.userId) {
        // whereQuey += " and marker_longitude like '%${data.userId}%'";
    }
    if (data.moveInDay) {
        // let dateStringArray = data.moveInDay.split('-')
        // let date = dateStringArray[2] + '-' + dateStringArray[1] + '-' + dateStringArray[0]
        whereQuey += ` and (pr_for_rent.available_from <= '${data.moveInDay}')`;
    }

    if (data.bathroomCount) {
        havingQuery += ` having bathrooms = '${data.bathroomCount}'`;
    }


    if (data.bedroomCount) {
        if (havingQuery.length) {
            if (data.bedroomCount.length) {
                data.bedroomCount.map((bedroomCount: any, index: any) => {
                    if (index === 0) {
                        if (bedroomCount === 3 || bedroomCount === '3')
                            havingQuery += ` and bedrooms >= '${bedroomCount}'`;
                        else
                            havingQuery += ` and bedrooms = '${bedroomCount}'`;
                    }
                    else {
                        if (bedroomCount === 3 || bedroomCount === '3')
                            havingQuery += ` or bedrooms >= '${bedroomCount}'`;
                        else
                            havingQuery += ` or bedrooms = '${bedroomCount}'`;
                    }
                })
            }
        }
        else {
            if (data.bedroomCount.length) {
                data.bedroomCount.map((bedroomCount: any, index: any) => {
                    if (index === 0) {
                        if (bedroomCount === 3 || bedroomCount === '3')
                            havingQuery += ` having bedrooms >= '${bedroomCount}'`;
                        else
                            havingQuery += ` having bedrooms = '${bedroomCount}'`;
                    }
                    else {
                        if (bedroomCount === 3 || bedroomCount === '3')
                            havingQuery += ` or bedrooms >= '${bedroomCount}'`;
                        else
                            havingQuery += ` or bedrooms = '${bedroomCount}'`;
                    }
                })
            }
        }
    }


    if (data.amenities && data.amenities.length) {
        // global.logger("data Amenities:-" + data.amenities)
        //Underfloor Heating,Concierge,Lift,Balcony,
        if (havingQuery.length) {
            let loopData = data.amenities.split(',');
            havingQuery += ` and `;
            for (let i = 0; i < loopData.length; i++) {
                if (loopData[i] != '') {
                    havingQuery += `find_in_set('${loopData[i]}', pr_sub_types) and `;
                }
            }
            havingQuery = havingQuery.substring(0, havingQuery.length - 5);
        } else {
            let loopData = data.amenities.split(',');
            havingQuery += ` having `;
            for (let i = 0; i < loopData.length; i++) {
                if (loopData[i] != '') {
                    havingQuery += `find_in_set('${loopData[i]}', pr_sub_types) and `;
                }
            }
            havingQuery = havingQuery.substring(0, havingQuery.length - 5);
        }
    }
    if (data.propertyTypes && data.propertyTypes.length) {
        // global.logger("data Amenities:-" + data.amenities)
        //Underfloor Heating,Concierge,Lift,Balcony,
        if (havingQuery.length) {
            let loopData = data.propertyTypes.split(',');
            havingQuery += ` and `;
            for (let i = 0; i < loopData.length; i++) {
                if (loopData[i] != '') {
                    havingQuery += `find_in_set('${loopData[i]}', types) or `;
                }
            }
            havingQuery = havingQuery.substring(0, havingQuery.length - 4);
        } else {
            let loopData = data.propertyTypes.split(',');
            havingQuery += ` having `;
            for (let i = 0; i < loopData.length; i++) {
                if (loopData[i] != '') {
                    havingQuery += `find_in_set('${loopData[i]}', types) or `;
                }
            }
            havingQuery = havingQuery.substring(0, havingQuery.length - 4);
        }
    }

    let orderByQuey = '';
    //'Price low to high', 'Price high to low','Oldest', 'Latest', 'Move in date'
    if (sortBy === 'Price Low to high') {
        orderByQuey += ' price ASC';
    }
    else if (sortBy === 'Price High to low') {
        orderByQuey += ' price DESC';
    }
    else if (sortBy === 'Beds Low to high') {
        orderByQuey += ' bedrooms ASC , created_at DESC';
    }
    else if (sortBy === 'Beds High to low') {
        orderByQuey += ' bedrooms DESC, created_at DESC';
    }
    else if (sortBy === 'Baths Low to high') {
        orderByQuey += ' bathrooms ASC , created_at DESC';
    }
    else if (sortBy === 'Baths High to low') {
        orderByQuey += ' bathrooms DESC, created_at DESC';
    }
    else if (sortBy === 'Oldest') {
        orderByQuey += ' created_at ASC';
    }
    else if (sortBy === 'Latest') {
        orderByQuey += ' created_at DESC';
    }
    else if (sortBy === 'Move-in date High to low') {
        orderByQuey += ' available_from DESC';
    }
    else if (sortBy === 'Move-in date Low to high') {
        orderByQuey += ' available_from ASC';
    }
    else if (sortBy === 'Favourites' && (data.userId && data.userId != '')) {
        orderByQuey += ' saved_prop DESC';
    }
    else
        orderByQuey += ' bedrooms ASC, bathrooms ASC, created_at DESC';

    const query =
        `
    SELECT  MAX(property.id) as id,
         MAX(type.type) as types,
         MAX(st.sub_type) as subTypes,` +
        (data.userId && data.userId != '' ? ` MAX(saved_prop.property_id) as saved_prop,` : '') +
        `MAX(pr_for_rent.rm_property_name) AS type,
        (SELECT count(*)from pr_room as pr WHERE pr.room_type_id=1 and pr.property_id=property.id)as bedrooms,
        (SELECT count(*)from pr_room as pr1 WHERE pr1.room_type_id=2 and pr1.property_id=property.id)as bathrooms,
        (SELECT url from pr_photo as p2 where p2.lead_photo=1 and p2.type='original' and p2.is_deleted=0
        ORDER BY type ASC LIMIT 1) as originalimg,
        GROUP_CONCAT(DISTINCT IFNULL(st.sub_type, ''), '') AS pr_sub_types,
        GROUP_CONCAT(DISTINCT IFNULL(type.type, ''), '') as pr_types,
        MAX(address.postcode) as postcode,
        MAX(address.formatted_address) as formatted_address,
        MAX(address.address_2) as address_2,
        MAX(address.short_add) as short_address,
        MAX(address.town_city) as town_city,
        MAX(property.property_name) as property_name,
        MAX(property.desc_access_amenities) as desc_access_amenities,
        MAX(property.desc_additional_areas) as desc_additional_areas,
        MAX(property.desc_getting_around) as desc_getting_around,
        MAX(property.desc_internal_lname) as desc_internal_lname,
        MAX(property.desc_listing) as desc_listing,
        MAX(property.desc_other_things) as desc_other_things,
        MAX(property.desc_overview) as desc_overview,
        MAX(property.desc_space) as desc_space,
        MAX(property.desc_whos_manag_prop) as desc_whos_manag_prop,
        MAX(property.created_at) as created_at,
        MAX(pr_for_rent.asking_price) AS price,
        MAX(pr_for_rent.available_from) AS available_from,
        MAX(ph.is_360) as is_360,
        MAX(ph.name) as name,
        MAX(ph.type) as type,
        MAX(ph.url) as url,
        substring_index(group_concat(ph.url SEPARATOR ','), ',', 5) as images,
        MAX(ph.updated_date) as updated_date,
        MAX(pr_for_rent.available_from) as available_from,
        MAX(pr_for_rent.summary) as summary,
        MAX(pr_for_rent.about_the_neighbourhood) as about_the_neighbourhood,
        MAX(pr_for_rent.how_to_get_around) as how_to_get_around,
        MAX(pr_for_rent.other_things) as other_things,
        MAX(pr_for_rent.asking_price) as asking_price,
        MAX(property.local_authority) as local_authority,
        MAX(property.council_tax_band) as council_tax_band,
        MAX(property.council_tax_amount) as council_tax_amount,
        MAX(SUBSTRING(address.postcode,0,LENGTH(address.postcode) + 1 - 3)) AS postcode_district,
        MAX(pr_epc.energy_efficiency_current) as energy_efficiency_current,
        MAX(pr_epc.energy_efficiency_potential) as energy_efficiency_potential,
        MAX(pr_epc.environmental_impact_current) as environmental_impact_current,
        MAX(pr_epc.environmental_impact_potential) as environmental_impact_potential,
        MAX(property.marker_lattitude) as marker_lattitude,
        MAX(property.marker_longitude) as marker_longitude,
        MAX(user.id) as owner_id,
        MAX(user.first_name) as owner_first_name,
        MAX(user.surname) as owner_last_name,
        MAX(user.avatar) as owner_avatar,
        MAX(user.profile_bio) as owner_bio,
        MAX(user.account_status) as owner_status,
        MAX(sub_type.sub_type) as furnished_type
        FROM property
        LEFT JOIN pr_ownership ON property.id = pr_ownership.property_id
        LEFT JOIN user ON (user.id = pr_ownership.user_id)
        LEFT join pr_amenity on pr_amenity.property_id = property.id
        left join type on type.id = property.type_id
        LEFT join sub_type as st on pr_amenity.sub_type_id = st.id
        LEFT JOIN sub_type ON (property.type_id = sub_type.type_id and sub_type.type_id=106)
        LEFT OUTER JOIN pr_for_rent ON property.id = pr_for_rent.property_id
        LEFT OUTER JOIN address ON property.address_id = address.id
        LEFT OUTER JOIN pr_epc ON property.id = pr_epc.property_id
        ` +
        (data.userId && data.userId != '' ? `LEFT JOIN saved_prop on saved_prop.property_id = property.id and saved_prop.user_id = '${data.userId}'` : '') +
        `LEFT JOIN
        (SELECT DISTINCT pr_photo.property_id,
        pr_photo.id,
        pr_photo.room_id,
        pr_photo.url,
        pr_photo.position,
        pr_photo.is_tour,
        pr_photo.type,
        pr_photo.is_360,
        pr_photo.is_360_video,
        pr_photo.updated_date,
        CASE WHEN (pr_room.name IS NULL)
        THEN N'Misc' ELSE pr_room.name END AS name
        FROM pr_photo
        LEFT OUTER JOIN  pr_room ON pr_photo.room_id = pr_room.id
        LEFT OUTER JOIN  property ON pr_photo.property_id = property.id and property.for_rent = 1
        WHERE (property.archived = 0 OR property.archived IS NULL) AND (pr_photo.is_deleted = 0) and pr_room.name != 'floorplan' and pr_photo.url like '%small%'
        ORDER BY pr_photo.position ASC
        ) as ph
        on property.id = ph.property_id and property.for_rent = 1
        where  property.for_rent = 1` +
        `${whereQuey ? ` ${whereQuey}` : ''}` +
        `
        GROUP by property.id` +
        `${havingQuery ? ` ${havingQuery}` : ''}` +
        `${orderByQuey ? ` ORDER BY ${orderByQuey}` : ''}` +
        `
        LIMIT ${limit} offset ${offset}
    `;
    console.log('SORT QIERY====>', query)
    return query;
};