const fs = require('fs')

module.exports = (user, pathReadFile) => {
    let success = false

    const data = fs.readFileSync(pathReadFile, {
        encoding: 'utf8'
    })
    let users = JSON.parse(data)

    users.push(user)
    users = JSON.stringify(users, null, 4)



    fs.writeFileSync(pathReadFile, users, {
        encoding: 'utf8',
        flag: 'w',
    })
    success = true

    return success
}