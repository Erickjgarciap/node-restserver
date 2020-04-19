//=======================
//puerto
//======================

process.env.PORT = process.env.PORT || 3000;

//=======================
//entorno
//======================


process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//=======================
//base de datos
//======================

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe'

} else {
    urlDB = 'mongodb+srv://ericko123:jHKpbPPmglMtZmSH@cluster0-vofpq.mongodb.net/cafe?retryWrites=true&w=majority'
}

process.env.URLDB = urlDB;

//=======================
//Vencimiento del token
//60 segundos
//60 minutos
//24 horas
//30 dias
//======================
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

//=======================
//Semilla de autenticacion
//======================

process.env.SEED = 'secret-desarrollo';