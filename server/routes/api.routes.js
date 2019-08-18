const { Router } = require('express');
const router = new Router();

const HotdogController = require('../controllers/api.controller');

router.route('/hotdogs').get(HotdogController.getHotdogs);
router.route('/hotdogs').put(HotdogController.createHotdog);
router.route('/hotdogs').post(HotdogController.updateHotdog);
router.route('/hotdogs/:id').delete(HotdogController.deleteHotdog);

module.exports = router;
