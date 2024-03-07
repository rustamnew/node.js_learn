const http = require('http')
const path = require('path')
const express = require('express');
const port = 3500

const validateForm = require('./utility/validateForm');
const uniqueLogin = require('./utility/uniqueLogin');
const registerUser = require('./utility/registerUser');
const loginUser = require('./utility/loginUser');
const saveUserData = require('./utility/saveUserData');
const getUserData = require('./utility/getUserData');

const app = express();
app.use(express.json())

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});
app.get('/register', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/register.html'));
});
app.get('/login', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/login.html'));
});
app.get('/js/script.js', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/js/script.js'));
});
app.get('/css/style.css', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/css/style.css'));
});
app.get('/images/evolution.png', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/images/evolution.png'));
});



app.get('/api/ping', (req, res) => {
    res.json({
        pong: 123
    });
});

app.post('/api/register', (req, res) => {
    const dataPath = path.join(__dirname, './data/users.json')
    const validate = validateForm(req.body)
    const uniqueUser = uniqueLogin(req.body.login, dataPath)
    
    if (validate.vaild === true && uniqueUser) {
        if (registerUser(req.body, dataPath)) {
            res.json({
                status: 'ok',
                body: req.body
            });
        }
    } else {
        if (!uniqueUser) {
            validate.errorMessages.push('Такой пользователь уже существует')
        }
        res.json(validate);
    } 
});
app.post('/api/login', (req, res) => {
    const dataPath = path.join(__dirname, './data/users.json')
    const validate = validateForm(req.body)
    
    if (validate.vaild === true ) {
        const user = loginUser(req.body, dataPath)

        if (user) {
            res.json({
                status: 'ok',
                body: user
            });
        } else {
            validate.errorMessages.push('Такой пользователь не существует')
        }
    } else {
        res.json(validate);
    } 
});
app.post('/api/save', (req, res) => {
    const dataPath = path.join(__dirname, './data/users.json')
    const user_login = req.body.login

    const user_data_saved = saveUserData(user_login, req.body.data, dataPath)
    
    if ( user_data_saved ) {
        res.json({
            status: 'ok',
            body: user_data_saved
        });
    } else {
        res.json({
            status: 'error',
            body: req.body
        });
    } 
});
app.get('/api/user/:login', (req, res) => {
    const dataPath = path.join(__dirname, './data/users.json')

    const user_data = getUserData(req.params.login, dataPath)

    if ( user_data ) {
        res.json({
            status: 'ok',
            body: user_data
        });
    } else {
        res.json({
            status: 'error',
            body: req.body
        });
    } 
});

app.listen(port);