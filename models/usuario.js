const {Schema, model} = require('mongoose')

const UsuariosSchema = Schema({
    nombre: {
        type: String,
        required:[true, 'el nombre es obligatorio']
    },
    correo: {
        type: String,
        required:[true, 'el correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required:[true, 'la contraseña es obligatoria']
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        default: 'USER_ROLE',
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
})

UsuariosSchema.methods.toJSON = function(){
    const {__v, password, _id, ...user} = this.toObject()
    user.uid = _id
    return user
}

module.exports = model('Usuarios', UsuariosSchema)