import {Component} from "angular2/core";
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";

@Component({
	selector: "demo-selector",
	template: `<a [routerLink]="['ToDo']">To Do App</a>`,
	directives: [ROUTER_DIRECTIVES]
})
export class Selector {

}