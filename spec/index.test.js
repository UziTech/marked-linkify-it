const { marked } = require('marked');
const linkify = require('../');

describe('linkify-it', () => {
  beforeEach(() => {
    marked.setOptions(marked.getDefaults());
  });

  test('no options', () => {
    marked.use(linkify());
    expect(marked('example.com')).toEqual(expect.stringMatching('href="http://example.com"'));
  });

  test('add schemas', () => {
    marked.use(linkify({ 'test:': 'http:' }));
    expect(marked('test://example.com')).toBe('<p><a href="test://example.com">test://example.com</a></p>\n');
  });

  test('add options', () => {
    marked.use(linkify({}, { fuzzyLink: false }));
    expect(marked('example.com')).toBe('<p>example.com</p>\n');
  });

  test('only domain', () => {
    marked.use(linkify({}, { tlds: 'onion' }));
    expect(marked('example.com')).toBe('<p>example.com</p>\n');
    expect(marked('example.onion')).toEqual(expect.stringMatching('href="http://example.onion"'));
  });

  test('add domain', () => {
    marked.use(linkify({}, { tlds: 'onion', tldsKeepOld: true }));
    expect(marked('example.com')).toEqual(expect.stringMatching('href="http://example.com"'));
    expect(marked('example.onion')).toEqual(expect.stringMatching('href="http://example.onion"'));
  });

  test('brackets', () => {
    marked.use(linkify());
    expect(marked('<example.com>')).toBe('<p><a href="http://example.com">example.com</a></p>\n');
  });

  test('not first token', () => {
    marked.use(linkify());
    expect(marked('at example.com')).toBe('<p>at <a href="http://example.com">example.com</a></p>\n');
  });

  test('not first token with brackets', () => {
    marked.use(linkify());
    expect(marked('at <example.com>')).toBe('<p>at <a href="http://example.com">example.com</a></p>\n');
  });

  test('integration with other tokens', () => {
    marked.use(linkify());
    expect(marked('# **example.com**')).toBe('<h1 id="examplecom"><strong><a href="http://example.com">example.com</a></strong></h1>\n');
  });
});
