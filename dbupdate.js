const con = require('./dbconnect');
todaysArrayNames = require('./module').todaysArrayNames;
todaysArraySurnames = require('./module').todaysArraySurnames;
todaysArrayEmails = require('./module').todaysArrayEmails;

const disconnect = function (){con.end(function(err) {
    if (err) {
        return console.log('error:' + err.message);
    }
    console.log('Closing the database connection.');
})};

const mysqlConnect = function (){con.connect(function(err) {
    if (err) throw err;
    for (i=0; i < todaysArrayNames.length; i++) {
        var sql = `INSERT INTO participants (firstName, lastName, email, orgId) VALUES ('${todaysArrayNames[i]}', '${todaysArraySurnames[i]}', '${todaysArrayEmails[i]}', '1')`;
        console.log(i + `${todaysArrayNames[i]}', '${todaysArraySurnames[i]}', '${todaysArrayEmails[i]}'`);
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });
    }
    console.log("new participants have been inserted");
    disconnect();
})};

module.exports = mysqlConnect;