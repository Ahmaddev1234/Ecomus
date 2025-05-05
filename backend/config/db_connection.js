const  mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/ecommus')
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Connection error:', err));


module.exports=mongoose.connection;