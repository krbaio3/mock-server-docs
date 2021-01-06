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

	imported_errorObject: function (loopArr) {

		var found1;

        if (!(loopArr instanceof Array)) {
        	loopArr = [];
        }

        found1 = loopArr.indexOf('imported_errorObject');

        if (found1 >= 0) {
        	if (loopArr.indexOf('imported_errorObject', found1 + 1) >= 0) {
        		return '{}';
        	}
        }

        loopArr.push('imported_errorObject');

		return JSON.stringify({
  "id": _getRes('_id', loopArr),
  "status": faker.random.number(),
  "title": faker.name.prefix(),
  "detail": faker.lorem.word(),
  "source": {}
}, null, 2);
	}

};

/* jshint ignore:end */
/* eslint-enable */