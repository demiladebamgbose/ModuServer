class Util {
    log (tag, message) {
          console.log(`${new Date()} ${tag}:  ${message}`);
    } 
}

module.exports = new Util();