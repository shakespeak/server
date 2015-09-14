var fs = require('fs');
var words = {};
var progress = {
    finished: false
};
var data; 
// start processing text
console.log('..start');
fs.readFile('./text.txt', 'utf8', function(err, resp) {
    console.log('..file read');
    data = resp;
    split();
});


function split() {
    var sentences = data
        .split('\r\n')
        .map(function(sentence) {
            if (typeof progress.sentences === 'undefined') {
                console.log('..processing sentences');
                progress.sentences = true;
            }
            sentence = sentence.trim().replace(/[.,?;:!\'\"\]\[]/g, '');
            if (sentence.length) {
                return sentence.split(' ');
            }
            return [];
        })
        .map(function(d) {
            if (typeof progress.words === 'undefined') {
                console.log('..processing words');
                progress.words = true;
            }
            d.map(function(word) {
                if (typeof words[word] === 'undefined') {
                    words[word.toLowerCase()] = true;
                }
            })
            return d;
        });
        console.log('..process finished');
        progress.finished = true;
}

module.exports = {
    exists: function(word) {
       return (typeof words[word] !== 'undefined');
    },
    finished: function() {
        return progress.finished;
    }
}
