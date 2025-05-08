export function sanitizeBody(fields) {
    return function (req, res, next) {
        for (const field of fields) {
            const value = req.body[field];

            if (typeof value === 'string') {
                req.body[field] = value.trim();
            }

            if (['phone', 'cpf', 'cnpj'].includes(field) && typeof req.body[field] === 'string') {
                req.body[field] = req.body[field].replace(/\D/g, '')
            }
        }

        next();
    };
}