import { isValidEmail, isValidPhone, isValidString, isValidId } from '../validators.js';

export const validateSignup = (req, res, next) => {
    const { name, email, password } = req.body;
    const errors = [];

    if (!isValidString(name, 2)) errors.push('Name must be a string with at least 2 characters');
    if (!isValidEmail(email)) errors.push('Invalid email format');
    if (!isValidString(password, 6)) errors.push('Password must be at least 6 characters long');

    if (errors.length > 0) return res.status(400).json({ error: 'Validation failed', details: errors });
    next();
};

export const validateLogin = (req, res, next) => {
    const { email, password } = req.body;
    const errors = [];

    if (!isValidEmail(email)) errors.push('Invalid email format');
    if (!isValidString(password)) errors.push('Password is required');

    if (errors.length > 0) return res.status(400).json({ error: 'Validation failed', details: errors });
    next();
};

export const validateUpdatePassword = (req, res, next) => {
    const { currentPassword, newPassword } = req.body;
    const errors = [];

    if (!isValidString(currentPassword)) errors.push('Current password is required');
    if (!isValidString(newPassword, 6)) errors.push('New password must be at least 6 characters long');

    if (errors.length > 0) return res.status(400).json({ error: 'Validation failed', details: errors });
    next();
};

export const validateUpdateUser = (req, res, next) => {
    const { name, email } = req.body;
    const errors = [];

    if (name !== undefined && !isValidString(name, 2)) errors.push('Name must be a string with at least 2 characters');
    if (email !== undefined && !isValidEmail(email)) errors.push('Invalid email format');

    if (errors.length > 0) return res.status(400).json({ error: 'Validation failed', details: errors });
    next();
};

export const validateContact = (req, res, next) => {
    const { name, email, phone } = req.body;
    const errors = [];

    if (!isValidString(name, 2)) errors.push('Name must be a string with at least 2 characters');
    if (email !== undefined && email !== null && email !== '' && !isValidEmail(email)) errors.push('Invalid email format');
    if (!isValidPhone(phone)) errors.push('Invalid phone format');

    if (errors.length > 0) return res.status(400).json({ error: 'Validation failed', details: errors });
    next();
};

export const validateIdParam = (req, res, next) => {
    const { id } = req.params;
    if (!isValidId(id)) {
        return res.status(400).json({ error: 'Validation failed', details: ['Invalid ID parameter'] });
    }
    next();
};

export const validatePagination = (req, res, next) => {
    const { page, limit } = req.query;
    const errors = [];

    if (page !== undefined) {
        const pageNum = Number(page);
        if (!Number.isInteger(pageNum) || pageNum < 1) errors.push('Page must be a positive integer');
    }

    if (limit !== undefined) {
        const limitNum = Number(limit);
        if (!Number.isInteger(limitNum) || limitNum < 1) errors.push('Limit must be a positive integer');
    }

    if (errors.length > 0) return res.status(400).json({ error: 'Validation failed', details: errors });
    next();
};

export const validatePhoneQuery = (req, res, next) => {
    const { number } = req.query;
    if (!isValidPhone(number)) {
        return res.status(400).json({ error: 'Validation failed', details: ['Invalid phone number in query'] });
    }
    next();
};
