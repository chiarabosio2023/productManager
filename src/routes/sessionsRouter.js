const UserManager = require('../dao/userManager')
const userModel = require('../dao/models/usersModel')

const Router = require('express').Router
const router = Router()

const um = new UserManager()

router.post('/register', async (req, res) => {
    const {
        username,
        email,
        password,
        role
    } = req.body

    try {
        if(!username || !email || !password || !role){
            res.status(400).json({ error: 'Completar todos los campos' });
        }

        if(await um.getUserByFilter({email})){
            res.status(400).json({ error: 'Email existente!!' });
        }

        const user = await um.addUser(username, email, password, role)
        req.session.user = user
        
        res.status(201).json(user)
    } catch (error) {
    }
})

module.exports = router