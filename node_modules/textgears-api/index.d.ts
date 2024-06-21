//
// Copyright (c) 2022, Alexander Yakovlev <insbrook@gmail.com>
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

declare module "textgears-api" {
    /**
     * Base module function
     * @param key
     * @param options
     * @constructor
     */
    function Textgears(
        key: any,
        options?: any
    ): ITextgearsApi;

    namespace Textgears {}
    export default Textgears;
}

/**
 * Text processing options
 */
interface IRequestOptions {
    language?: string,
    endpoint?: string,
    ai?: boolean,
}

/**
 *  Text checking options
 */
interface ICheckRequestOptions extends IRequestOptions {
    rules?: any[];
}

/**
 *  Text transforming options
 */
interface ITransformRequestOptions extends ICheckRequestOptions {
    creativity?: number,
    options?: number,
}

/**
 *  Translation options
 */
interface ITranslateOptions extends ITransformRequestOptions {
    target_language: string
}

/**
 * Api provider interface
 */
interface ITextgearsApi {
    /**
     * Autocorrect text
     * @param text
     * @param options
     */
    translate(text: string | Array<string>, options?: ITranslateOptions): Promise<any>;

    /**
     * Text paraphrasing
     * @param text
     * @param options
     */
    paraphrase(text: string | Array<string>, options?: ITransformRequestOptions): Promise<any>;

    /**
     * Split sentences
     * @param text
     * @param options
     */
    splitSentences(text: string | Array<string>, options?: IRequestOptions): Promise<any>;

    /**
     * Autocorrect text
     * @param text
     * @param options
     */
    correct(text: string, options?: ICheckRequestOptions): Promise<any>;

    /**
     * Spell checking
     * @param text
     * @param options
     */
    checkSpelling(text: string, options?: ICheckRequestOptions): Promise<any>;

    /**
     * Grammar checking
     * @param text
     * @param options
     */
    checkGrammar(text: string, options?: ICheckRequestOptions): Promise<any>;

    /**
     * Calculate text readability
     * @param text
     * @param options
     */
    checkReadability(text: string, options?: IRequestOptions): Promise<any>;

    /**
     * Check grammar + calc text metrics
     * @param text
     * @param options
     */
    analyzeText(text: string, options?: ICheckRequestOptions): Promise<any>;

    /**
     * Suggest corrected text
     * @param text
     * @param options
     */
    suggest(text: string, options?: IRequestOptions): Promise<any>;

    /**
     * Detect text language
     * @param text
     */
    detectLanguage(text: string): Promise<any>;

    /**
     * Get API usage stats grouped by date
     * @param periodStart
     * @param periodEnd
     */
    getAccountUsage(periodStart?: number | string | Date, periodEnd?: number | string | Date): Promise<any>;

    /**
     *  Get a list of available API quota
     */
    getAccountResourceQuota(): Promise<any>;

    /**
     * Create a group for exclusions
     * @param customId
     * @param title
     */
    createDictionary(customId?: string, title?: string): Promise<any>;

    /**
     * Update a group of exclusions
     * @param customId
     * @param title
     */
    updateDictionary(customId?: string, title?: string): Promise<any>;

    /**
     * List groups of exclusions
     * @param limit
     * @param offset
     */
    listDictionaries(limit: number, offset?: number): Promise<any>;

    /**
     * Remove a group of exclusions
     * @param customId
     */
    deleteDictionary(customId?: string): Promise<any>;

    /**
     * Add an exception
     * @param text
     * @param type
     * @param lang
     * @param dictionaryId
     * @param description
     * @param suggestions
     */
    addException(text: string, type: number, lang: string, dictionaryId?: string, description?: string, suggestions?: Array<string>): Promise<any>;

    /**
     * List exceptions
     * @param limit
     * @param offset
     * @param dictionaryId
     * @param text
     * @param type
     * @param lang
     */
    listExceptions(limit: number, offset?: number, dictionaryId?: string, text?: string, type?: number, lang?: string): Promise<any>;

    /**
     * Remove exception
     * @param id
     * @param dictionaryId
     */
    deleteException(id: string, dictionaryId?: string): Promise<any>;
}
