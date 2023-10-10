var jwt = require('jsonwebtoken');
require('dotenv').config()


const CreatJWT = (payload)=>{
    const key =  process.env.JWT_SECRET
    let token = jwt.sign(payload, key);

    console.log({token})
    return token

}

const veryfiToken = (token) =>{
    const key =  process.env.JWT_SECRET
    jwt.verify(token, key, function(err, decoded) {
        if(err)return null
        console.log(decoded) // bar

        return decoded
      });
}
module.exports = {
 CreatJWT,veryfiToken
  };
