class Util {
    log (tag, message) {
        // TODO: change logger
        console.log(`${new Date()} ${tag}:  ${message}`);
    } 
}

module.exports = new Util();