import jwt from 'jsonwebtoken';

function authenticate(req,res,next){

    const autheader=req.headers.autherization;

    if(autheader){
        const token=autheader.split(" ")[1];
        if(token!=undefined)
        {
            const verify=jwt.verify(token,"summerofcode",(err,user)=>{
                if(err)
                res.status(401).send("autherization failed")
                else
                {
                    req.user=user;
                    next();
                }
            })
        }
        else
        {
            res.status(401).send('token not present')
        }

    }
    else{
        res.status(401).send("unautherized access")
    }

}

export default authenticate