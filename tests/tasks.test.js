const request = require("supertest");
const express = require("express");

//PULL REQUESTS + PEER REVIEW
const app = require("../index");

describe("Task API", () => {
  it("GET /health should return status UP", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toBe("UP");
  });

  it("POST /tasks should create a new task", async () => {
    const res = await request(app)
      .post("/tasks")
      .send({ title: "Test task" });
    expect(res.statusCode).toEqual(201);
    expect(res.body.task.title).toBe("Test task");
    expect(res.body.task.completed).toBe(false);
  });

  it("POST /tasks without title should return 400", async () => {
    const res = await request(app)
      .post("/tasks")
      .send({});
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toBe("Title is required");
  });

  it("GET /tasks should return tasks array", async () => {
    const res = await request(app).get("/tasks");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});
