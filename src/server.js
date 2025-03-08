import express from 'express';
import userRoutes from "./routes/userRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import favoritesRoutes from "./routes/favoriteRoutes.js";
import { errorHandler } from './utils/middlewares/errorHandler.js';

const app = express();

app.use(express.json());

app.use('/users', userRoutes);
app.use('/contacts', contactRoutes);
app.use('/favorites', favoritesRoutes);

app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});
