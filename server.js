// Import express
import express  from 'express';
import routes from './routes/index.js'
import errorHandler from './middlewares/errorHandler.js'
const app = express();
app.use(express.json());
app.use('/api',routes);

app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port: http://localhost:${PORT}`);
});
