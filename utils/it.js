function it(title) {
    console.group(title)
    console.groupEnd()
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

var color_blue = '\x1b[34m'
var reset = '\x1b[0m'
var color_green = '\x1b[32m'
var color_purple = '\x1b[35m'

module.exports = { it, delay, color_blue, reset, color_green, color_purple}