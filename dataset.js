const OAuth = require('OAuth');
const fs = require('fs');
const keys = require('./keys');

const publicDataset = {

    ConstraintType: {
        MUST: 1,
        SHOULD: 2,
        MUST_NOT: 3,
    },

    retornaToken: function(){
        let token = {
            'public': keys.token.PUBLIC,
            'secret': keys.token.SECRET,
        };
        return token;
    },

    retornaOauth: function() {
        let consumer = {
            'public': keys.consumer.PUBLIC, 
            'secret': keys.consumer.SECRET, 
        };
        
        let oauth = new OAuth.OAuth(
            'http://fluig.pormade.com.br:8080/portal/api/rest/oauth/request_token',
            'http://fluig.pormade.com.br:8080/portal/api/rest/oauth/access_token',
            consumer.public,
            consumer.secret,
            1.0,
            null,
            'HMAC-SHA1'
        );

        return oauth;
    },

    createConstraint: function(field, initialValue, finalValue, type, likeSearch) {
        return {
            "_field": field,
            "_initialValue": initialValue,
            "_finalValue": finalValue,
            "_type": type || 1,
            "_likeSearch" : likeSearch || false
        };
    },

    getDataset: function(name, fields, constraints, order) {
        return new Promise((reject, resolve) => {

            let corpo = JSON.stringify({
                name,
                fields,
                constraints,
                order
            });
           
            const token = this.retornaToken();
            const oauth = this.retornaOauth();
            
            oauth.post(
                'http://fluig.pormade.com.br:8080/api/public/ecm/dataset/datasets',
                token.public,
                token.secret,
                corpo,
                'application/json',
                (e, data) => {
                    if (e) reject(new Error(console.error(e)));
                    resolve(fs.writeFile('dsk_indica_obras.json', data, (err) => {
                        if (err) reject(new Error(console.error(err)));
                        console.log('Salvo!');
                    }));
                }
            );
        });
    },
}

module.exports = publicDataset;