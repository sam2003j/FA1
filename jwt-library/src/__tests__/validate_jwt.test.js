const { encode_jwt, validate_jwt } = require('../index');

describe('validate_jwt', () => {
    const secret = 'testsecret';
    const id = 'testid';
    const payload = { role: 'admin' };
    const ttl = 3600;

    it('should return true for a valid JWT', () => {
        const token = encode_jwt(secret, id, payload, ttl);
        expect(validate_jwt(secret, token)).toBe(true);
    });

    it('should return false for an invalid JWT', () => {
        const invalidToken = 'invalidtoken';
        expect(validate_jwt(secret, invalidToken)).toBe(false);
    });
});
