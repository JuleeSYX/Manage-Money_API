const router = require('express').Router();
const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
const Users = require('../models/users');

router.post('/login', async (req:any, res:any) => {
    try{
        const {username, password} = req.body;
        
        if(!(username && password)){
            return res.status(400).send("All input is required.");
        }
        let findUser = await Users.findOne({username: username, password: password});
        if(findUser){
            const token = await jwt.sign(
                {userId: findUser.id, username, storeId: findUser.store_id},
                process.env.TOKEN_KEY,
                {
                    expiresIn:"1h"
                }
            )
            res.cookie("userId", findUser.id)
            res.cookie("auth-token", token);
            
            return res.status(200).json("Login successfully.");
        }
        res.status(400).send("The username or password is incorrect.");
    }catch (err:any){
        res.status(500).json(err.message);
    }
})

module.exports = router;