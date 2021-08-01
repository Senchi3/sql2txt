const sqlite3 = require('sqlite3');
const fs  = require('fs')
const db = new sqlite3.Database('./db/blocdenotas.db');

//Using SQLite each() Method Instead of forEach()
db.each("SELECT title, body, date FROM notes",
    (error, row) => {
        let data = row.date + " " + row.title + " " + row.body;

        let parsedTitle = row.title.replace(/\//g, "-");
        let parsedTitleAdv = row.title.replace("[^a-zA-Z0-9\\.\\\ -]", "_");
        console.log(parsedTitleAdv);
        let parsedDate = row.date.replace(/\//g, "-").split("-");

        fs.writeFile('output/' + parsedDate[2] + '-' + parsedDate[1] + '-' + parsedDate[0] + ' - ' + parsedTitleAdv + '.txt', data, function (err) {
            if (err) throw err;
            console.log('Saved!');
          });
          
        
    }
);
