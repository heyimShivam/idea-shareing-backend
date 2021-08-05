import mongoose from "mongoose";
const cardSchema=new mongoose.Schema({
    title:String,
    content:String,  
});
export default mongoose.model("keeperdata",cardSchema);