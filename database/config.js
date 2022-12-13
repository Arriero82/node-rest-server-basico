const mongoose = require('mongoose')

const DBconnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_ATLAS, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })  
        console.log('DB online');
    } catch (error) {    
        console.error(error)
        throw new Error('Error al iniciar la base de datos')
    }
}

module.exports = {
    DBconnection    
}