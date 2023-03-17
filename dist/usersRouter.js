"use strict";
const RouterUsers = require('express');
const usersController = require('./usersController');
const usersRouter = new RouterUsers();
const usersEndPoints = {
    fetchUsers: '/fetch',
    blocking: '/blocking',
};
usersRouter.get(usersEndPoints.fetchUsers, usersController.fetchUsers);
usersRouter.put(usersEndPoints.blocking, usersController.blockingUsers);
module.exports = usersRouter;
