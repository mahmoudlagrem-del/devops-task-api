const express = require("express");
const client = require('prom-client');
const winston = require('winston');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());

// ----------------- Observabilité -----------------
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

// Compteur HTTP Prometheus
const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status']
});

// Logger structuré
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console()
  ]
});

// Middleware pour logs et tracing
app.use((req, res, next) => {
  req.traceId = uuidv4();

  res.on('finish', () => {
    httpRequestCounter.labels(req.method, req.path, res.statusCode).inc();
    logger.info({
      traceId: req.traceId,
      method: req.method,
      path: req.path,
      status: res.statusCode,
      time: new Date().toISOString()
    });
  });

  res.setHeader('X-Trace-ID', req.traceId);
  next();
});

// ----------------- Data -----------------
let tasks = [];
let nextId = 1;

// ----------------- Endpoints -----------------

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "UP" });
});

// Metrics
app.get("/metrics", async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

// Get all tasks
app.get("/tasks", (req, res) => {
  res.json({
    traceId: req.traceId,
    data: tasks
  });
});

// Create a task
app.post("/tasks", (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({
      traceId: req.traceId,
      error: "Title is required"
    });
  }

  const task = {
    id: nextId++,
    title,
    completed: false,
    createdAt: new Date().toISOString()
  };

  tasks.push(task);

  res.status(201).json({
    traceId: req.traceId,
    message: "Task created",
    task
  });
});

// Update a task
app.put("/tasks/:id", (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);

  if (!task) {
    return res.status(404).json({
      traceId: req.traceId,
      error: "Task not found"
    });
  }

  task.completed = req.body.completed ?? task.completed;

  res.json({
    traceId: req.traceId,
    message: "Task updated",
    task
  });
});

// Delete a task
app.delete("/tasks/:id", (req, res) => {
  const index = tasks.findIndex(t => t.id == req.params.id);

  if (index === -1) {
    return res.status(404).json({
      traceId: req.traceId,
      error: "Task not found"
    });
  }

  tasks.splice(index, 1);

  res.json({
    traceId: req.traceId,
    message: "Task deleted"
  });
});

// ----------------- Export pour tests -----------------
module.exports = app;

// ----------------- Serveur -----------------
if (require.main === module) {
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`DevOps Task API running on http://localhost:${PORT}`);
  });
}
