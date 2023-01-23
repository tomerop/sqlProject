const jwt= require('jsonwebtoken')
function generateJWT( name , user_id) {
    const token = jwt.sign({  name :name, user_id:user_id},'AmiTomer')
    return token
}

module.exports.generateJWT = generateJWT