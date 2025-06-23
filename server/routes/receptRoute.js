const { createToken } = require('../controllers/addToken');
const { createRecept } = require('../controllers/createRecept');
const { receptRegister } = require('../controllers/receptRegister');
const { receptDataReader } = require('../controllers/receptDataReader');
const { ReceptlogController } = require('../controllers/ReceptlogController');
const { retrievePatientDetails } = require('../controllers/retrievePatientDetails');
const { billingAmount } = require('../controllers/billingAmount');

const router = require('express').Router();

router.post("/createrecept",createRecept);
router.post("/createtoken",createToken);
router.post("/receptregister",receptRegister);
router.post("/retrecept",receptDataReader);
router.post("/logrecept",ReceptlogController);
router.post("/retrpat",retrievePatientDetails);
router.post("/bill",billingAmount);

module.exports = router;