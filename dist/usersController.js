"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const bcrypt = require('bcrypt');
class usersController {
    fetchUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // try {
            //     const allLetters = "SELECT * FROM letters"
            //     connection.query(allLetters, (err: any, res: any) => {
            //         res.status(200).json(res)
            //         return console.log('Connection closed')
            //     })
            // }
            try {
                const getUsersQuery = "SELECT * FROM Users";
                index_1.connection.query(getUsersQuery, (error, results) => {
                    if (error) {
                        return res.status(400).json({ message: 'Error getting users', statusCode: 400 });
                    }
                    else {
                        const users = results;
                        const usersData = {};
                        usersData.users = users;
                        return res.status(200).send({ message: 'Getting users successfully', data: usersData, statusCode: 200 });
                    }
                });
            }
            catch (e) {
                console.log(e);
                res.status(400).json({ message: 'Get users error', statusCode: 400 });
            }
        });
    }
    blockingUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, password } = req.body;
                const salt = yield bcrypt.genSalt(10);
                const hashedPassword = yield bcrypt.hash(password, salt);
                const updateUserPasswordQuery = `UPDATE Users SET password_hash='${hashedPassword}', updated_at=CURRENT_TIMESTAMP WHERE id=${id}`;
                index_1.connection.query(updateUserPasswordQuery, (error, results) => {
                    if (error) {
                        return res.status(500).json({ message: 'Error updating user password' });
                    }
                    else {
                        return res.status(200).send({ message: 'User password updated successfully' });
                    }
                });
                return console.log('Connection closed');
            }
            catch (e) {
                console.log(e);
                res.status(400).json({ message: 'Update data error', statusCode: 400 });
            }
        });
    }
}
module.exports = new usersController();
