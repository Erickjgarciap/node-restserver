//==========================
//verificar token
//==========================
const jwt = require('jsonwebtoken');

let verificaToken = (req, res, next) => {

    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decode) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Token no valido'
                }
            });
        }
        req.usuario = decode.usuario;
        next();

    });
};
//==========================
//verificar role de usuario
//==========================
let verificaAdmin_Role = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.role !== 'ADMIN_ROLE') {

        return res.status(400).json({
            ok: false,
            err: {
                message: 'No tienes permisos para ejecutar este servicio'
            }
        });
    }
    next();
};




module.exports = {
    verificaToken,
    verificaAdmin_Role
}