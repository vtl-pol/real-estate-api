const extract = (attributes, target) => {
  const result = {}
  Object.assign(result, ...attributes.map((attr) => ({ [String(attr)]: target[String(attr)] })))
  return result
}

const without = (attributes, target) => {
  const keys = Object.keys(target).filter(k => attributes.indexOf(k) === -1)
  return extract(keys, target)
}

module.exports = { extract, without }
