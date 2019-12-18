let express = require('express')
let router = express.Router()

router.use('/router', require('./data_server/sqlData'))

module.exports = router;