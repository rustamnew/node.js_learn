module.exports = function(min = 0, max = 100) {
    const rand = min + Math.random() * (max + 1 - min)

    return Math.floor(rand) 
}