
/**
 * imports
 */
import Url from 'url';
import Path from 'path';
import _merge from '@webqit/util/obj/merge.js';
import _after from '@webqit/util/str/after.js';
import _isObject from '@webqit/util/js/isObject.js';
import * as DotJson from '@webqit/backpack/src/dotfiles/DotJson.js';
import Minimatch from 'minimatch';

/**
 * Reads entries from file.
 * 
 * @param object    layout
 * 
 * @return object
 */
export async function read(layout = {}) {
    const config = DotJson.read(Path.join(layout.ROOT || '', './.webflo/config/headers.json'));
    return _merge({
        entries: [],
    }, config);
};

/**
 * Writes entries to file.
 * 
 * @param object    config
 * @param object    layout
 * 
 * @return void
 */
export async function write(config, layout = {}) {
    DotJson.write(config, Path.join(layout.ROOT || '', './.webflo/config/headers.json'));
};

/**
 * @match
 */
export async function match(url, layout = {}) {
    if (!_isObject(url)) {
        url = Url.parse(url);
    }
    return ((await read(layout)).entries || []).filter(header => {
        var matcher = Minimatch.Minimatch(header.url, {dot: true});
        var regex = matcher.makeRe();
        var rootMatch = url.pathname.split('/').filter(seg => seg).map(seg => seg.trim()).reduce((str, seg) => str.endsWith(' ') ? str : ((str = str + '/' + seg) && str.match(regex) ? str + ' ' : str), '');
        return rootMatch.endsWith(' ');
    });
};

/**
 * Configures entries.
 * 
 * @param object    config
 * @param object    choices
 * @param object    layout
 * 
 * @return Array
 */
export async function questions(config, choices = {}, layout = {}) {

    // Questions
    return [
        {
            name: 'entries',
            type: 'recursive',
            controls: {
                name: 'header',
            },
            initial: config.entries,
            questions: [
                {
                    name: 'url',
                    type: 'text',
                    message: 'Enter URL',
                    validation: ['important'],
                },
                {
                    name: 'name',
                    type: 'text',
                    message: 'Enter header name',
                    validation: ['important'],
                },
                {
                    name: 'value',
                    type: 'text',
                    message: 'Enter header value',
                    validation: ['important'],
                },
            ],
        },

    ];
};
