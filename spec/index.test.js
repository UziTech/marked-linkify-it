import { marked } from 'marked';
import markedLinkifyIt from '../src/index.js';

describe('linkify-it', () => {
  beforeEach(() => {
    marked.setOptions(marked.getDefaults());
  });

  test('no options', () => {
    marked.use(markedLinkifyIt());
    expect(marked('example.com')).toEqual(expect.stringMatching('href="http://example.com"'));
  });

  test('add schemas', () => {
    marked.use(markedLinkifyIt({ 'test:': 'http:' }));
    expect(marked('test://example.com')).toBe('<p><a href="test://example.com">test://example.com</a></p>\n');
  });

  test('add options', () => {
    marked.use(markedLinkifyIt({}, { fuzzyLink: false }));
    expect(marked('example.com')).toBe('<p>example.com</p>\n');
  });

  test('only domain', () => {
    marked.use(markedLinkifyIt({}, { tlds: 'onion' }));
    expect(marked('example.com')).toBe('<p>example.com</p>\n');
    expect(marked('example.onion')).toEqual(expect.stringMatching('href="http://example.onion"'));
  });

  test('add domain', () => {
    marked.use(markedLinkifyIt({}, { tlds: 'onion', tldsKeepOld: true }));
    expect(marked('example.com')).toEqual(expect.stringMatching('href="http://example.com"'));
    expect(marked('example.onion')).toEqual(expect.stringMatching('href="http://example.onion"'));
  });

  test('brackets', () => {
    marked.use(markedLinkifyIt());
    expect(marked('<example.com>')).toBe('<p><a href="http://example.com">example.com</a></p>\n');
  });

  test('not first token', () => {
    marked.use(markedLinkifyIt());
    expect(marked('at example.com')).toBe('<p>at <a href="http://example.com">example.com</a></p>\n');
  });

  test('not first token with brackets', () => {
    marked.use(markedLinkifyIt());
    expect(marked('at <example.com>')).toBe('<p>at <a href="http://example.com">example.com</a></p>\n');
  });

  test('integration with other tokens', () => {
    marked.use(markedLinkifyIt());
    expect(marked('# **example.com**')).toBe('<h1><strong><a href="http://example.com">example.com</a></strong></h1>\n');
  });
});
