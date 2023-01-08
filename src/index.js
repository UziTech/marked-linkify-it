import LinkifyIt from 'linkify-it';

export default function markedLinkifyIt(schemas = {}, options = {}) {
  const linkify = new LinkifyIt(schemas, options);
  addTlds(linkify, options);

  return {
    extensions: [{
      name: 'autolink',
      level: 'inline',
      start: (src) => {
        const link = getNextLink(linkify, src);

        if (!link) {
          return;
        }

        return link.index;
      },
      tokenizer(src) {
        const link = getNextLink(linkify, src);

        if (!link) {
          return;
        }

        let raw;
        if (link.index === 0) {
          raw = link.raw;
        } else if (link.index === 1 && src.charAt(0) === '<' && src.charAt(link.lastIndex) === '>') {
          raw = `<${link.raw}>`;
        }

        if (!raw) {
          return;
        }

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
    }]
  };
}

function getNextLink(linkify, src) {
  const match = linkify.match(src);

  if (!match || !match.length) {
    return;
  }

  return match[0];
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
