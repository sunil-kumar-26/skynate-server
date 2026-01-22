module.exports=(err,req,res,next)=>{
    console.error('See Error',err);
    const status=err.status||500;
    const mess=err.message||'Internal Server Error';
    const payload={success:false,message:mess||'Internal Server Error'}
if(err) res.status(status).json(payload);

}

