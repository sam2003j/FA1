const { encode_jwt } = require('../index');

describe('encode_jwt', () => {
    const secret = 'testsecret';
    const id = 'testid';
    const payload = { role: 'admin' };
    const ttl = 3600;

    it('should encode a JWT', () => {
        const token = encode_jwt(secret, id, payload, ttl);
        expect(token).toBeDefined();
    });
});
