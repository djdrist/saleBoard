const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware');
const AdsController = require('../controllers/ads.controller');

router.get('/', AdsController.getAllAds);
router.get('/:id', AdsController.getAdById);
router.post('/', authMiddleware, AdsController.postAd);
router.delete('/:id', authMiddleware, AdsController.deleteAd);
router.put('/:id', authMiddleware, AdsController.editAd);
router.get('/search/:searchPhrase', AdsController.getAdsBySearch);

module.exports = router;
