const { photoResource } = require('../photo')

const brief = (house) => {
  return (({
    id,
    authorName,
    title,
    districtId,
    street,
    houseNo,
    price,
    material,
    floors,
    buildingType,
    squareTotal,
    squareLiving,
    squareKitchen,
    squareLand,
    description,
    createdAt,
    updatedAt,
    imageURL
  }) => ({
    id,
    authorName,
    title,
    districtId,
    street,
    houseNo,
    price,
    material,
    floors,
    buildingType,
    squareTotal,
    squareLiving,
    squareKitchen,
    squareLand,
    description,
    createdAt,
    updatedAt,
    imageURL
  }))(house)
}

const full = (house) => {
  return (({
    id,
    title,
    noOfRooms,
    districtId,
    street,
    houseNo,
    price,
    material,
    floors,
    buildingType,
    squareTotal,
    squareLiving,
    squareKitchen,
    squareLand,
    registrationNo,
    renovated,
    garage,
    builtAt,
    description,
    type,
    createdAt,
    updatedAt,
    photos,
    author
  }) => ({
    id,
    title,
    noOfRooms,
    districtId,
    street,
    houseNo,
    price,
    material,
    floors,
    buildingType,
    squareTotal,
    squareLiving,
    squareKitchen,
    squareLand,
    registrationNo,
    renovated,
    garage,
    builtAt,
    description,
    type,
    createdAt,
    updatedAt,
    author,
    photos: photos.map(p => photoResource.brief(p))
  }))(house)
}

module.exports = { brief, full }
