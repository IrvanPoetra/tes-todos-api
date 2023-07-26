const todoService = require('../services/todo.service')
const jwt = require('jsonwebtoken')

const createTodo = async (req, res) => {
    const { body, user: jwtPayload } = req;

    if (!jwtPayload || !jwtPayload.id){
        return res.status(400).json({
            status: 'fail',
            message: 'User tidak valid'
        });
    }

    if ( !body.title || !body.description ) {
        return res.status(400).json({
            status: 'fail',
            message: 'Data tidak sesuai'
        });
    }

    try {
        await todoService.createTodo(jwtPayload.id, body);

        return res.status(201).json({
            status: 'success',
            mesaage: 'Data berhasil disimpan',
            data: body
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: 'fail',
            mesaage: 'Gagal menyimpan data'
        });
    }
}

const updateTodo = async (req, res) => {
    const {params, user: jwtPayload, body} = req;

    if (!jwtPayload || !jwtPayload.id){
        return res.status(400).json({
            status: 'fail',
            message: 'User tidak valid'
        });
    }
    
    if (!params.id) {
        return res.status(400).json({
            status: 'fail',
            message: 'Dibutuhkan id data'
        });
    }

    if (!body.title || !body.description || !body.deadline) {
        return res.status(400).json({
            status: 'fail',
            message: 'Kolom tidak boleh kosong'
        });
    }
    
    try {
        await todoService.updateTodo(params.id, jwtPayload.id, body);
        
        return res.status(200).json({
            status: 'success',
            message: 'Data berhasil diperbarui'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'fail',
            message: 'Gagal memperbarui data'
        });
    }
}

const viewTodo = async (req, res) => {
    const { params, user: jwtPayload } = req;
    
    try {
        const [todo] = await todoService.viewTodo(params.id, jwtPayload.id)

        if (!jwtPayload || !jwtPayload.id){
            return res.status(400).json({
                status: 'fail',
                message: 'User tidak valid'
            });
        }
        
        return res.status(200).json({
            status: 'success',
            message: 'Data berhasil ditampilkan',
            data: todo
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'fail',
            mesaage: 'Gagal menampilkan data'
        })

    }
}

const viewAllTodo = async (req, res) => {
    const { user: jwtPayload } = req;
    try {
        const [todo] = await todoService.viewAllTodo(jwtPayload.id)

        return res.status(200).json({
            status: 'success',
            message: 'Data berhasil ditampilkan',
            data: todo
        })
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            mesaage: 'Gagal menampilkan data'
        })

    }
}

const deleteTodo = async (req, res) => {
    const {params, user: jwtPayload} = req;

    if (!jwtPayload || !jwtPayload.id){
        return res.status(400).json({
            status: 'fail',
            message: 'User tidak valid'
        });
    }
    
    if (!params.id) {
        return res.status(400).json({
            status: 'fail',
            message: 'Dibutuhkan Id data'
        });
    }
    
    try {
        await todoService.deleteTodo(params.id, jwtPayload.id);
        
        return res.status(200).json({
            status: 'success',
            message: 'Berhasil menghapus data'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: 'Gagal menghapus data'
        });
    }
}

module.exports = {
    createTodo,
    updateTodo,
    viewTodo,
    viewAllTodo,
    deleteTodo
}