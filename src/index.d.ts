import type LinkifyIt from "linkify-it";
import type { MarkedExtension } from "marked";

export default function markedLinkifyIt(
  schemas?: LinkifyIt.SchemaRules,
  options?: LinkifyIt.Options & {
    tlds?: string | string[];
    tldsKeepOld?: boolean;
  }
): MarkedExtension;
