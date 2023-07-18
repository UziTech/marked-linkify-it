import type LinkifyIt from "linkify-it";

export default function markedLinkifyIt(
  schemas?: LinkifyIt.SchemaRules,
  options?: LinkifyIt.Options & {
    tlds?: string | string[];
    tldsKeepOld?: boolean;
  }
): import("marked").marked.MarkedExtension;
