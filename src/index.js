import express from 'express';
import 'dotenv/config.js';
import dbConfig from './config/dbConfig.js';
import routes from './routes/index.js';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/auth', routes.authRoutes);

app.listen(process.env.PORT, () => {
  dbConfig.authenticate();
  // dbConfig.sync({ force: true });
  console.log(`Server is running on port ${ process.env.PORT }`);
});
