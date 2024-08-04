import { marked } from 'marked';
import markedLinkifyIt from '../src/index.js';

const options = {};
const schemas = {};

marked.use(markedLinkifyIt(options, schemas));

marked.parse('http://example.com');
