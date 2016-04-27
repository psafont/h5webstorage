var catharsis = require('catharsis');

module.exports = function associateTypeTransform() {
	return function (doc, tag, value) {
		if (tag.name && doc.parameters && !tag.type) {
			var tsParamInfo = doc.parameters.filter(function (paramData) {
				return paramData.startsWith(tag.name);
			})[0];

			var parts = tsParamInfo.split(':');
			if (parts.length == 2) {
				tag.typeExpression = parts[1].trim();
				tag.type = catharsis.parse("{" + parts[1].trim() + "}", { jsdoc: true });
				parts[0].endsWith('?') && (tag.optional = true);
			}
		}
		return value;
	}
}