import express from 'express';
import cors from 'cors';
import path from 'path';
import http from 'http';

const app = express();
const server = http.Server(app);

const corsOptions = {
  origin: 'http://localhost:8080',
  credentials: true,
};

app.use(cors(corsOptions));

// serve static assets normally
app.use(express.static(path.resolve(__dirname, '../../dist')));

// Handles all routes so you do not get a not found error
export function allRoutes(request, response) {
  response.sendFile(path.resolve(__dirname, '../../dist', 'index.html'));
}
app.get('*', allRoutes);

export default server;
