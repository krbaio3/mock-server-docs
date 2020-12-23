/* eslint-disable */
/* jshint ignore:start */
'use strict';

var faker = require('faker');

function _getArray(getData) {
	var out = [],
		len = faker.random.number(10) + 1,
		i;

	for (i = 0; i < len; i += 1) {
		out.push(getData());
	}

	return out;
}


function _getRes(name, loopArr) {
	try {
		return JSON.parse(require(__dirname + '/' + name + '.js')['imported' + name](loopArr.slice()));
	} catch (err) {}

	return {};
}

module.exports = {

	importedRequestBodySignature: function (loopArr) {

		var found1;

        if (!(loopArr instanceof Array)) {
        	loopArr = [];
        }

        found1 = loopArr.indexOf('importedRequestBodySignature');

        if (found1 >= 0) {
        	if (loopArr.indexOf('importedRequestBodySignature', found1 + 1) >= 0) {
        		return '{}';
        	}
        }

        loopArr.push('importedRequestBodySignature');

		return JSON.stringify({}, null, 2);
	}

};

/* jshint ignore:end */
/* eslint-enable */