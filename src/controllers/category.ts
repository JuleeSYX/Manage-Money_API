const router = require('express').Router();
const Category = require('../models/category');
const User = require('../models/user');

router.post('/category', async (req:any, res:any) => {
    const {name, price} = req.body;
    const findUser = await User.findOne({username: 'tshiab'})
    const addProduct = await Category.create({name: name, price: price, user: findUser._id});
    res.status(200).json(addProduct);
})
router.get('/category', async (req:any, res:any) => {
    const getProduct = await Category.aggregate([
        {
            $lookup:{
                from:"users",
                localField: "user",
                foreignField:"_id",
                as:"user"
            }
        }
    ]);
    // .populate('user')
    res.status(200).json(getProduct);
})

module.exports = router;