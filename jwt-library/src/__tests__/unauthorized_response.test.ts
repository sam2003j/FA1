import request from 'supertest';
import express from 'express';
import { encode_jwt, validate_jwt } from '../index';

const app = express();
const secret = 'testsecret';

app.get('/protected', (req, res) => {
    const token = req.headers['authorization'];
    if (!token || !validate_jwt(secret, token)) {
        return res.status(401).send('unauthorized');
    }
    res.status(200).send('authorized');
});

describe('Unauthorized response', () => {
    it('should return 401 for an invalid JWT', async () => {
        const response = await request(app)
            .get('/protected')
            .set('Authorization', 'invalidtoken');
        expect(response.status).toBe(401);
        expect(response.text).toBe('unauthorized');
    });
});
