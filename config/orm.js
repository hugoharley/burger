var connection = require("../config/connection.js");

function printQM(num) {
    var arr = [];
    for (var i = 0; i < num; i++) {
        arr.push("?");
    }
    return arr.toString();
}

function objToSql(ob) {
    var arr = [];
    for (var key in ob) {
        var value = ob[key];
        if (Object.hasOwnProperty.call(ob, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);
        }
    }
    return arr.toString();
}

var orm = {
    selectAll: function (tableInput, cb) {
        var querystring = "SELECT * FROM " + tableInput + ";";
        connection.query(querystring, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    insertOne: function (table, cols, vals, cb) {
        var querystring = "INSTER INTO " + table;
        querystring += " (";
        querystring += cols.toString();
        querystring += ") ";
        querystring += "VALUES (";
        querystring += printQM(vals.length);
        querystring += ") ";
        console.log(querystring);
        connection.query(querystring, vals, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    updateOne: function (table, objColVals, condition, cb) {
        var querystring = "UPDATE " + table;
        querystring += " SET ";
        querystring += objToSql(objColVals);
        querystring += " WHERE ";
        querystring += condition;
        console.log(querystring);
        connection.query(querystring, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    }
};




//This is at the end
module.exports = orm;