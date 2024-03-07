const fs = require('fs')

module.exports = (user, pathReadFile) => {
    let success = false

    const data = fs.readFileSync(pathReadFile, {
        encoding: 'utf8'
    })
    let users = JSON.parse(data)

    const found_user = users.find((user_found) => user_found.login === user.login)

    if (found_user && user.password === found_user.password) {
        return found_user
    } else {
        return false
    }
}