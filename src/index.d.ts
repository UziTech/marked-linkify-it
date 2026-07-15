import type { LinkifyOptions, SchemaOpts } from 'linkify-it';
import type { MarkedExtension } from 'marked';

export default function markedLinkifyIt(
  options?: LinkifyOptions & {
    tlds?: string | string[];
    tldsKeepOld?: boolean;
    schemas?: Record<string, SchemaOpts | null>;
  },
): MarkedExtension;
