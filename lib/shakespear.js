var fs = require('fs');
var words = {};
var wordsArray = [];
var sentencesArray = [];
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
            sentencesArray.push({
                sentence: sentence,
                words: sentence.split(' ').map(function (w) {
                    return w.toLowerCase();
                })
            });
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
            d.map(function(word, index) {
                if (typeof words[word] === 'undefined') {
                    words[word.toLowerCase()] = {
                        exists: true,
                        sentence: [d],
                        next: d.length > index ? [] : [d[index+1]]
                    }
                } else {
                    words[word.toLowerCase()].sentence.push(d);
                    if (d.length > index) {
                        if (typeof d[index+1] !== 'undefined') {
                            words[word.toLowerCase()].next.push(d[index+1]);
                        }
                    }
                    // wordsArray.push(word.toLowerCase());
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
    },
    sentence: function (word) {
        var returnArray = [];
        for (var i = 0, ii = sentencesArray.length; i < ii; i++) {
            if (sentencesArray[i].words.indexOf(word) > -1) {
                returnArray.push(sentencesArray[i].sentence);
            }
        }
        return returnArray;
    },
    get: function (word) {
        return words[word];
    }
}
