
import mongoose from "mongoose";
const router = require('express').Router();
const User = require('../models/users');

router.post('/user', async (req:any, res:any) => {
    try{
        const addUser = await User.create(req.body);
        res.status(200).json(addUser);
    }catch (err: any){
        res.status(500).json(err.message);
    }
})

router.get('/user', async (req:any, res:any) => {
    try{
        const getUser = await User.aggregate([
            {
                $lookup:{
                    from:"stores",
                    localField: "store_id",
                    foreignField:"_id",
                    as:"store",
                    pipeline:[{
                        $project:{
                            name:1, 
                        }
                    }]
                }
            },
            {
                $lookup:{
                    from:"roles",
                    localField: "role_id",
                    foreignField:"_id",
                    as:"role",
                    pipeline:[{
                        $project:{
                            name:1, 
                        }
                    }]
                }
            },
            {
                $project:{
                    username: 1,
                    fullname: 1,
                    store:{ $arrayElemAt: [ "$store", 0 ] },
                    role:{ $arrayElemAt: [ "$role", 0 ] }
                }
            }
        ])
        res.status(200).json(getUser);
    }catch (err: any){
        res.status(500).json(err.message);
    }
})

router.put('/user', async (req:any, res:any) => {
    try{
        const id = req.query.id;    
        const findUpdate = await User.findByIdAndUpdate(id, req.body);
        if(!findUpdate){
            return res.status(404).json({message: 'Can not find any User by id' + id})
        }
        const findUser = await User.findById(id);
        res.status(200).json(findUser);
    }catch (err: any){
        res.status(500).json(err.message);
    }
})

// router.post('/user', async(req:any, res:any) => {
//     const addUser = await User.create(req.body);
//     res.status(200).json(addUser);
// })
// router.get('/user', async(req:any, res:any) => {
//     const findUser = await User.aggregate([
//         {
//             $lookup:{
//                 from:"categories",
//                 localField: "_id",
//                 foreignField:"user",
//                 as:"categories",
//                 // pipeline:[
//                 //     {
//                 //         $match:{name: "Dokchampa"}
//                 //     }
//                 // ]
//                 // pipeline:[
//                 //     {
//                 //         $project:{
//                 //             name:1, price:1
//                 //         }
//                 //     }
//                 // ]
//             }
//         },
//         {
//             $project:{
//                 username: 1, email:1, password: 1, "categories":{ "$arrayElemAt": [ "$categories", 0 ] }
//             }
//         }
//     ])
//     res.status(200).json(findUser);
// })
// router.get('/user/:id', async(req:any, res:any) => {
//     const {id} = req.params;
//     const findOneUser = await User.findById(id);
//     res.status(200).json(findOneUser);
// })
// router.put('/user/:id', async(req:any, res:any) => {
//     const {id} = req.params;
//     console.log(req.body);
    
//     const findUpdate = await User.findByIdAndUpdate(id, req.body);
//     if(!findUpdate){
//         return res.status(404).json({message: 'Can not find any user by id' + id})
//     }
//     const findUser = await User.findById(id);
//     res.status(200).json(findUser);
// })
// router.delete('/user/:id', async(req:any, res:any) => {
//     const {id} = req.params;    
//     const findDelete = await User.findByIdAndDelete(id);
//     if(!findDelete){
//         return res.status(404).json({message: 'Can not delete any user by id' + id})
//     }
//     res.status(200).json(findDelete);
// })

module.exports = router;