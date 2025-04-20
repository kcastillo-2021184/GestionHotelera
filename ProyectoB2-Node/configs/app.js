import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import multer from 'multer';
import authRoutes from '../src/auth/auth.routes.js';
import userRoutes from '../src/user/user.routes.js'
import { limiter } from '../middlewares/rate.limit.js';
import {initializeAdmin} from '../src/user/user.controller.js'

const upload = multer();

const configs = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true })); 
    app.use(upload.none()); 
    app.use(cors());
    app.use(helmet());
    app.use(limiter);
    app.use(morgan('dev'));
};

const routes = (app) => {
    app.use(authRoutes)
    app.use('/v1/user', userRoutes)

};

export const initServer = async () => {
    const app = express();
    try {
        configs(app);
        routes(app);
        app.listen(process.env.PORT);
        console.log(`Server running on port ${process.env.PORT}`);
    } catch (err) {
        console.error('Server init failed', err);
    }
};

initializeAdmin()

