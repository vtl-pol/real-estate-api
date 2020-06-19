
const formattedErrors = (errs) => {
  const result = {}
  errs.map(err => {
    console.error(err)
    switch (err.type) {
      case 'any.required':
        result[err.path.join('.')] = 'Поле обов\'язкове'
        break
      case 'any.empty':
        result[err.path.join('.')] = 'Поле обов\'язкове'
        break

      case 'string.min':
        result[err.path.join('.')] = `Мінімально ${err.context.limit} символів`
        break
      case 'string.max':
        result[err.path.join('.')] = `Максимально ${err.context.limit} символів`
        break

      case 'array.min':
        result[err.path.join('.')] = `Мінімально ${err.context.limit} запис`
        break

      case 'array.base':
        result[err.path.join('.')] = 'Поле має бути масивом'
        break

      default:
        result[err.path.join('.')] = 'Не вірне значення'
        break
    }
  })
  return result
}

module.exports = { formattedErrors }
