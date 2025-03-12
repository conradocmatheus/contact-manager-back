import express from 'express';
import cors from 'cors';
import userRoutes from "./routes/userRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import { errorHandler } from './utils/middlewares/errorHandler.js';
import authRoutes from "./routes/authRoutes.js";
import axios from "axios";

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);
app.use('/contacts', contactRoutes);
app.use('/auth', authRoutes);

app.use(errorHandler);

const port = process.env.PORT || 3000;

app.get('/validate-phone', async (req, res) => {
    const { number } = req.query;

    try {
        const response = await axios.get(process.env.NUMVERIFY_API_URL, {
            params: {
                access_key: process.env.NUMVERIFY_API_KEY,
                number: number,
            },
        });
        res.json(response.data);
    } catch (error) {
        console.error('Erro ao validar o número:', error);
        res.status(500).send('Erro ao validar o número');
    }
});

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});
