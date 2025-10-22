import express from 'express'
import { GetVotesHandler, PostVotesHandler } from '../controllers/api.controller'

const ApiRoutes = express.Router()

//GET
ApiRoutes.get('/votes', GetVotesHandler)
ApiRoutes.post('/votes', PostVotesHandler)

// ApiRoutes.get('/stats', GetHandler)
// ApiRoutes.get('/options', GetHandler)

//POST

//Admin: PATCH and DELETE
// ApiRoutes.delete('/votes/:id', DeleteHandler)
// ApiRoutes.patch('/options/:id', PatchHandler)
// ApiRoutes.post('/options', PostHandler)



export default ApiRoutes


// GET /api/health — (ya la tienes)

// GET /api/options — Devuelve las opciones activas para votar (1,2,3 pero personalizables).

// POST /api/votes — Crea un voto.
// Body: { name: string, countryCode: string, optionId: string }
// Respuesta: { id, name, countryCode, optionId, createdAt }

// GET /api/votes — (opcional para la vista de “quién votó”) Lista de votos.
// Query: ?limit=50&offset=0&optionId=...

// Respuesta: { items: Vote[], total: number }

// GET /api/stats — Agregados para el panel/columnas.
// 
// Respuesta:
// {
//   "totals": [
//     { "optionId": "opt_1", "label": "Opción 1", "count": 23 },
//     { "optionId": "opt_2", "label": "Opción 2", "count": 15 },
//     { "optionId": "opt_3", "label": "Opción 3", "count": 9 }
//   ],
//   "byOption": {
//     "opt_1": [{ "name": "Ana", "countryCode": "ES", "flag": "🇪🇸" }, ...],
//     "opt_2": [...],
//     "opt_3": [...]
//   }
// }
