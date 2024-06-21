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

/**
 * @fileOverview Basic http json API routines
 * @author Alexander Yakovlev <insbrook@gmail.com>
 */

const axios = require('axios');

/**
 * @param {string} url  API url
 * @param {object} key  API key
 * @param {object} data An object containing request
 * @returns {Promise}
 */
module.exports = function (url, key, data) {
    return new Promise(function(resolve, reject) {
        data = data || {};
        data.key = key;
        data.poweredBy = 'textgears-api';
        // Do async job
        const requestOptions = {
            method: 'post',
            url: url,
            headers: {
                'Content-Type': 'application/vnd.api+json',
            },
            data: data || {},
            timeout: 10000,
            responseType: 'json',
            maxRedirects: 3
        };

        axios.request(requestOptions)
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    reject(error.response.data);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    reject('Connection error');
                } else {
                    // Something happened in setting up the request that triggered an Error
                    reject(error.message);
                }
                reject(error);
            });
    });
};
