//
// Copyright (c) 2019, Alexander Yakovlev <insbrook@gmail.com>
//
//   Permission to use, copy, modify, and/or distribute this software for any
// purpose with or without fee is hereby granted, provided that the above
// copyright notice and this permission notice appear in all copies.
//
//   THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
// ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
//
'use strict'

const proxyquire = require('proxyquire');
const assert = require('assert');

/**
 * Request stub with valid json response
 * @param fn
 * @returns {*}
 */
const validJsonStub = fn => {
    fn['request'] = function (params) {
        assert.deepEqual(params, {
            method: 'post',
            url: 'http://domain.tld',
            headers: { 'Content-Type': 'application/vnd.api+json' },
            data: { dataKey: 'dataValue', key: 'somekey', poweredBy: 'textgears-api' },
            timeout: 10000,
            responseType: 'json',
            maxRedirects: 3
        });
        return new Promise(function (resolve, reject) {
            resolve({
                data: {
                    some: "data",
                }
            });
        })
    };
    fn['@noCallThru'] = true;
    return fn;
};

/**
 * Invalid response Request stub
 * @param fn
 * @returns {*}
 */
const errorStub = fn => {
    fn['request'] = (params) => {
        return new Promise(function (resolve, reject) {
            // Not connected or incorrect response
            reject({
                request: params,
            });
        })
    };
    fn['@noCallThru'] = true;
    return fn;
};

describe('jsonRequest', function () {

    it('should send correct http request and process json answer', function () {
        const jsonRequest = proxyquire('../jsonrequest', {
            'axios': validJsonStub(() => {}),
        });

        jsonRequest('http://domain.tld', 'somekey', {'dataKey': 'dataValue'})
            // Resolve expected
            .then((data) => assert.deepEqual(data, {some: "data"}))
            .catch((data) => {console.log(data);assert.fail("Promise rejection not expected")});
    });

    it('should reject on request error', function () {
        const jsonRequest = proxyquire('../jsonrequest', {
            'axios': errorStub(() => {}),
        });

        jsonRequest('http://domain.tld', 'somekey', {'dataKey': 'dataValue'})
            .then((data) => assert.fail("Promise resolve not expected"))
            // Reject expected
            .catch(() => assert.ok(true));
    });

});