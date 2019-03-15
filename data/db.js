import mongoose from 'mongoose'

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/clientes', { useNewUrlParser: true })

mongoose.set('setFindAndModify', false)
//definir schema de clientes

const clientesSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  empresa: String,
  emails: Array,
  tipo: String,
  pedidos: Array
})

const Clientes = mongoose.model('clientes', clientesSchema)

// schema de productos
const productosSchema = new mongoose.Schema({
  nombre: String,
  precio: Number,
  stock: Number
})

const Productos = new mongoose.model('productos', productosSchema)

export { Clientes, Productos }
