import express from 'express';
import { GetVotesHandler, PostVotesHandler, StatsHandler } from '../controllers/api.controller';
import rateLimit from 'express-rate-limit';
import crypto from 'crypto';


const voteLimiter = rateLimit({
  windowMs: 60_000, // 1 minuto
  limit: 30,        // máx 30 votos/minuto por IP
});

const recent = new Map<string, number>();

// export function antiDoubleClick(windowMs = 3000) {
//   return (req, res, next) => {
//     const key = req.ip + ':' + crypto.createHash('sha256')
//       .update(JSON.stringify(req.body))
//       .digest('hex');
//     const now = Date.now();
//     if (now - (recent.get(key) ?? 0) < windowMs) {
//       return res.status(429).json({ message: 'Duplicate vote detected' });
//     }
//     recent.set(key, now);
//     next();
//   };
// }


const ApiRoutes = express.Router();

ApiRoutes.get('/votes', GetVotesHandler);
ApiRoutes.post('/votes', voteLimiter , PostVotesHandler);
ApiRoutes.get('/stats', StatsHandler);

export default ApiRoutes;
