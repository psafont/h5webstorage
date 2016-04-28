"use strict";
var util = require("util");

module.exports = function dgeniSpy(log) {
	return {
		$runAfter: ['adding-extra-docs'],
		$runBefore: ['extra-docs-added'],
		$process: function (docs) {
			var cmptDocs = [];
			docs.filter(function(doc){
				return doc.moduleDoc;
			}).forEach(function(doc){
				docs.push({
					type: "component",
					docType: "ts",
					id: doc.name + "Cmpnt",
					aliases: [doc.name + "Cmpnt"],
					path: doc.path,
					templateUrl: doc.name + ".html",
					name: doc.name,
					moduleDoc: doc.moduleDoc
				});
			});
			
			docs.filter(function(doc){
				return doc.docType == "module";
			}).forEach(function(doc){
				var data = {
					type: "component",
					docType: "tsmodule",
					id: doc.name + "Mdl",
					aliases: [doc.name + "Mdl"],
					path: "/" + doc.name,
					templateUrl: doc.name + ".html",
					name: doc.name,
					moduleDoc: { path: ""},
					exports: doc.exports
				};
				docs.push(data);
				var tmp = data;
				delete tmp.exports;
				log.silly(tmp);
			})
		}
	}
}