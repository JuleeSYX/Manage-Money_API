
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const Inovices = require('../models/invoices');
const Categories = require('../models/categories');

router.post('/invoice', async (req:any, res:any) => {
    try{
        const {type, price, cateName, token} = req.body;
        // const token = req.cookies['auth-token'];
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        const findCate = await Categories.findOne({name: cateName});
        let mapData = {
            type: type,
            price: price,
            user_id: decoded.userId,
            store_id: decoded.storeId,
            cate_id: '',
        }
        
        if(findCate){
            mapData.cate_id = findCate._id;
        }else{
            const addCate = await Categories.create({name: cateName, description: "", image: "", index: 0});
            mapData.cate_id = addCate._id;
        }
        const addInovices = await Inovices.create(mapData);
        res.status(200).json(addInovices);
    }catch (err: any){
        res.status(500).json(err.message);
    }
})

router.get('/invoice', async (req:any, res:any) => {
    try{
        const {kw, count, skip} = req.query;
        let pipeline:any = [
            // { $match: { price: Number(kw) } },
            { $lookup:{
                from:"categories",
                localField: "cate_id",
                foreignField:"_id",
                as:"category",
                pipeline:[
                    { $project:{name:1, description: 1, image: 1}},
                ]
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
                createdAt: 1,
                category:{ $arrayElemAt: [ "$category", 0 ] },
                store:{ $arrayElemAt: [ "$store", 0 ] },
                user:{ $arrayElemAt: [ "$user", 0 ] }
            }},
            { $sort: { _id : -1 } },
        ];
        if(Number(skip) > 0){
            pipeline.push({ $skip: Number(skip)})
        }
        if(Number(count) > 0){
            pipeline.push({ $limit : Number(count)})
        }
        const getInovices = await Inovices.aggregate(pipeline);
        res.status(200).json(getInovices);
    }catch (err: any){
        res.status(500).json(err.message);
    }
})

router.get('/invoice-today', async (req:any, res:any) => {
    try{
        const {kw, count, skip} = req.query;
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        // const map = {
        //     to: today,
        //     end:tomorrow
        // }
        // return res.status(200).json(map);
        let pipeline:any = [
            // { $match: { price: Number(kw) } },
            { 
                $match:{createdAt: { $gt: today, $lt: tomorrow}}
            },
            { $lookup:{
                from:"categories",
                localField: "cate_id",
                foreignField:"_id",
                as:"category",
                pipeline:[
                    { $project:{name:1, description: 1, image: 1}},
                ]
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
                createdAt: 1,
                category:{ $arrayElemAt: [ "$category", 0 ] },
                store:{ $arrayElemAt: [ "$store", 0 ] },
                user:{ $arrayElemAt: [ "$user", 0 ] }
            }},
            { $sort: { _id : -1 } },
        ];
        if(Number(skip) > 0){
            pipeline.push({ $skip: Number(skip)})
        }
        if(Number(count) > 0){
            pipeline.push({ $limit : Number(count)})
        }
        const getInovices = await Inovices.aggregate(pipeline);
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