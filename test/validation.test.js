import test from 'node:test';
import assert from 'node:assert/strict';
import {
    validateSignup,
    validateLogin,
    validateUpdatePassword,
    validateUpdateUser,
    validateContact,
    validateIdParam,
    validatePagination,
    validatePhoneQuery
} from '../src/utils/middlewares/validationMiddleware.js';

const mockResponse = () => {
    const res = {};
    res.status = (code) => {
        res.statusCode = code;
        return res;
    };
    res.json = (data) => {
        res.body = data;
        return res;
    };
    return res;
};

const mockNext = () => {
    let called = false;
    return {
        next: () => { called = true; },
        wasCalled: () => called
    };
};

test('validateSignup passes with valid data', () => {
    const req = { body: { name: 'John', email: 'john@example.com', password: 'password123' } };
    const res = mockResponse();
    const { next, wasCalled } = mockNext();

    validateSignup(req, res, next);
    assert.equal(wasCalled(), true);
    assert.equal(res.statusCode, undefined);
});

test('validateSignup fails with invalid email and short password', () => {
    const req = { body: { name: 'J', email: 'not-an-email', password: '123' } };
    const res = mockResponse();
    const { next, wasCalled } = mockNext();

    validateSignup(req, res, next);
    assert.equal(wasCalled(), false);
    assert.equal(res.statusCode, 400);
    assert.equal(res.body.details.length, 3);
});

test('validateContact passes with valid phone and email', () => {
    const req = { body: { name: 'Jane', email: 'jane@example.com', phone: '+1234567890' } };
    const res = mockResponse();
    const { next, wasCalled } = mockNext();

    validateContact(req, res, next);
    assert.equal(wasCalled(), true);
});

test('validateContact allows empty email but validates format if present', () => {
    const req1 = { body: { name: 'Jane', phone: '+1234567890' } };
    const res1 = mockResponse();
    const nextObj1 = mockNext();
    validateContact(req1, res1, nextObj1.next);
    assert.equal(nextObj1.wasCalled(), true);

    const req2 = { body: { name: 'Jane', email: 'invalid', phone: '+1234567890' } };
    const res2 = mockResponse();
    const nextObj2 = mockNext();
    validateContact(req2, res2, nextObj2.next);
    assert.equal(nextObj2.wasCalled(), false);
    assert.equal(res2.statusCode, 400);
});

test('validateIdParam validates numeric IDs', () => {
    const req1 = { params: { id: '123' } };
    const res1 = mockResponse();
    const nextObj1 = mockNext();
    validateIdParam(req1, res1, nextObj1.next);
    assert.equal(nextObj1.wasCalled(), true);

    const req2 = { params: { id: 'abc' } };
    const res2 = mockResponse();
    const nextObj2 = mockNext();
    validateIdParam(req2, res2, nextObj2.next);
    assert.equal(nextObj2.wasCalled(), false);
    assert.equal(res2.statusCode, 400);
});

test('validatePagination validates page and limit', () => {
    const req1 = { query: { page: '1', limit: '10' } };
    const res1 = mockResponse();
    const nextObj1 = mockNext();
    validatePagination(req1, res1, nextObj1.next);
    assert.equal(nextObj1.wasCalled(), true);

    const req2 = { query: { page: '-1', limit: 'abc' } };
    const res2 = mockResponse();
    const nextObj2 = mockNext();
    validatePagination(req2, res2, nextObj2.next);
    assert.equal(nextObj2.wasCalled(), false);
    assert.equal(res2.statusCode, 400);
    assert.equal(res2.body.details.length, 2);
});
