const full = function (photo) {
  return (({
    id,
    propertyID,
    fileURL
  }) => ({
    id,
    propertyID,
    fileURL
  }))(photo)
}

module.exports = { full }
