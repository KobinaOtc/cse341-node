const routes = require('express').Router();
const lesson1Controller = require('../controllers/lesson1');

routes.get('/', lesson1Controller.belindaRoute);
routes.get('/ysamie', lesson1Controller.ysamieRoute);

module.exports = routes;