System.config({
	defaultJSExtensions: true,
	map: {
		"angular2": "../../node_modules/angular2",
		"rxjs": "../../node_modules/rxjs",
		"guid": "../../node_modules/guid/guid",
		"es6-shim": "../../node_modules/es6-shim/es6-shim",		
	},
	packages: {
		"documentation": {
			defaultExtension: "js",
			main: "../../../dist/docs/app/index"
		},
		"demos":{
			defaultExtension: "js",
			paths:{
				"todo": "../../../dist/example/app"
			}
		}
	}
});
