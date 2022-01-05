const {Router} = require("express");
const {ChildRecord} = require("../records/child.record");
const {GiftRecord} = require("../records/gift.record");
const {ValidationError} = require("../utils/errors");
const childRouter=Router();

childRouter
    .get('/',async(req,res)=>{
        const children=await ChildRecord.listAll();
        const giftList = await GiftRecord.allGifts();

        res.render('children/list',{
       children,
            giftList

        });
    })
    .post('/',async(req,res)=>{
        const data=req.body;
        console.log(data);
        const newChild = new ChildRecord(data);
        await newChild.insert();
        res.redirect('/children');
    })
    .patch('/gift/:childId',async(req,res)=>{
        const {childId}=req.params;
        const child =await  ChildRecord.findOne(childId);
        if(child === null){
            throw new ValidationError('Nie znaleziono dziecka')
        }
       const gift = req.body.giftId === '' ? null : await GiftRecord.findOne(req.body.giftId)
        console.log(await gift.countGivenGifts());
       if(gift){
          if(gift.count<= await gift.countGivenGifts()){
              throw new ValidationError('Tego prezentu jest malo ')
          };
       }




       child.giftId = gift === null ? null : gift.id;
      await  child.update();

      res.redirect('/children');
})



module.exports={
    childRouter,
}

