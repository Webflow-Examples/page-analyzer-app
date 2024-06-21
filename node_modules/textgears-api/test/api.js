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
const api = require('../api');

/**
 * Request stub with valid json response
 * @param fn
 * @returns {*}
 */
const validJsonStub = fn => {
    fn['request'] = function (params) {
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
 * @param jsonRequest
 * @returns {Api}
 */
function getTestApiProvider(jsonRequest) {
    return new api(
        jsonRequest,
        'anykey',
        {
            endpoint: 'https://endpoint',
            language: 'en-US'
        }
    );
}

describe('API', function () {

    it('should throw error on empty text', function () {
        const jsonRequest = proxyquire('../jsonrequest', {
            'axios': validJsonStub(() => {}),
        });
        assert.throws(
            () => {
                return getTestApiProvider(jsonRequest).checkSpelling('');
            },
            {
                name: 'Error',
                message: 'Text to check cannot be empty',
            }
        );
    });

    it('should provide automatic text correction', function () {
        const jsonRequest = proxyquire('../jsonrequest', {
            'axios': validJsonStub(() => {}),
        });
        getTestApiProvider(jsonRequest).correct('some words')
            .then(() => assert.ok(true))
            .catch(() => assert.fail("Rejection not expected here"))
    });

    it('should provide text translation', function () {
        const jsonRequest = proxyquire('../jsonrequest', {
            'axios': validJsonStub(() => {}),
        });
        getTestApiProvider(jsonRequest).translate('some words')
            .then(() => assert.ok(true))
            .catch(() => assert.fail("Rejection not expected here"))
    });

    it('should provide text split', function () {
        const jsonRequest = proxyquire('../jsonrequest', {
            'axios': validJsonStub(() => {}),
        });
        getTestApiProvider(jsonRequest).splitSentences('some words. another words')
            .then(() => assert.ok(true))
            .catch(() => assert.fail("Rejection not expected here"))
    });

    it('should provide automatic text paraphrising', function () {
        const jsonRequest = proxyquire('../jsonrequest', {
            'axios': validJsonStub(() => {}),
        });
        getTestApiProvider(jsonRequest).paraphrase('some words')
            .then(() => assert.ok(true))
            .catch(() => assert.fail("Rejection not expected here"))
    });

    it('should provide spell check', function () {
        const jsonRequest = proxyquire('../jsonrequest', {
            'axios': validJsonStub(() => {}),
        });
        getTestApiProvider(jsonRequest).checkSpelling('some words')
            .then(() => assert.ok(true))
            .catch(() => assert.fail("Rejection not expected here"))
    });

    it('should provide grammar check', function () {
        const jsonRequest = proxyquire('../jsonrequest', {
            'axios': validJsonStub(() => {}),
        });
        getTestApiProvider(jsonRequest).checkGrammar('some words')
            .then(() => assert.ok(true))
            .catch(() => assert.fail("Rejection not expected here"))
    });

    it('should provide grammar check', function () {
        const jsonRequest = proxyquire('../jsonrequest', {
            'axios': validJsonStub(() => {}),
        });
        getTestApiProvider(jsonRequest).checkReadability('some words')
            .then(() => assert.ok(true))
            .catch(() => assert.fail("Rejection not expected here"))
    });

    it('should provide text analyzing', function () {
        const jsonRequest = proxyquire('../jsonrequest', {
            'axios': validJsonStub(() => {}),
        });
        getTestApiProvider(jsonRequest).analyzeText('some words')
            .then(() => assert.ok(true))
            .catch(() => assert.fail("Rejection not expected here"))
    });

    it('should provide language detection', function () {
        const jsonRequest = proxyquire('../jsonrequest', {
            'axios': validJsonStub(() => {}),
        });
        getTestApiProvider(jsonRequest).detectLanguage('some words')
            .then(() => assert.ok(true))
            .catch(() => assert.fail("Rejection not expected here"))
    });

    it('should provide fix suggestions', function () {
        const jsonRequest = proxyquire('../jsonrequest', {
            'axios': validJsonStub(() => {}),
        });
        getTestApiProvider(jsonRequest).suggest('some words')
            .then(() => assert.ok(true))
            .catch(() => assert.fail("Rejection not expected here"))
    });

    it('should provide account usage info with or without period', function () {
        const jsonRequest = proxyquire('../jsonrequest', {
            'axios': validJsonStub(() => {}),
        });
        getTestApiProvider(jsonRequest).getAccountUsage("2019-01-01 00:00:00", new Date())
            .then(() => assert.ok(true))
            .catch(() => assert.fail("Rejection not expected here"))
        getTestApiProvider(jsonRequest).getAccountUsage()
            .then(() => assert.ok(true))
            .catch(() => assert.fail("Rejection not expected here"))
    });

    it('should provide account resource quota info', function () {
        const jsonRequest = proxyquire('../jsonrequest', {
            'axios': validJsonStub(() => {}),
        });
        getTestApiProvider(jsonRequest).getAccountResourceQuota()
            .then(() => assert.ok(true))
            .catch(() => assert.fail("Rejection not expected here"))
    });

    it('should provide dictionary creation', function () {
        const jsonRequest = proxyquire('../jsonrequest', {
            'axios': validJsonStub(() => {}),
        });
        getTestApiProvider(jsonRequest).createDictionary(123, "test")
            .then(() => assert.ok(true))
            .catch(() => assert.fail("Rejection not expected here"))
    });

    it('should provide dictionary update', function () {
        const jsonRequest = proxyquire('../jsonrequest', {
            'axios': validJsonStub(() => {}),
        });
        getTestApiProvider(jsonRequest).updateDictionary(123, "new title")
            .then(() => assert.ok(true))
            .catch(() => assert.fail("Rejection not expected here"))
    });

    it('should provide dictionary listing', function () {
        const jsonRequest = proxyquire('../jsonrequest', {
            'axios': validJsonStub(() => {}),
        });
        getTestApiProvider(jsonRequest).listDictionaries(10, 0)
            .then(() => assert.ok(true))
            .catch(() => assert.fail("Rejection not expected here"))
    });

    it('should provide dictionary removing', function () {
        const jsonRequest = proxyquire('../jsonrequest', {
            'axios': validJsonStub(() => {}),
        });
        getTestApiProvider(jsonRequest).deleteDictionary(123)
            .then(() => assert.ok(true))
            .catch(() => assert.fail("Rejection not expected here"))
    });

    it('should provide exception creation', function () {
        const jsonRequest = proxyquire('../jsonrequest', {
            'axios': validJsonStub(() => {}),
        });
        getTestApiProvider(jsonRequest).addException("Word", 1, "en", 123, "Description", ["one", "two"])
            .then(() => assert.ok(true))
            .catch(() => assert.fail("Rejection not expected here"))
    });

    it('should provide exceptions listing', function () {
        const jsonRequest = proxyquire('../jsonrequest', {
            'axios': validJsonStub(() => {}),
        });
        getTestApiProvider(jsonRequest).listExceptions(50, 0, 123, "test", 1, "en")
            .then(() => assert.ok(true))
            .catch(() => assert.fail("Rejection not expected here"))
    });

    it('should provide exception removing', function () {
        const jsonRequest = proxyquire('../jsonrequest', {
            'axios': validJsonStub(() => {}),
        });
        getTestApiProvider(jsonRequest).deleteException(5, 123)
            .then(() => assert.ok(true))
            .catch(() => assert.fail("Rejection not expected here"))
    });

});
