import mongoose from 'mongoose'
import { Clientes, Productos } from './db'
import { rejects } from 'assert'

export const resolvers = {
  Query: {
    getClientes: (root, { limit, offset }) => {
      return Clientes.find({})
        .limit(limit)
        .skip(offset)
    },
    getCliente: (root, { id }) => {
      return new Promise((resolve, object) => {
        Clientes.findById(id, (error, cliente) => {
          if (error) rejects(error)
          else resolve(cliente)
        })
      })
    },
    totalClientes: root => {
      return new Promise((resolve, object) => {
        Clientes.countDocuments({}, (error, count) => {
          if (error) rejects(error)
          else resolve(count)
        })
      })
    },
    getProducts: (root, { limit, offset }) => {
      return Productos.find({})
        .limit(limit)
        .skip(offset)
    },
    getProduct: (root, { id }) => {
      return new Promise((resolve, object) => {
        Productos.findById(id, (error, producto) => {
          if (error) rejects(error)
          else resolve(producto)
        })
      })
    }
  },
  Mutation: {
    crearCliente: (root, { input }) => {
      const nuevoCliente = new Clientes({
        nombre: input.nombre,
        apellido: input.apellido,
        empresa: input.empresa,
        emails: input.emails,
        tipo: input.tipo,
        pedidos: input.pedidos
      })
      nuevoCliente.id = nuevoCliente._id
      return new Promise((resolve, object) => {
        nuevoCliente.save(error => {
          if (error) rejects(error)
          else resolve(nuevoCliente)
        })
      })
    },
    actualizarCliente: (root, { input }) => {
      return new Promise((resolve, object) => {
        Clientes.findOneAndUpdate(
          { _id: input.id },
          input,
          { new: true },
          (error, cliente) => {
            if (error) rejects(error)
            else resolve(cliente)
          }
        )
      })
    },
    eliminarCliente: (root, { id }) => {
      return new Promise((resolve, object) => {
        Clientes.findOneAndDelete({ _id: id }, error => {
          if (error) rejects(error)
          else resolve('Se elimino Correctamente')
        })
      })
    },
    newProduct: (root, { input }) => {
      const nuevoProducto = new Productos({
        nombre: input.nombre,
        precio: input.precio,
        stock: input.stock
      })
      nuevoProducto.id = nuevoProducto._id

      return new Promise((resolve, object) => {
        nuevoProducto.save(error => {
          if (error) rejects(error)
          else resolve(nuevoProducto)
        })
      })
    },
    updateProduct: (root, { input }) => {
      return new Promise((resolve, object) => {
        Productos.findOneAndUpdate(
          { _id: input.id },
          input,
          { new: true },
          (error, producto) => {
            if (error) rejects(error)
            else resolve(producto)
          }
        )
      })
    },
    deleteProduct: (root, { id }) => {
      return new Promise((resolve, object) => {
        Productos.findOneAndDelete({ _id: id }, error => {
          if (error) rejects(error)
          else resolve('Se elimino Correctamente')
        })
      })
    }
  }
}
