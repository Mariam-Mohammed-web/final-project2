import express from 'express';
import path from 'path';
import imageRouter from './routes/images';
import uploadRouter from './routes/upload';
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
//app.use(express.static(path.join(__dirname, '../../public')));
app.use('/api/images', imageRouter);
app.use('/api/upload', uploadRouter);
app.use('/images/full', express.static(path.join(__dirname, '../public/images/full')));

app.get(/(.*)/, (req, res) => {
  res.sendFile(path.resolve('public/index.html'));

});
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});
export default app;