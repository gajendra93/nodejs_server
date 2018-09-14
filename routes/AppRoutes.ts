let express = require('express');

import { App } from '../apps/App';

let appRoutes = () => {
    let router: any = new express.Router();

    router.get('/file', App.readFile);
    router.get('/product/:a/:b', App.generateProduct);
    router.post('/file', App.createFile);

    return router;
}

module.exports = appRoutes;

