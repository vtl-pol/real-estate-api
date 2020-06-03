
const formattedErrors = (errs) => {
  const result = {}
  errs.map(err => {
    console.error(err)
    switch (err.type) {
      case 'any.required':
        result[err.context.key] = 'Поле обов\'язкове'
        break
      case 'any.empty':
        result[err.context.key] = 'Поле обов\'язкове'
        break
      case 'string.min':
        result[err.context.key] = `Мінімально ${err.context.limit} символів`
        break
      case 'string.max':
        result[err.context.key] = `Максимально ${err.context.limit} символів`
        break
      default:
        result[err.context.key] = 'Не вірне значення'
        break
    }
  })
  return result
}

module.exports = { formattedErrors }
