// GoogleSheet parser 0.0.1
// Author: Eugene Marikhin
// Date: 20.01.2021

const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = require('./config/client_secret.json'); // the file saved above
const mysqlConnect = require('./dbupdate');
var todaysArrayNames = require('./module').todaysArrayNames;
var todaysArrayEmails = require('./module').todaysArrayEmails;
var todaysArraySurnames = require('./module').todaysArraySurnames;

const doc = new GoogleSpreadsheet('1_VlQq7TdLq4dONxFJeyB8b-o5Jk6QUL0P-akhZdxSwU');
var participantsArray = [];

async function accessSpreadsheet() {
    await doc.useServiceAccountAuth({
        client_email: creds.client_email,
        private_key: creds.private_key,
    });

    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    const rows = await (sheet.getRows)({
        offset: 0
    });

    rows.forEach(row => {
        participantsArray = participantsArray.concat(row)
    })

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '.' + mm + '.' + yyyy;

    for (i=0;i<participantsArray.length;i++) {
        if (participantsArray[i]._rawData[4] === today) {
            // console.log(participantsArray[i]._rawData)
            todaysArrayNames.push(participantsArray[i]._rawData[0])
            todaysArraySurnames.push(participantsArray[i]._rawData[1])
            todaysArrayEmails.push(participantsArray[i]._rawData[2]);
        }
    }
    mysqlConnect();
}

accessSpreadsheet();