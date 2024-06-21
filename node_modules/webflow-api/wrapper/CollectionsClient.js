"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const Client_1 = require("../api/resources/collections/client/Client");
const ItemsClient_1 = require("./ItemsClient");
// Client adapts the base client to permit extra properties in
// the client.Collections.Items.createItem request.
class Client extends Client_1.Collections {
    constructor(_options) {
        super(_options);
        this._options = _options;
    }
    get items() {
        var _a;
        return ((_a = this._items) !== null && _a !== void 0 ? _a : (this._items = new ItemsClient_1.Client(this._options)));
    }
}
exports.Client = Client;
