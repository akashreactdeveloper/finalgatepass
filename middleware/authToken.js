const jwt = require('jsonwebtoken');
const express = require('express')
const cookieParser = require('cookie-parser');
const app = express()
app.use(cookieParser());

async function authToken(req,res,next){
    try{
        const token = req.cookies?.token

        console.log("cookies wala token",token)

        if(!token){
            return res.status(200).json({
                message : "Please Login...!",
                error : true,
                success : false
            })
        }

        jwt.verify(token, process.env.TOKEN_SECRET_KEY, function(err, decoded) {
            
            if(err){
                console.log("error auth", err)
            }

            req.userId = decoded?._id

            next()
        });


    }catch(err){
        res.status(400).json({
            message : err.message || err,
            data : [],
            error : true,
            success : false
        })
    }
}


module.exports = authToken