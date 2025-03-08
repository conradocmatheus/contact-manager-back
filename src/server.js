import express from 'express';
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(express.json());

app.use('/users', userRoutes)

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
