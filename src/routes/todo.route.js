const express = require ('express');
const todoController = require ('../controllers/todo.controller');
const passport = require('passport');

const router = express.Router()

router.post('/create', passport.authenticate('jwt', {session:false}), todoController.createTodo);
router.post('/update/:id', passport.authenticate('jwt', {session:false}), todoController.updateTodo);
router.post('/view/:id', passport.authenticate('jwt', {session:false}), todoController.viewTodo);
router.post('/view', passport.authenticate('jwt', {session:false}), todoController.viewAllTodo)
router.post('/delete/:id', passport.authenticate('jwt', {session:false}), todoController.deleteTodo)

module.exports = router