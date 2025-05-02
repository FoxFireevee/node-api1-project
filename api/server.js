// BUILD YOUR SERVER HERE
// Imports
const express = require('express')
const Model = require('./users/model')

// Instance of Express
const server = express()

// Global Middlware
server.use(express.json())

// ENDPOINTS
// Endpoint: Find
server.get('/api/users', async (req, res) => {
    try {
        const users = await Model.find()
        res.status(200).json(users)
    } catch(err) {
        res.status(500).json({ 
            message: `Error Fetching Users: ${err.message}`
        })
    }
})

// Endpoint: Find By ID
server.get('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params
        const user = await Model.findById(id)
        if(!user) {
            res.status(404).json({
                message: 'does not exist'
            })
        } else {
            res.status(200).json(user)
        }
    } catch(err) {
        res.status(500).json({
            message: `Error Fetching User: ${err.message}`
        })
    }
})

// Endpoint: Insert
server.post('/api/users', async (req, res) => {
    try {
        const { name, bio } = req.body
        if(!name || !bio) {
            res.status(400).json({
                message: `provide name and bio`
            })
        } else {
            const createdUser = await Model.insert({name, bio})
            res.status(201).json(createdUser)
        }
    } catch(err) {
        res.status(500).json({
            message: `Could Not Post New User: ${err.message}`
        })
    }
})

// Endpoint: Update
server.put('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { name, bio } = req.body
        if(!name || !bio) {
            res.status(400).json({
                message: 'provide name and bio'
            })
        } else {
            const updatedUser = await Model.update(id, {name, bio})
            if(!updatedUser) {
                res.status(404).json({
                    message: 'This user does not exist'
                })
            } else {
                res.status(200).json(updatedUser)
            }
            
        }
    } catch(err) {
        res.status(500).json({
            message: `Updating the user went wrong: ${err.message}`
        })
    }
})

// Endpoint: Remove
server.delete('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params
        const deletedUser = await Model.remove(id)
        if(!deletedUser) {
            res.status(404).json({
                message: 'does not exist'
            })
        } else {
            res.status(200).json(deletedUser)
        }
    } catch(err) {
        res.status(500).json({
            message: `Something went wrong when deleting the user: ${err.message}`
        })
    }
})

// Endpoint: Reset Data Base


// Exposing The Server
module.exports = server; // EXPORT YOUR SERVER instead of {}
