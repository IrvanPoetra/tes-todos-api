const dbPool = require('../config/database')

const createTodo = async (userId, body) => { 
    const query = `INSERT INTO todos (user_id, title, description, deadline) 
    VALUES (${userId}, '${body.title}', '${body.description}', '${body.deadline}')`

     return dbPool.execute(query);
}

const updateTodo = async (id, userId, body) => {
    const query = `UPDATE todos SET
     title = '${body.title}', description = '${body.description}', deadline ='${body.deadline}' 
     WHERE id = ${id} and user_id = ${userId}`

    return dbPool.execute(query);
}

const viewTodo = async (id, userId) => {
    const query = `SELECT title, description, deadline FROM todos 
    WHERE id = ${id} AND user_id = ${userId}`

    return dbPool.execute(query);
}

const viewAllTodo = async (userId) => {
    const query = `SELECT title, description, deadline FROM todos 
    WHERE user_id = ${userId}`

    return dbPool.execute(query);
}

const deleteTodo = async (id, userId) => {
    const query = `DELETE FROM todos WHERE id = ${id} AND user_id = ${userId}`

    return dbPool.execute(query);
}

const getTodoByTitle = async (title) => {
    const query = `SELECT id, title, description FROM todos WHERE title = '${title}'`

    return dbPool.execute(query)
}

module.exports = { 
    createTodo,
    viewTodo,
    updateTodo,
    viewAllTodo,
    deleteTodo,
    getTodoByTitle
}