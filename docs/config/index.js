"use strict";

var path = require('canonical-path');
var packagePath = __dirname;

var Package = require('dgeni').Package;

module.exports = new Package('h5webstorage', [
	require('dgeni-packages/jsdoc'),
	require('dgeni-packages/nunjucks'),
	require('dgeni-packages/typescript')
])
	.factory(require("./transforms/associateType"))
	.factory('EXPORT_DOC_TYPES', function () {
		return [
			'class',
			'interface',
			'function',
			'var',
			'const',
			'let',
			'enum',
			'type-alias'
		];
	})
	.processor(require("./processors/test"))

	.config(function (dgeni, log, readTypeScriptModules, readFilesProcessor, writeFilesProcessor, parseTagsProcessor, associateTypeTransform) {
		var parsing = parseTagsProcessor.tagDefinitions.filter(function(parser){
			return parser.name == "param";
		});
		parsing[0].transforms.push(associateTypeTransform);
		dgeni.stopOnValidationError = true;
		dgeni.stopOnProcessingError = true;

		log.level = 'info';
		//log.add(log.transports.File, {filename: './dist/somefile.log', handleExceptions: true});

		readTypeScriptModules.basePath = path.resolve(packagePath, '../../src')
		readTypeScriptModules.sourceFiles = [
			{ include: 'api.ts', exclude: '*spec.ts', basePath: "." },
		]

		readFilesProcessor.basePath = path.resolve(packagePath, '../');
		readFilesProcessor.sourceFiles = [
			{ include: 'content/**/*.ngdoc', basePath: 'content' }
		];

		writeFilesProcessor.outputFolder = path.resolve(packagePath, '../../dist/docs');
	})

	.config(function (templateFinder, templateEngine) {
		templateEngine.config.tags = {
			variableStart: '{$',
			variableEnd: '$}'
		};
		templateFinder.templateFolders.unshift(path.resolve(packagePath, 'templates'));
		templateFinder.templatePatterns = [
			'${doc.type}/${doc.docType}.ts.template',
			'${doc.type}/base.ts.template',
			'${doc.docType}.template.html',
			'common.template.html'
		].concat(templateEngine.templatePatterns);
		
		templateEngine.filters = templateEngine.filters.concat([require("./filters/inspect")])
	})

	.config(function (computePathsProcessor, computeIdsProcessor, EXPORT_DOC_TYPES) {

		// computePathsProcessor.pathTemplates.push({
		// 	docTypes: ['error'],
		// 	pathTemplate: 'error/${namespace}/${name}',
		// 	outputPathTemplate: 'partials/error/${namespace}/${name}.html'
		// });

		// computePathsProcessor.pathTemplates.push({
		// 	docTypes: ['errorNamespace'],
		// 	pathTemplate: 'error/${name}',
		// 	outputPathTemplate: 'partials/error/${name}.html'
		// });

		// computePathsProcessor.pathTemplates.push({
		// 	docTypes: ['overview', 'tutorial'],
		// 	getPath: function (doc) {
		// 		var docPath = path.dirname(doc.fileInfo.relativePath);
		// 		if (doc.fileInfo.baseName !== 'index') {
		// 			docPath = path.join(docPath, doc.fileInfo.baseName);
		// 		}
		// 		return docPath;
		// 	},
		// 	outputPathTemplate: 'partials/${path}.html'
		// });

		// computePathsProcessor.pathTemplates.push({
		// 	docTypes: ['e2e-test'],
		// 	getPath: function () { },
		// 	outputPathTemplate: 'ptore2e/${example.id}/${deployment.name}_test.js'
		// });

		// computePathsProcessor.pathTemplates.push({
		// 	docTypes: ['indexPage'],
		// 	pathTemplate: '.',
		// 	outputPathTemplate: '${id}.html'
		// });

		// computePathsProcessor.pathTemplates.push({
		// 	docTypes: ['componentGroup'],
		// 	pathTemplate: '${area}/${moduleName}/${groupType}',
		// 	outputPathTemplate: 'partials/${area}/${moduleName}/${groupType}.html'
		// });

		var MODULES_DOCS_PATH = 'partials/modules';

		computePathsProcessor.pathTemplates.push({
			docTypes: ['module'],
			//pathTemplate: '/${id}',
			outputPathTemplate: MODULES_DOCS_PATH + '/${path}.html'
		});

		computePathsProcessor.pathTemplates.push({
			docTypes: EXPORT_DOC_TYPES,
			//pathTemplate: '${moduleDoc.path}/${name}',
			outputPathTemplate: MODULES_DOCS_PATH + '${path}.html'
		});
		
		computePathsProcessor.pathTemplates.push({
			docTypes: ['ts', 'tsmodule'],
			pathTemplate: '${moduleDoc.path}/${name}',
			outputPathTemplate: MODULES_DOCS_PATH + '${path}.ts'
		})
		
		// computeIdsProcessor.idTempates.push({
		// 	docTypes:['component'],
		// 	getId: function(doc){ return doc.name + "Cmpnt"},
		// 	getAliases: function(doc){ return [doc.id]}
		// })

		// computeIdsProcessor.idTemplates.push({
		// 	docTypes: ['overview', 'tutorial', 'e2e-test', 'indexPage'],
		// 	getId: function (doc) { return doc.fileInfo.baseName; },
		// 	getAliases: function (doc) { return [doc.id]; }
		// });

		// computeIdsProcessor.idTemplates.push({
		// 	docTypes: ['error'],
		// 	getId: function (doc) { return 'error:' + doc.namespace + ':' + doc.name; },
		// 	getAliases: function (doc) { return [doc.name, doc.namespace + ':' + doc.name, doc.id]; }
		// },
		// 	{
		// 		docTypes: ['errorNamespace'],
		// 		getId: function (doc) { return 'error:' + doc.name; },
		// 		getAliases: function (doc) { return [doc.id]; }
		// 	}
		// );
	})

	.config(function (checkAnchorLinksProcessor) {
		checkAnchorLinksProcessor.base = '/';
		// We are only interested in docs that have an area (i.e. they are pages)
		checkAnchorLinksProcessor.checkDoc = function (doc) { return doc.area; };
	})