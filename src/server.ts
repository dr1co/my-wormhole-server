import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import fstatic from '@fastify/static'
import dotenv from 'dotenv'
import { memoriesRoutes } from './routes/memories'
import { authRoutes } from './routes/auth'
import { uploadRoutes } from './routes/upload'
import { resolve } from 'path'

dotenv.config()
const app = fastify()

app.register(multipart)

app.register(fstatic, {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads',
})

app.register(cors, {
  origin: true,
})

app.register(jwt, {
  secret: 'my_wormhole_aloihn.aWEFS<luiawesky,fuaksweduhgjfy',
})

app.register(authRoutes)
app.register(memoriesRoutes)
app.register(uploadRoutes)

app
  .listen({
    port: 3333,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('HTTP server running @ http://localhost:3333')
  })
