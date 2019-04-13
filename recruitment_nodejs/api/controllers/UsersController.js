'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('../db')

const table = 'users'

module.exports = {
    get: (req, res) => {
        let sql = 'SELECT * FROM users ORDER BY date_created DESC'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
    detail: (req, res) => {
        let sql = 'SELECT * FROM users WHERE id = ?'
        db.query(sql, [req.params.userId], (err, response) => {
            if (err) throw err
            res.json(response[0])
        })
    },
    update: (req, res) => {
        let data = req.body;
        let userId = req.params.userId;
        let sql = 'UPDATE users SET ? WHERE id = ?'
        db.query(sql, [data, userId], (err, response) => {
            if (err) throw err
            res.json({message: 'Update success!'})
        })
    },
    insert: (req, res) => {
        let data = req.body;
        let sql = 'INSERT INTO users SET ?'
        db.query(sql, [data], (err, response) => {
            if (err) throw err
            res.json({message: 'Insert success!'})
        })
    },
    delete: (req, res) => {
        let sql = 'DELETE FROM users WHERE id = ?'
        db.query(sql, [req.params.userId], (err, response) => {
            if (err) throw err
            res.json({message: 'Delete success!'})
        })
    }
}