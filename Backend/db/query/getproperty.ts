export const totalPropertyCount = () => {
    return `select count(*) as total_property from property where property.for_rent = 1`;
};