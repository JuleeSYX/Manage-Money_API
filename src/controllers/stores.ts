const router = require('express').Router();
const Stores = require('../models/stores');

router.post('/store', async (req:any, res:any) => {
    try{
        const addStores = await Stores.create(req.body);
        res.status(200).json(addStores);
    }catch (err: any){
        res.status(500).json(err.message);
    }
})

router.get('/store', async (req:any, res:any) => {
    try{
        const getStores = await Stores.find();
        res.status(200).json(getStores);
    }catch (err: any){
        res.status(500).json(err.message);
    }
})

router.put('/store', async (req:any, res:any) => {
    try{
        const id = req.query.id;    
        const findUpdate = await Stores.findByIdAndUpdate(id, req.body);
        if(!findUpdate){
            return res.status(404).json({message: 'Can not find any Stores by id' + id})
        }
        const findStores = await Stores.findById(id);
        res.status(200).json(findStores);
    }catch (err: any){
        res.status(500).json(err.message);
    }
})

module.exports = router;