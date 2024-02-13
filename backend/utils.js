import jwt from 'jsonwebtoken'

export const generateToken =({_id,name,email})=>{
    return jwt.sign({_id:_id, name:name, email:email},process.env.JWT_PW,{expiresIn:'7d'})
};

export const isAuth=(req, res, next)=>{

   const auth = req.headers.authorization;

   if (auth){
    console.log(auth)
    // מאיפה הוא מתחיל לקחת את הטוקן - אחרי ה BEARER
        const token = req.headers.authorization.split(" ")[1];
        console.log(token)
        jwt.verify(token, process.env.JWT_PW , (err, decode) => {
            console.log("tttttttttttt")
            if (err){
                res.status(401).send({message: err.message});
            }
            else{
                req.user = decode;
                next();
            }
        }); 
   }
   else {
    res.status(401).send({message:"No Token"});
   }
}