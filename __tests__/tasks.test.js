const request = require('supertest');
const express = require('express');
const router = require('../routes/tasks');
const app = express();
app.use(express.json());
app.use('/', router);

describe('Tasks API', () => {
    let taskId = "1";
    const date = new Date();

    it('should create a new task', async () => {
        const res = await request(app)
            .post('/')
            .send({
                id: '1',
                description: 'Test task',
                category: 'Test',
                status: 'To Do',
                createdAt:  `${date}`,
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual([{
            id: '1',
            text: 'Test task',
            category: 'Test',
            status: 'To Do',
            createdAt: `${date}`,
            state: false,
        }]);
        taskId = res.body.id;
    });

    it('should edit a task', async () => {
        await request(app)
            .post('/')
            .send({
                id: '2',
                description: 'Test task',
                category: 'Test',
                status: 'To Do',
                createdAt:  `${date}`,
            });
        
        const res = await request(app)
            .patch("/2")
            .send({
                description: 'Updated task',
            });
           

        expect(res.statusCode).toEqual(200);
        res.body.forEach(element => {
            if(element.id === "2") {
                expect(element.description).toEqual('Updated task');
            }
        });
    });

    it('should delete a task', async () => {
        await request(app)
        .post('/')
        .send({
            id: '3',
            description: 'Test task',
            category: 'Test',
            status: 'To Do',
            createdAt:  `${date}`,
        });
        const res = await request(app)
            .delete(`/3`);
        expect(res.statusCode).toEqual(200);
        res.body.forEach(element => {
            expect(element.id).not.toEqual('3');
        });
    });

    it('should delete all tasks', async () => {
        const res = await request(app)
            .delete('/');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual([]);
    });

    it('should list all tasks', async () => {
        const res = await request(app)
            .get('/');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});