const express = require('express');

const {signin,signup,favPost,getUser} = require('../controllers/user.js');
const auth = require('../middleware/auth.js');

const router = express.Router();

router.post('/signin',signin);
router.post('/signup',signup);

router.patch('/addFav/:id/:poster/:title/:date/:media_type/:vote_average',auth,favPost);


router.get('/',auth,getUser);
module.exports = router;