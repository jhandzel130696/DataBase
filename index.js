const cookieParser=require('cookie-parser');
require('./utils/db');
const express=require('express');
require('express-async-errors');
const hbs=require('express-handlebars');
const {homeRouter} = require("./routes/home");
const {childRouter} = require("./routes/children")
const methodOverride = require("method-override");
const {urlencoded} = require("express");
const {handleError} = require("./utils/errors");
const {giftRouter} = require("./routes/gift");
const {handlebarsHelpers} = require("./utils/handlebarsHelpers");
const app=express();
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(express.urlencoded({
    extended:true,
}))
app.use(express.json());
app.use(express.static('public'));
app.engine('.hbs',hbs({extname:'.hbs',
    helpers:handlebarsHelpers,
    }));
app.set('view engine','.hbs');




app.use('/',homeRouter)
app.use('/children',childRouter);
app.use('/gifts',giftRouter);



app.use(handleError);

app.listen(3000, '0.0.0.0');