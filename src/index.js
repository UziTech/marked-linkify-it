module.exports = function(schemas = {}, options = {}) {
  const inlineText = getInlineTextTokenizer();
  const linkify = require('linkify-it')(schemas, options);
  addTlds(linkify, options);

  return {
    tokenizer: {
      autolink(src) {
        const match = linkify.match(src);

        if (!match || !match.length) {
          return;
        }

        const link = match[0];

        let raw;
        if (link.index === 0) {
          raw = link.raw;
        } else if (link.index === 1 && src.charAt(0) === '<' && src.charAt(link.lastIndex) === '>') {
          raw = `<${link.raw}>`;
        }

        if (raw) {
          return {
            type: 'link',
            raw,
            text: link.text,
            href: link.url,
            tokens: [
              {
                type: 'text',
                raw: link.text,
                text: link.text
              }
            ]
          };
        }
      },
      inlineText(src, ...args) {
        const match = linkify.match(src);
        if (match && match.length > 0) {
          src = src.substring(0, match[0].index);
        }
        return inlineText.call(this, src, ...args);
      }
    }
  };
};

function getInlineTextTokenizer() {
  let marked;
  try {
    marked = require('marked');
  } catch (ex) {
    // istanbul ignore next
    ex.message = 'Unable to load "marked". Do you have it installed as a dependency?\n' + ex.message;
    // istanbul ignore next
    throw ex;
  }

  let inlineText;
  try {
    inlineText = marked.Tokenizer.prototype.inlineText;
    // istanbul ignore if
    if (typeof inlineText !== 'function') {
      throw new Error(`"inlineText" is type of "${typeof inlineText}"`);
    }
  } catch (ex) {
    // istanbul ignore next
    ex.message = 'No "inlineText" tokenizer in installed marked version. Is the installed version of "marked" valid?\n' + ex.message;
    // istanbul ignore next
    throw ex;
  }

  return inlineText;
}

function addTlds(linkify, options) {
  const tlds = options.tlds;
  delete options.tlds;
  const tldsKeepOld = options.tldsKeepOld;
  delete options.tldsKeepOld;

  if (tlds) {
    linkify.tlds(tlds, tldsKeepOld);
  }
}
