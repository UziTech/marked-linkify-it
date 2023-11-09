import { Marked } from 'marked';
import markedLinkifyIt from '../src/index.js';

describe('linkify-it', () => {
  test('no options', () => {
    const marked = new Marked(markedLinkifyIt());
    expect(marked.parse('example.com')).toEqual(expect.stringMatching('href="http://example.com"'));
  });

  test('add schemas', () => {
    const marked = new Marked(markedLinkifyIt({ 'test:': 'http:' }));
    expect(marked.parse('test://example.com')).toBe('<p><a href="test://example.com">test://example.com</a></p>\n');
  });

  test('add options', () => {
    const marked = new Marked(markedLinkifyIt({}, { fuzzyLink: false }));
    expect(marked.parse('example.com')).toBe('<p>example.com</p>\n');
  });

  test('only domain', () => {
    const marked = new Marked(markedLinkifyIt({}, { tlds: 'onion' }));
    expect(marked.parse('example.com')).toBe('<p>example.com</p>\n');
    expect(marked.parse('example.onion')).toEqual(expect.stringMatching('href="http://example.onion"'));
  });

  test('add domain', () => {
    const marked = new Marked(markedLinkifyIt({}, { tlds: 'onion', tldsKeepOld: true }));
    expect(marked.parse('example.com')).toEqual(expect.stringMatching('href="http://example.com"'));
    expect(marked.parse('example.onion')).toEqual(expect.stringMatching('href="http://example.onion"'));
  });

  test('brackets', () => {
    const marked = new Marked(markedLinkifyIt());
    expect(marked.parse('<example.com>')).toBe('<p><a href="http://example.com">example.com</a></p>\n');
  });

  test('not first token', () => {
    const marked = new Marked(markedLinkifyIt());
    expect(marked.parse('at example.com')).toBe('<p>at <a href="http://example.com">example.com</a></p>\n');
  });

  test('not first token with brackets', () => {
    const marked = new Marked(markedLinkifyIt());
    expect(marked.parse('at <example.com>')).toBe('<p>at <a href="http://example.com">example.com</a></p>\n');
  });

  test('integration with other tokens', () => {
    const marked = new Marked(markedLinkifyIt());
    expect(marked.parse('# **example.com**')).toBe('<h1><strong><a href="http://example.com">example.com</a></strong></h1>\n');
  });

  test('not convert link text', () => {
    const marked = new Marked(markedLinkifyIt());
    expect(marked.parse('[https://example1.com](https://example2.com)')).toBe('<p><a href="https://example2.com">https://example1.com</a></p>\n');
  });
});
