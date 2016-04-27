import {Inject, Injectable, Optional, OpaqueToken, NgZone} from "angular2/core";
import {BaseStorage, StorageOptions, STORAGE_OPTIONS} from "./basestorage";

export let LOCAL_STORAGE_OBJECT = new OpaqueToken("localstorage");
/**
 * Some information about LocalStorage
 */
@Injectable()
export class LocalStorage extends BaseStorage {
	/**
	 * @param ngZone - See angular2/core
	 * @param storage - The native [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) object
	 * @param options - The options that will regulate how this instance interacts with the localStorage object 
	 */
	constructor(ngZone: NgZone, @Inject(LOCAL_STORAGE_OBJECT) storage: Storage, @Inject(STORAGE_OPTIONS) @Optional() options?: StorageOptions) {
		super(ngZone, storage, options);
	}
}
