import express from "express";
import mongoose from "mongoose";

import Cards from "./dbCards.js"
import Cors from "cors"
const dataBaseURL="mongodb+srv://admin:MdC5LwLQWkokL8v1@cluster0.fle0w.mongodb.net/DataUser?retryWrites=true&w=majority";

//App Config
const app=express();
const port=process.env.PORT || 8001;
//MiddleWare
app.use(express.json());
app.use(Cors())

//Db config
mongoose.connect(dataBaseURL,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
})
//Api End points
app.get("/",(req,res)=>{
    res.status(200).send("Hello Cleaver Programmers");
});
app.get("/keeper/data",(req,res)=>{
    Cards.find(req.body,(err,data)=>{
        if(err){
            console.log("error in posting data");
        }else{
            res.status(200).send(data);
        }
    })
});
app.post("/keeper/data",(req,res)=>{

const dbcard=req.data;
    const cardsss=req.body;
    console.log(cardsss);
    Cards.create(cardsss,(err,data)=>{
        if(err){
            console.log(err);
            res.status(500).send(err);
        }else{
            console.log("done");
            res.status(200).send("done");
        }
    })
})

app.post("/keeper/delete",(req,res)=>{

    const dbcard=req.data;
        const cardsss=req.body;
        console.log(cardsss);
        Cards.deleteOne(cardsss,(err)=>{
            if(err){
                console.log(err);
                res.send("Error in deleting"+err);
            }else{
                res.status(200).send("deleted")
            }
        })
    })

//listner
app.listen(port,()=>{
    console.log("running on port"+port);
})