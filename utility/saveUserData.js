const fs = require('fs')

module.exports = (login, data, pathReadFile) => {
    const data_users = fs.readFileSync(pathReadFile, {
        encoding: 'utf8'
    })
    let users = JSON.parse(data_users)

    let found_user = users.find((user) => {
        if (user.login === login) {
            user.data = data
        }
        return user.login === login
    })

    users = JSON.stringify(users, null, 4)
    fs.writeFileSync(pathReadFile, users, {
        encoding: 'utf8',
        flag: 'w',
    })

    return found_user
}