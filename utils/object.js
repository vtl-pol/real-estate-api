const extract = (attributes, target) => {
  const result = {}
  Object.assign(result, ...attributes.map((attr) => ({ [String(attr)]: target[String(attr)] })))
  return result
}

module.exports = { extract }
