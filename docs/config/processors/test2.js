"use strict";
var util = require("util");

module.exports = function parseCheck(log) {
	return {
		$runAfter: ['files-read'],
		$runBefore: ['parsing-tags'],
		$process: function (docs) {
			docs.forEach(function(doc){
				doc.name = "LocalStorage";
			});
			
			log.debug(util.inspect(docs, {depth: 3}));
		}		
	}
}