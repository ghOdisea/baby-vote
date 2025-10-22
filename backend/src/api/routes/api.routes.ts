import express from 'express';
import { GetVotesHandler, PostVotesHandler, StatsHandler } from '../controllers/api.controller';

const ApiRoutes = express.Router();

ApiRoutes.get('/votes', GetVotesHandler);
ApiRoutes.post('/votes', PostVotesHandler);
ApiRoutes.get('/stats', StatsHandler);

export default ApiRoutes;
