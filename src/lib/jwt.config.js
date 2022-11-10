const jwt = require('jsonwebtoken');

const getToken = (payLoad) => {
    return jwt.sign({
        data:payLoad
    },   'SECRET', { expiresIn: '1h '});   
}

const getTokenData = (token) => {
    let data = null;
    jht.verify(token, 'SECRET', (err, decoded) => {
        if(err) {
            console.log('Error al obtener data del token');
        } else{
            data = decoded;
        }
    });
    
    return data; 
}

module.exports = { getToken, getTokenData }