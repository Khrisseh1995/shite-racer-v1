const randomWords = require('random-words');
module.exports.getWords = () => {
    const randoms = randomWords({ exactly: 30 })
    let splitWords  = randoms.map(x => {
        return x.split("").map(y => {
            return y;
        });
    });
    splitWords.forEach(x => {
        x.push(" ");
    });
    return {
        splitWords: splitWords.flat(1),
        displayWords: randoms
    };
}