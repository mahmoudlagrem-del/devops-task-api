const express = require("express");
const app = express();

app.use(express.json());

let tasks = [];
let requestCount = 0;

// Middleware observabilité
app.use((req, res, next) => {
  requestCount++;
  req.traceId = Math.random().toString(36).substring(2, 10);

  console.log({
    traceId: req.traceId,
    method: req.method,
    path: req.path,
    time: new Date().toISOString()
  });

  next();
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "UP" });
});

// Metrics
app.get("/metrics", (req, res) => {
  res.json({
    requests: requestCount,
    tasks: tasks.length
  });
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
    id: tasks.length + 1,
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

// Start server
app.listen(3000, () => {
  console.log("DevOps Task API running on http://localhost:3000");
});
