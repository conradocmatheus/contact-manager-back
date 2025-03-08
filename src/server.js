import express from 'express';
import userRoutes from "./routes/userRoutes.js";
import { errorHandler } from './utils/middlewares/errorHandler.js';

const app = express();

app.use(express.json());

app.use('/users', userRoutes);

app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});
