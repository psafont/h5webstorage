import {Component} from "angular2/core";
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import {TodoApp} from "../../../example/app/app";
import {Selector} from "./Demo-Select";

@RouteConfig([
	{ path: "/", name: "Selector", component: Selector, useAsDefault: true},
	{ path: "/todo", name: "ToDo", component: TodoApp }
])
@Component({
	selector: "demos",
	template: `Demos <br/><router-outlet></router-outlet>`,
	directives: [ROUTER_DIRECTIVES]
})
export class Demos {

}