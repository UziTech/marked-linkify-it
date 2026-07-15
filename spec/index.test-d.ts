import { marked } from 'marked';
import markedLinkifyIt from '../src/index.js';

const options = {
  tlds: ['onion'],
  tldsKeepOld: true,
  fuzzyLink: true,
  fuzzyEmail: true,
  fuzzyIP: true,
  '---': true,
  urlAuth: true,
  maxLength: 10000,
  schemas: {},
};

marked.use(markedLinkifyIt(options));

marked.parse('http://example.com');
