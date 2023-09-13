const router = require('express').Router();
const Roles = require('../models/roles');

router.post('/role', async (req:any, res:any) => {
    try{
        const addRoles = await Roles.create(req.body);
        res.status(200).json(addRoles);
    }catch (err: any){
        res.status(500).json(err.message);
    }
})

router.get('/role', async (req:any, res:any) => {
    try{
        const getRoles = await Roles.find();
        res.status(200).json(getRoles);
    }catch (err: any){
        res.status(500).json(err.message);
    }
})

router.put('/role', async (req:any, res:any) => {
    try{
        const id = req.query.id;    
        console.log('ssssssssssssss: ', req.body.id);
        
        const findUpdate = await Roles.findByIdAndUpdate(req.body.id, req.body);
        if(!findUpdate){
            return res.status(404).json({message: 'Can not find any Roles by id' + req.body.id})
        }
        const findRoles = await Roles.findById(req.body.id);
        res.status(200).json(findRoles);
    }catch (err: any){
        res.status(500).json(err.message);
    }
})

module.exports = router;