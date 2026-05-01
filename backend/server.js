import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import generateRoutes from './routes/generate.routes.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/generate', generateRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Daxili server xətası', details: err.message });
});

app.listen(PORT, () => {
  console.log(`Server http://localhost:${PORT} portunda işə düşdü`);
});
