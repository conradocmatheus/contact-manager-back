export const isValidEmail = (email) => {
    if (!email || typeof email !== 'string') return false;
    // Padrão simples para validar e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const isValidPhone = (phone) => {
    if (!phone || typeof phone !== 'string') return false;
    // Valida números com 10 a 15 dígitos numéricos, opcionalmente iniciando com +
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
};

export const isValidString = (str, minLength = 1) => {
    return typeof str === 'string' && str.trim().length >= minLength;
};

export const isValidId = (id) => {
    const num = Number(id);
    return Number.isInteger(num) && num > 0;
};
