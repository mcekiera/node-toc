var toc = require('../src/node-toc');

describe('node-tco', function () {

    it('method isCss should recognize css files', function () {
        var css = './test/test.css';
        var js = './test/node-toc.spec.js';
        var dir = './test';
        expect(toc.isCss(css)).toBe(true);
        expect(toc.isCss(js)).toBe(false);
        expect(toc.isCss(dir)).toBe(false);
    });

    it('method exist should determine if file exists', function () {});
});
