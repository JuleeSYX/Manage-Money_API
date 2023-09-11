
const router = require('express').Router();
const Inovices = require('../models/invoices');

router.post('/invoice', async (req:any, res:any) => {
    try{
        const addInovices = await Inovices.create(req.body);
        res.status(200).json(addInovices);
    }catch (err: any){
        res.status(500).json(err.message);
    }
})

router.get('/invoice', async (req:any, res:any) => {
    try{

        const getInovices = await Inovices.aggregate([
            { $lookup:{
                from:"categories",
                localField: "cate_id",
                foreignField:"_id",
                as:"category",
                pipeline:[{
                    $project:{
                        name:1, description: 1, image: 1
                    }
                }]
            }},
            { $lookup:{
                from:"stores",
                localField: "store_id",
                foreignField:"_id",
                as:"store",
                pipeline:[{
                    $project:{
                        name:1, 
                    }
                }]
            }},
            { $lookup:{
                from:"users",
                localField: "user_id",
                foreignField:"_id",
                as:"user",
                pipeline:[{
                    $project:{
                        fullname:1, 
                    }
                }]
            }},
            { $project:{
                type: 1,
                price: 1,
                category:{ $arrayElemAt: [ "$category", 0 ] },
                store:{ $arrayElemAt: [ "$store", 0 ] },
                user:{ $arrayElemAt: [ "$user", 0 ] }
            }}
        ])
        res.status(200).json(getInovices);
    }catch (err: any){
        res.status(500).json(err.message);
    }
})

router.put('/invoice', async (req:any, res:any) => {
    try{
        const id = req.query.id;    
        const findUpdate = await Inovices.findByIdAndUpdate(id, req.body);
        if(!findUpdate){
            return res.status(404).json({message: 'Can not find any Inovices by id' + id})
        }
        const findInovices = await Inovices.findById(id);
        res.status(200).json(findInovices);
    }catch (err: any){
        res.status(500).json(err.message);
    }
})

module.exports = router;