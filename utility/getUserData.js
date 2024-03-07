const fs = require('fs')

module.exports = (login, pathReadFile) => {

    const data = fs.readFileSync(pathReadFile, {
        encoding: 'utf8'
    })
    let users = JSON.parse(data)

    const found_user = users.find((user_found) => user_found.login === login)

    if (!found_user) {
        return false
    }
    if (found_user && !found_user.data) {
        found_user.data = ' '
    }

    return found_user.data
}