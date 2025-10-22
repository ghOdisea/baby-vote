import express from 'express'
import { GetVotesHandler, PostVotesHandler } from '../controllers/api.controller'

const ApiRoutes = express.Router()

//GET
ApiRoutes.get('/votes', GetVotesHandler)
ApiRoutes.post('/votes', PostVotesHandler)

// ApiRoutes.get('/stats', GetHandler)


export default ApiRoutes


// POST /api/votes — Crea un voto.
// Body: { name: string, countryCode: string, optionId: string }
// Respuesta: { id, name, countryCode, optionId, createdAt }

// GET /api/votes — (opcional para la vista de “quién votó”) Lista de votos.
// Query: ?limit=50&offset=0&optionId=...

// Respuesta: { items: Vote[], total: number }

// GET /api/stats — Agregados para el panel/columnas.
// 
// Respuesta: { totalVotes: number, votesByOption: { optionId: string, count: number }[] }