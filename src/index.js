import express from 'express';
import cors from 'cors';
import 'dotenv/config.js';
import dbConfig from './config/dbConfig.js';
import routes from './routes/index.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/auth', routes.authRoutes);
app.use('/tag', routes.tagsRoutes);
app.use('/confession', routes.confessionRoutes);
app.use('/confession-vote', routes.confessionVoteRoutes);
app.use('/comment', routes.commentRoutes);
app.use('/comment-vote', routes.commentVoteRoutes);
app.use('/confession-tag', routes.confessionTagRoutes);
app.use('/notification', routes.notificationRoutes);
app.use('/view', routes.viewRoutes);
app.use('/reporting', routes.reportingRoutes);
app.use('/analytics', routes.analyticsRoutes);
app.use('/recommendation', routes.recommendationRoutes);

app.listen(process.env.PORT, async() => {
  await dbConfig.authenticate();
  await dbConfig.sync();
  console.log(`Server is running on port ${ process.env.PORT }`);
});
