require('dotenv').config()
const express = require('express');
const userRouter = require('./routes/user.route')
const todoRouter = require('./routes/todo.route')
require('./middlewares/passport')

const app = express();
const PORT = process.env.PORT || 5000 //5000;

app.use(express.json());
app.use('/user', userRouter);
app.use('/todos', todoRouter);

app.listen(PORT, () => {
    console.log(`Server running di port ${PORT}`);
});