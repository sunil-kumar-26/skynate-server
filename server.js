require('dotenv').config();
const app=require('./src/app');
const connectDB=require('./src/config/connectDB');

const PORT=4000;
(async ()=>{
    try{
    await connectDB(process.env.MONGODB_URL);
    app.listen(PORT,()=>{
        console.log(`server is runing on http://localhost:${PORT}`)
    })}
    catch(err){
        console.log('Server crasehd Please see ERROR',err);
        console.error('Error',err);
    }
})();
