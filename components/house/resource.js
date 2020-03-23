const brief = function (house) {
  return (({
    id,
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
    /* eslint-disable camelcase */
    created_at,
    /* eslint-disable camelcase */
    updated_at
  }) => ({
    id,
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
    /* eslint-disable camelcase */
    created_at,
    /* eslint-disable camelcase */
    updated_at
  }))(house)
}

module.exports = { brief }
