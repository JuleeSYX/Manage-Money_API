const router = require('express').Router();
const Categories = require('../models/categories');

router.post('/category', async (req:any, res:any) => {
    try{
        const find = await Categories.findOne({name: req.body.name});
        if(find){
           return res.status(400).json('This category name already exists.');
        }
        const addProduct = await Categories.create(req.body);
        res.status(200).json(addProduct);
    }catch (err: any){
        res.status(500).json(err.message);
    }
})

router.get('/category', async (req:any, res:any) => {
    try{
        // const getProduct = await Categories.aggregate([
        //     {
        //         $lookup:{
        //             from:"users",
        //             localField: "user",
        //             foreignField:"_id",
        //             as:"user"
        //         }
        //     }
        // ]);
        // .populate('user')
        const getProduct = await Categories.find().sort({ _id: -1 });
        res.status(200).json(getProduct);
    }catch (err: any){
        res.status(500).json(err.message);
    }
})

router.put('/category', async (req:any, res:any) => {
    try{
        const id = req.query.id;    
        const find = await Categories.findOne({name: req.body.name});
        if(find){
           return res.status(400).json('This category name already exists.');
        }

        const findUpdate = await Categories.findByIdAndUpdate(id, req.body);
        if(!findUpdate){
            return res.status(404).json({message: 'Can not find any Categories by id' + id})
        }
        res.status(200).json("Updated.");
    }catch (err: any){
        res.status(500).json(err.message);
    }
})

module.exports = router;