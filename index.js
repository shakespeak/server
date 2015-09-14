var natural = require('natural');  
//var stemmer = natural.PorterStemmer;  
var wordnet = new natural.WordNet();
//stemmer.attach(); 
var shakespeak = require('./lib/shakespear');
var _ = require('lodash');


var express = require('express');
var app = express();




// respond with "hello world" when a GET request is made to the homepage
app.get('/lookup/:word', function(req, res) {
    var returnWords = [];
    if (!shakespeak.finished()) {
        res.status(404);// wrong code, but hey sue me
        res.send('not processed text yet');
        return;
    }

    if (shakespeak.exists(req.params.word)) {
        returnWords.push(req.params.word);
        // check up if word exists in shakespear already
    }
    wordnet.lookup(req.params.word, function(results) {
        if (results.length === 0) {
            res.send(returnWords);
            return;
        }
        results.forEach(function(result) {
            returnWords = returnWords.concat(result.synonyms.filter(function(word) {
                if (shakespeak.exists(word)) {
                    return word;
                }
            }));
        });
        res.send(_.uniq(returnWords));
    });

});
app.listen(9998);

