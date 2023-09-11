const router = require('express').Router();
const Prices = require('../models/prices');

router.post('/price', async (req:any, res:any) => {
    try{
        const addPrice = await Prices.create(req.body);
        res.status(200).json(addPrice);
    }catch (err: any){
        res.status(500).json(err.message);
    }
})

router.get('/price', async (req:any, res:any) => {
    try{
        const getPrice = await Prices.find();
        res.status(200).json(getPrice);
    }catch (err: any){
        res.status(500).json(err.message);
    }
})

router.put('/price', async (req:any, res:any) => {
    try{
        const id = req.query.id;    
        const findUpdate = await Prices.findByIdAndUpdate(id, req.body);
        if(!findUpdate){
            return res.status(404).json({message: 'Can not find any Prices by id' + id})
        }
        const findPrice = await Prices.findById(id);
        res.status(200).json(findPrice);
    }catch (err: any){
        res.status(500).json(err.message);
    }
})

module.exports = router;