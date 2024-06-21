//
// Copyright (c) 2023, Alexander Yakovlev <insbrook@gmail.com>
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
 * @fileOverview Textgears API methods provider
 * @author Alexander Yakovlev <insbrook@gmail.com>
 */

function Api(request, key, options) {
    this.request = request || {};
    this.options = options || {};
    this.key = key;
}

/**
 * Text validation function. Called before any text checking request
 * @param {string} text
 */
Api.prototype.validateText = function (text) {
    if (!text) {
        throw new Error('Text to check cannot be empty');
    }
};

/**
 * Check a text
 * @param {string} checkMethod
 * @param {string} text
 * @param {object} requestOptions
 * @returns {Promise}
 */
Api.prototype._checkText = function(checkMethod, text, requestOptions) {
    requestOptions = requestOptions || {};
    this.validateText(text);
    return this.request(
        this.options.endpoint + '/' + checkMethod,
        this.key,
        {
            text: text,
            language: requestOptions.language || this.options.language,
            ai: requestOptions.ai || this.options.ai,
            rules: requestOptions.rules || this.options.rules || '',
        }
    );
};
Api.prototype._transformText = function(checkMethod, text, requestOptions) {
    requestOptions = requestOptions || {};
    this.validateText(text);
    requestOptions.text = text;
    return this.request(
        this.options.endpoint + '/' + checkMethod,
        this.key,
        requestOptions
    );
};

/**
 * Autocorrection check
 * @param {string} text
 * @param {object} requestOptions
 * @returns {Promise}
 */
Api.prototype.correct = function(text, requestOptions) {
    return this._checkText('correct', text, requestOptions);
};

/**
 * Paraphrase text
 * @param {string} text
 * @param {object} requestOptions
 * @returns {Promise}
 */
Api.prototype.paraphrase = function(text, requestOptions) {
    return this._transformText('paraphrase', text, requestOptions);
};

/**
 * Translate from one language to another
 * @param {string} text
 * @param {object} requestOptions
 * @returns {Promise}
 */
Api.prototype.translate = function(text, requestOptions) {
    return this._transformText('translate', text, requestOptions);
};

/**
 * Split text into sentences
 * @param {string} text
 * @param {object} requestOptions
 * @returns {Promise}
 */
Api.prototype.splitSentences = function(text, requestOptions) {
    return this._transformText('split', text, requestOptions);
};

/**
 * Spell check
 * @param {string} text
 * @param {object} requestOptions
 * @returns {Promise}
 */
Api.prototype.checkSpelling = function(text, requestOptions) {
    return this._checkText('spelling', text, requestOptions);
};

/**
 * Grammar check
 * @param {string} text
 * @param {object} requestOptions
 * @returns {Promise}
 */
Api.prototype.checkGrammar = function(text, requestOptions) {
    return this._checkText('grammar', text, requestOptions);
};

/**
 * Grammar check
 * @param {string} text
 * @param {object} requestOptions
 * @returns {Promise}
 */
Api.prototype.checkReadability = function(text, requestOptions) {
    return this._checkText('readability', text, requestOptions);
};

/**
 * Analyze text
 * @param {string} text
 * @param {object} requestOptions
 * @returns {Promise}
 */
Api.prototype.analyzeText = function(text, requestOptions) {
    return this._checkText('analyze', text, requestOptions);
};

/**
 * Suggest corrected text version
 * @param {string} text
 * @param {object} requestOptions
 * @returns {Promise}
 */
Api.prototype.suggest = function(text, requestOptions) {
    return this._checkText('suggest', text, requestOptions);
};

/**
 * Suggest corrected text version
 * @param {string} text
 * @param {object} requestOptions
 * @returns {Promise}
 */
Api.prototype.detectLanguage = function(text, requestOptions) {
    return this._checkText('detect', text, requestOptions);
};

/**
 * Get usage stats by day
 * @param period_start
 * @param period_end
 * @returns {Promise}
 */
Api.prototype.getAccountUsage = function (period_start, period_end) {
    let periodFilter = {};
    if (period_start) {
        periodFilter.period_start = (new Date(period_start)).toISOString()
    }
    if (period_end) {
        periodFilter.period_end = (new Date(period_end)).toISOString()
    }
    return this.request(
        this.options.endpoint + '/account/usage',
        this.key,
        periodFilter
    )
};

/**
 * Get resource quota info
 * @returns {Promise}
 */
Api.prototype.getAccountResourceQuota = function () {
    return this.request(this.options.endpoint + '/account/resourcequota', this.key);
};

/**
 * Create a group for exclusions
 * @returns {Promise}
 */
Api.prototype.createDictionary = function (customId, title) {
    return this.request(
        this.options.endpoint + '/custom/createDictionary',
        this.key,
        {
            id: customId,
            title: title,
        }
    );
};

/**
 * Update a group of exclusions
 * @returns {Promise}
 */
Api.prototype.updateDictionary = function (customId, title) {
    return this.request(
        this.options.endpoint + '/custom/updateDictionary',
        this.key,
        {
            id: customId,
            title: title,
        }
    );
};

/**
 * List groups of exclusions
 * @returns {Promise}
 */
Api.prototype.listDictionaries = function (limit, offset) {
    return this.request(
        this.options.endpoint + '/custom/listDictionaries',
        this.key,
        {
            limit: limit || 25,
            offset: offset || 0,
        }
    );
};

/**
 * Remove a group of exclusions
 * @returns {Promise}
 */
Api.prototype.deleteDictionary = function (customId) {
    return this.request(
        this.options.endpoint + '/custom/deleteDictionary',
        this.key,
        {
            id: customId,
        }
    );
};

/**
 * Add an exception
 * @returns {Promise}
 */
Api.prototype.addException = function (text, type, lang, dictionaryId, description, suggestions) {
    return this.request(
        this.options.endpoint + '/custom/addException',
        this.key,
        {
            text: text,
            type: type,
            lang: lang,
            dictionary_id: dictionaryId || null,
            description: description || null,
            suggestions: suggestions || null
        }
    );
};

/**
 * List exceptions
 * @returns {Promise}
 */
Api.prototype.listExceptions = function (limit, offset, dictionaryId, text, type, lang) {
    let filter = {
        dictionary_id: dictionaryId || null,
        limit: limit,
        offset: offset,
    };

    if (type) {
        filter.type = type;
    }
    if (text) {
        filter.text = text;
    }
    if (lang) {
        filter.lang = lang;
    }

    return this.request(
        this.options.endpoint + '/custom/listExceptions',
        this.key,
        filter
    );
};

/**
 * Remove exception
 * @returns {Promise}
 */
Api.prototype.deleteException  = function (id, dictionaryId) {
    return this.request(
        this.options.endpoint + '/custom/deleteException',
        this.key,
        {
            id: id,
            dictionary_id: dictionaryId || null,
        }
    );
};

module.exports = Api;
