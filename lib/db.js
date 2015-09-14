/*
var levelup     = require('levelup');
var db          = levelup('../db');
//var config      = require('../config');
var Promise     = require('es6-promise').Promise;
var key = 'shakespeak';

module.exports = {
    log: function(fn) {
        logfn = fn;
    },
    push: function(row) {
         return this.getAll()
             .then(function(data) {
                 //logfn(data);
                 data.push(this.createLeafData(row, data.length));
                 logfn(data);
                 console.log('yo data', data);
                 return this.put(data);
             }.bind(this))
             .catch(function(err) { 
                 logfn('got wrong', err);
                 var data = [];
                 data.push(this.createLeafData(row, 0)); // this is wrong
                 return this.put(data);
             }.bind(this))
    },
    put : function(_data) {
        return new Promise(function(resolve, reject) {
            db.put(key, JSON.stringify(_data), function(err, data) {
                if (err) {
                    return reject(err);
                }
                return resolve(_data);
            });
        });
    },
    count: function() {
        return this.getAll()
            .then(function(data) {
                return data ? data.length : 0;
            })
            .catch(function() {
                return 0;
            });
    },
    _clear: function() {
        return this.put([]);
    },
    getAllFlowers: function () {
        return new Promise(function(done, reject){
            db.get('flowers', function(err, data) {
                if (err) {
                    return reject(err);
                }
                return done(JSON.parse(data));
            }.bind(this));
        }.bind(this));
    },
    getAll: function(key) {
        return new Promise(function(done, reject){
            db.get(key, function(err, data) {
                if (err) {
                    return reject(err);
                }
                return done(JSON.parse(data).map(function(item) {
                    return item;
                }));
            }.bind(this));
        }.bind(this));
    }
}
*/
