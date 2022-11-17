const User = require('../models/users.model');
const { v4: uuidv4 } = require('uuid');
const { getToken, getTokenData } = require('../lib/jwt.config');
const { getTemplate, sendEmail } = require('../lib/mail.congif');



const signUp = async (req, res) => {
    try {

        // Get user data: name, email
        const { name, email } = req.body;
        // Verify that the user doesn´t exist
        let user = await User.findOne({ email }) || null;
        if(user !== null) {
            return res.json({
                success: false,
                msg: 'Usuario ya existe'
            });
        }
        // Generate the code
        const code = uuidv4();
        // Create a new user
        user = new User({ name, email, code });
        // Generate token
        const token = getToken({ email, code });
        // Get a template
        const template = getTemplate( name, token);
        // Send the email
        await sendEmail(email, 'Este es un email de prueba', template);
        await user.save();
        res.json({
            success: true,
            msg: 'Registrado correctamente'
        });

    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            msg: 'Error al registrar usuario'
        });
    }
}

const confirm = async (req, res) => {
    try {

       // Get token
       const { token } = req.params; 
       // Check the data
       const data = await getTokenData(token);
       if(data === null) {
            return res.json({
                success: false,
                msg: 'Error al obtener data'
            });
       }

       console.log(data);

       const { email, code } = data.data;
       // Verify user existence
       const user = await User.findOne({ email }) || null;

       if(user === null) {
            return res.json({
                success: false,
                msg: 'Usuario no existe'
            });
       }

       // Verificar el código
       if(code !== user.code) {
            return res.redirect('/error.html');
       }

       // Actualizar usuario
       user.status = 'VERIFIED';
       await user.save();

       // Redireccionar a la confirmación
       return res.redirect('/confirm.html');
        
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            msg: 'Error al confirmar usuario'
        });
    }
}


module.exports = {
    signUp,
    confirm
}