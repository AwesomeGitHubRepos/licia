/* A tiny JavaScript debugging utility.
 *
 * |Name  |Desc                           |
 * |------|-------------------------------|
 * |name  |Namespace                      |
 * |return|Function to print decorated log|
 */

/* example
 * const d = debug('test');
 * d('doing lots of uninteresting work');
 * d.enabled = false;
 */

/* module
 * env: node browser
 * test: manual
 */

/* typescript
 * export declare function debug(name: string): any;
 */

_('toArr now format ms isBrowser strHash ansiColor');

exports = function(name) {
    let prevTime;

    function debug() {
        if (!debug.enabled) return;

        const args = toArr(arguments);

        const cur = now();
        const duration = ms(cur - (prevTime || cur));
        prevTime = cur;

        const content = format.apply(null, args);
        const color = debug.color;

        /* eslint-disable no-console */
        if (isBrowser) {
            const style = 'color:' + color;
            const inherit = 'color:inherit';
            console.log(
                '%c' + name + ' %c' + content + ' %c+' + duration,
                style,
                inherit,
                style
            );
        } else {
            console.log(
                ansiColor[color](name) +
                    ': ' +
                    content +
                    ansiColor[color](' +' + duration)
            );
        }
    }

    debug.enabled = true;
    debug.color = selectColor(name);

    return debug;
};

const browserColors = [
    '#0000CC',
    '#0000FF',
    '#0033CC',
    '#0033FF',
    '#0066CC',
    '#0066FF',
    '#0099CC',
    '#0099FF',
    '#00CC00',
    '#00CC33',
    '#00CC66',
    '#00CC99',
    '#00CCCC',
    '#00CCFF',
    '#3300CC',
    '#3300FF',
    '#3333CC',
    '#3333FF',
    '#3366CC',
    '#3366FF',
    '#3399CC',
    '#3399FF',
    '#33CC00',
    '#33CC33',
    '#33CC66',
    '#33CC99',
    '#33CCCC',
    '#33CCFF',
    '#6600CC',
    '#6600FF',
    '#6633CC',
    '#6633FF',
    '#66CC00',
    '#66CC33',
    '#9900CC',
    '#9900FF',
    '#9933CC',
    '#9933FF',
    '#99CC00',
    '#99CC33',
    '#CC0000',
    '#CC0033',
    '#CC0066',
    '#CC0099',
    '#CC00CC',
    '#CC00FF',
    '#CC3300',
    '#CC3333',
    '#CC3366',
    '#CC3399',
    '#CC33CC',
    '#CC33FF',
    '#CC6600',
    '#CC6633',
    '#CC9900',
    '#CC9933',
    '#CCCC00',
    '#CCCC33',
    '#FF0000',
    '#FF0033',
    '#FF0066',
    '#FF0099',
    '#FF00CC',
    '#FF00FF',
    '#FF3300',
    '#FF3333',
    '#FF3366',
    '#FF3399',
    '#FF33CC',
    '#FF33FF',
    '#FF6600',
    '#FF6633',
    '#FF9900',
    '#FF9933',
    '#FFCC00',
    '#FFCC33'
];

const terminalColors = [
    'black',
    'red',
    'green',
    'yellow',
    'blue',
    'magenta',
    'cyan',
    'white',
    'gray',
    'grey',
    'blackBright',
    'redBright',
    'greenBright',
    'yellowBright',
    'blueBright',
    'magentaBright',
    'cyanBright',
    'whiteBright'
];

function selectColor(name) {
    const hash = strHash(name);

    if (isBrowser) {
        return browserColors[hash % browserColors.length];
    } else {
        return terminalColors[hash % terminalColors.length];
    }
}
