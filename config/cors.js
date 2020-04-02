const cors = require('cors')

const corsOptions = {
  origin: '*'
}
if (process.env.NODE_ENV === 'production') {
  corsOptions.origin = process.env.FRONT_URL
}

module.exports = cors(corsOptions)
