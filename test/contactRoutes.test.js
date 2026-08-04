import test from 'node:test';
import assert from 'node:assert/strict';

import contactRoutes from '../src/routes/contactRoutes.js';

test('registers the delete-all route before the delete-by-id route', () => {
    const deletePaths = contactRoutes.stack
        .filter((layer) => layer.route?.methods.delete)
        .map((layer) => layer.route.path);

    assert.deepEqual(deletePaths, ['/all', '/:id']);
});
