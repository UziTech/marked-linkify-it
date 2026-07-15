import { LinkifyIt } from 'linkify-it';

const defaultOptions = {
  fuzzyLink: true,
};

export default function markedLinkifyIt(options = {}) {
  const {
    tlds,
    tldsKeepOld,
    schemas,
    ...linkifyItOptions
  } = options;
  const linkify = new LinkifyIt({ ...defaultOptions, ...linkifyItOptions });
  addTlds(linkify, tlds, tldsKeepOld);
  addSchemas(linkify, schemas);

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
        if (this.lexer.state.inLink) {
          return;
        }

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
              text: link.text,
            },
          ],
        };
      },
    }],
  };
}

function getNextLink(linkify, src) {
  const match = linkify.match(src);

  if (!match || !match.length) {
    return;
  }

  return match[0];
}

function addTlds(linkify, tlds, keepOld) {
  if (tlds) {
    linkify.tlds(tlds, keepOld);
  }
}

function addSchemas(linkify, schemas) {
  if (schemas) {
    for (const [schema, config] of Object.entries(schemas)) {
      linkify.add(schema, config);
    }
  }
}
