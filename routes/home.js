const {Router} = require("express");
const homeRouter=Router();

homeRouter
    .get('/',(req,res)=>{
        res.redirect('/children');
    })

module.exports={
    homeRouter,
}