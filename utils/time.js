
module.exports = {
    ISO2String: function (obj) {
        var obj_str = obj.toISOString();
        obj_str = obj_str.substring(0, 19).replace('T', ' ');

        return obj_str
    }
};