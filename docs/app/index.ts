import "guid";
import "es6-shim";

import {Component} from "angular2/core";
import {bootstrap} from "angular2/platform/browser";
import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, RouteConfig} from "angular2/router";
import {Api} from "./components/API";
import {Demos} from "./components/Demos";

@RouteConfig([
	{path: "/api", name:"Api", component:Api, useAsDefault: true},
	{path: "/demos/...", name:"Demos", component: Demos}
])
@Component({
	selector: "documentation",
	template: `<h1>h5webstorage Documentation</h1>
	<a [routerLink]="['Api']">API</a> <a [routerLink]="['Demos']">Demos</a>
	<router-outlet></router-outlet>`,
	directives:[ROUTER_DIRECTIVES],
	providers:[ROUTER_PROVIDERS]
})
class App{}

bootstrap(App);