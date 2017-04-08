const slugify = require("underscore.string/slugify");

class NormalizeHelper {

    static normalize(str) {
        let norm = slugify(str);
        return norm;
    }
}

module.exports = NormalizeHelper;