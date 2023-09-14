const router = require('express').Router();
const Prices = require('../models/prices');

router.post('/price', async (req:any, res:any) => {
    try{
        const find = await Prices.findOne({amount: req.body.amount});
        if(find){
            return res.status(400).json('This Amount already exists.');
        }
        const addPrice = await Prices.create(req.body);
        res.status(200).json(addPrice);
    }catch (err: any){
        res.status(500).json(err.message);
    }
})

router.get('/price', async (req:any, res:any) => {
    try{
        const getPrice = await Prices.find().sort({ _id: -1 });
        res.status(200).json(getPrice);
    }catch (err: any){
        res.status(500).json(err.message);
    }
})

router.put('/price', async (req:any, res:any) => {
    try{
        const id = req.query.id;  
        const find = await Prices.findOne({amount: req.body.amount});
        if(find){
            return res.status(400).json('This Amount already exists.');
        }  
        const findUpdate = await Prices.findByIdAndUpdate(id, req.body);
        if(!findUpdate){
            return res.status(404).json({message: 'Can not find any Prices by id' + id})
        }
        res.status(200).json("Updated.");
    }catch (err: any){
        res.status(500).json(err.message);
    }
})

module.exports = router;