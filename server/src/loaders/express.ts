import express, { type Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';

import routes from 'api'

export default (app: Express) => {
    const corsOptions = {
        origin: 'http://wslib-client.vercel.app',
        credentials: true
    }
    
    app.use(cors());
    app.use(express.json());
    app.use(helmet());
    app.use('/api', routes);
}