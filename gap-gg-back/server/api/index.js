const router = require('express').Router();
const riot = require('./riot');

//riot.ctrl에서 가공해놓은 후 router로 정의해놓는 곳?

router.use('/riot', riot);

module.exports = router;