var register = function (Handlebars) {
    var helpers = {
        // put all of your helpers inside this object
        'for': function (from, to, incr, block) {
            var accum = '';
            for (var i = from; i < to; i += incr)
                accum += block.fn(i);
            return accum;
        },
        'incHelper': function (i) {
            return i + 1;
        },
        'categoryHelper': function (category) {
            var categoryName = '';
            if (category == 'grid-connected') {
                categoryName = 'Grid Connected';
            } else if (category == 'solar-offgrid') {
                categoryName = 'Solar Offgrid';
            }
            return categoryName;
        },
        'dateHelper': function (date) {
            var outputDate = date.toISOString().substring(0, 10);
            return outputDate;
        },
        'ifEquals': function (value, match) {
            if (value == match) {
                return true;
            } else {
                return false;
            }
        },
        'languageHelper': function (lang) {
            if (lang == 'EN') {
                return 'Currently showing data in English Mode';
            } else {
                return 'Currently showing data in Hindi Mode';
            }
        },
        'dateHelper1': function (date) {
            console.log('====', new Date(date).toISOString().substring(0, 10));
            return new Date(date).toISOString().substring(0, 10);
        },
        'ifCond': function (v1, v2, options) {
            if (v1 === v2) {
                return options.fn(this);
            }
            return options.inverse(this);
        }
    };

    if (Handlebars && typeof Handlebars.registerHelper === "function") {
        // register helpers
        for (var prop in helpers) {
            Handlebars.registerHelper(prop, helpers[prop]);
        }
    } else {
        // just return helpers object if we can't register helpers here
        return helpers;
    }

};

module.exports.register = register;
module.exports.helpers = register(null);  