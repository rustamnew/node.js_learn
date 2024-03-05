const random_int = require('./random_int')

module.exports = function(len = 10) {
    const random_array = []

    for (let i = 0; i < len; i++) {
        const random = random_int() 
        random_array.push(random)
    }
    

    return random_array 
}