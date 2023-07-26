const express = require ('express');
const userController = require ('../controllers/user.controller');
const passport = require('passport');

const router = express.Router()

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/update/', passport.authenticate('jwt', {session:false}),  userController.update);
router.post('/view', passport.authenticate('jwt', {session:false}), userController.viewUser)
router.post('/delete', passport.authenticate('jwt', {session:false}), userController.deleteUser)

module.exports = router