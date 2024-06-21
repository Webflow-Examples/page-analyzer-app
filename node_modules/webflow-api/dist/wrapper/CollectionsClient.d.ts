import { Collections } from "../api/resources/collections/client/Client";
import { Client as Items } from "./ItemsClient";
export declare class Client extends Collections {
    protected readonly _options: Collections.Options;
    constructor(_options: Collections.Options);
    protected _items: Items | undefined;
    get items(): Items;
}
