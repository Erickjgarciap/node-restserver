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
process.env.CADUCIDAD_TOKEN = '48h';

//=======================
//Semilla de autenticacion
//======================

process.env.SEED = 'secret-desarrollo';

//=======================
//google client id
//======================
process.env.CLIENT_ID = process.env.CLIENT_ID || '609075969847-fk57lrd59oiguagho5ecjfr64cve79gf.apps.googleusercontent.com';