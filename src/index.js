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
app.use('/tag', routes.tagsRoutes);
app.use('/confession', routes.confessionRoutes);
app.use('/confession-vote', routes.confessionVoteRoutes);
app.use('/comment', routes.commentRoutes);

app.listen(process.env.PORT, () => {
  dbConfig.authenticate();
  dbConfig.sync();
  console.log(`Server is running on port ${ process.env.PORT }`);
});
