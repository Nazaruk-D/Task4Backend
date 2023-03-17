import {connection} from "./index";

const bcrypt = require('bcrypt');

class usersController {
    async fetchUsers(req: any, res: any) {
        // try {
        //     const allLetters = "SELECT * FROM letters"
        //     connection.query(allLetters, (err: any, res: any) => {
        //         res.status(200).json(res)
        //         return console.log('Connection closed')
        //     })
        // }

        try {
            const getUsersQuery = "SELECT * FROM Users"
            connection.query(getUsersQuery, (error: any, results: any) => {
                if (error) {
                    return res.status(400).json({message: 'Error getting users', statusCode: 400});
                } else {
                    const users = results;
                    const usersData: any = {};
                    usersData.users = users;
                    return res.status(200).send({message: 'Getting users successfully', data: usersData, statusCode: 200});
                }
            });
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Get users error', statusCode: 400})
        }
    }

    async blockingUsers(req: any, res: any) {
        try {
            const {id, password} = req.body;
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const updateUserPasswordQuery = `UPDATE Users SET password_hash='${hashedPassword}', updated_at=CURRENT_TIMESTAMP WHERE id=${id}`;
            connection.query(updateUserPasswordQuery, (error: any, results: any) => {
                if (error) {
                    return res.status(500).json({message: 'Error updating user password'});
                } else {
                    return res.status(200).send({message: 'User password updated successfully'});
                }
            })
            return console.log('Connection closed')
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Update data error', statusCode: 400})
        }
    }
}

module.exports = new usersController()