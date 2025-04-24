const  mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/ecommus')
.then(()=>{
    console.log("Eccomus db successfully attached");
    
})
.catch((err)=>{
    console.error(err)
})

module.exports=mongoose.connection;