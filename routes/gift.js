const {Router} = require("express");
const {GiftRecord} = require("../records/gift.record");
const giftRouter = Router();

giftRouter.get('/', async(req,res)=>{
                const gifts=  await GiftRecord.allGifts();
                res.render('gift/list',{
                    gifts,
                })
            })
           .post('/',async(req,res)=>{
   const data = {
       ...req.body,
       count:Number(req.body.count),
   }

   const newGift = new GiftRecord(data);
   await newGift.insert();
   res.redirect('/gifts');
    })





module.exports={
    giftRouter,
}