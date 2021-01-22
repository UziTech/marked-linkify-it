const {inlineText} = require("./helpers.js");

module.exports = function (schemas = {}, options = {}) {

	const linkify = require("linkify-it")(schemas, options);

	const tlds = options.tlds;
	delete options.tlds;
	const tldsKeepOld = options.tldsKeepOld;
	delete options.tldsKeepOld;

	if (tlds) {
		linkify.tlds(tlds, tldsKeepOld);
	}

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
				} else if (link.index === 1 && src.charAt(0) === "<" && src.charAt(link.lastIndex) === ">") {
					raw = `<${link.raw}>`;
				}

				if (raw) {
					return {
						type: "link",
						raw,
						text: link.text,
						href: link.url,
						tokens: [
							{
								type: "text",
								raw: link.text,
								text: link.text,
							},
						],
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
		},
	};
};
