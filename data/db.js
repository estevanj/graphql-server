import mongoose from 'mongoose'

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/clientes', { useNewUrlParser: true })

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

export { Clientes }
