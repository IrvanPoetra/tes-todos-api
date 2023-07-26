const userService = require('../services/user.service')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    const { body } = req;

    if ( !body.username || !body.email || !body.password ) {
        return res.status(400).json({
            status: 'fail',
            message: 'Data tidak sesuai'
        });
    }

    try {
        const user = await userService.getUserByEmail(body.email);
        console.log(user)

        if(user[0][0]) {
            return res.status(409).json({
                status: 'fail',
                message: 'Email sudah terdaftar'
            })
        }

        await userService.register(body);

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

const login = async (req, res) => {
    const { body } = req;

    if ( !body.email || !body.password ) {
        return res.status(400).json({
            status: 'fail',
            message: 'Email dan password tidak boleh kosong!'
        });
    }

    try {
        const user = await userService.login(body)

        if (!user) {
            return res.status(400).json({
                status: 'fail',
                message: 'email dan password salah'
            })
        }

        const dataUser = user [0][0];

        const jwtToken = jwt.sign(
            {id: dataUser.id, email: dataUser.email},
            process.env.JWT_SECRET
        )

        return res.status(200).json({
            status: 'success',
            mesaage: 'Login berhasil',
            token: jwtToken,
            data: dataUser
        });
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: 'Login gagal'
        })
    }
}

const update = async (req, res) => {
    const id = req.user[0][0].id;
    const { body } = req;

    if ( !body.username || !body.email || !body.password ) {
        return res.status(400).json({
            status: 'fail',
            message: 'Data tidak sesuai'
        });
    }

    try {
        await userService.update(id, body);

        return res.status(200).json({
            status: 'success',
            message: 'Data berhasil diperbarui'
        })
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: 'Gagal memperbarui data'
        })
    }

}

const viewUser = async (req, res) => {
    try {
        const [user] = await userService.viewUser()

        return res.status(200).json({
            status: 'success',
            message: 'Data berhasil ditampilkan',
            data: user
        })
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            mesaage: 'Gagal menampilkan data'
        })

    }
}

const deleteUser = async (req, res) => {
    const id = req.user[0][0].id

    try {
        await userService.deleteUser(id)

        return res.status(200).json({
            status: 'succes',
            message: 'User berhasil dihapus'
        })
    } catch(error) {
        console.log(error)
        return res.status(500).json({
            status: 'fail',
            message: 'Gagal menghapus User'
        })
    }
}

module.exports = {
    register,
    login,
    update,
    viewUser,
    deleteUser
}