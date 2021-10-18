const OAuth = require('OAuth');

const publicDataset = {

    ConstraintType: {
        MUST: 1,
        SHOULD: 2,
        MUST_NOT: 3,
    },

    retornaToken: function () {
        let token = {
            'public': process.env.TOKEN_PUBLIC,
            'secret': process.env.TOKEN_SECRET,
        };
        return token;
    },

    retornaOauth: function () {
        let consumer = {
            'public': process.env.CONSUMER_PUBLIC,
            'secret': process.env.CONSUMER_SECRET,
        };

        let oauth = new OAuth.OAuth(
            process.env.REQUEST_TOKEN_URL,
            process.env.ACCESS_TOKEN_URL,
            consumer.public,
            consumer.secret,
            1.0,
            null,
            'HMAC-SHA1'
        );

        return oauth;
    },

    createConstraint: function (field, initialValue, finalValue, type, likeSearch) {
        return {
            "_field": field,
            "_initialValue": initialValue,
            "_finalValue": finalValue,
            "_type": type || 1,
            "_likeSearch": likeSearch || false
        };
    },

    getDataset: function (name, fields, constraints, order) {
        return new Promise((resolve, reject) => {

            let corpo = JSON.stringify({
                name,
                fields,
                constraints,
                order
            }, null, 2);

            const token = this.retornaToken();
            const oauth = this.retornaOauth();

            console.log(corpo);

            oauth.post(
                process.env.URL,
                token.public,
                token.secret,
                corpo,
                'application/json',
                (e, data, res) => {
                    if (e) {
                        reject(e);
                    } else {
                        resolve(data);
                    }
                }
            );
        });
    },
}

module.exports = publicDataset;