const request = require('supertest');
const express = require('express');
const tasksRouter = require('../routes/tasks');
const app = express();
app.use(express.json());
app.use('/tasks', tasksRouter);

describe('Tasks API', () => {
    it('should create a new task', async () => {
        const res = await request(app)
            .post('/tasks')
            .send({
                text: 'Test task',
                category: 'Engineering',
                status: 'Open'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
    });

    it('should edit a task', async () => {
        const res = await request(app)
            .put('/tasks/1')
            .send({
                text: 'Updated task',
                category: 'Marketing',
                status: 'Closed'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body.text).toEqual('Updated task');
    });

    it('should delete a task', async () => {
        const res = await request(app)
            .delete('/tasks/1');
        expect(res.statusCode).toEqual(200);
    });

    it('should list all tasks', async () => {
        const res = await request(app)
            .get('/tasks');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});