"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encode_jwt = encode_jwt;
exports.decode_jwt = decode_jwt;
exports.validate_jwt = validate_jwt;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function encode_jwt(secret, id, payload, ttl) {
    const data = Object.assign({ id }, payload);
    const options = ttl ? { expiresIn: ttl } : {};
    return jsonwebtoken_1.default.sign(data, secret, options);
}
function decode_jwt(secret, token) {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        return {
            id: decoded.id,
            payload: decoded,
            expires_at: new Date(decoded.exp * 1000)
        };
    }
    catch (err) {
        throw new Error('Invalid JWT');
    }
}
function validate_jwt(secret, token) {
    try {
        jsonwebtoken_1.default.verify(token, secret);
        return true;
    }
    catch (err) {
        return false;
    }
}
