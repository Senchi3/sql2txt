const sqlite3 = require('sqlite3');
const fs  = require('fs')
const db = new sqlite3.Database('./db/blocdenotas.db');

//Using SQLite each() Method Instead of forEach()
db.each("SELECT title, body, date FROM notes",
    (error, row) => {
        let data = row.date + " - \'" + row.title + "\'\n\n" + row.body;

        // let parsedTitle = row.title.replace(/\//g, "-");
        // let parsedTitle = row.title.replace("[^a-zA-Z0-9\\.\\\ -]", "_");
        let parsedTitle = row.title.replace(/[^0-9A-Z\ ]+/gi,"_");
        console.log(parsedTitle);
        let parsedDate = row.date.replace(/\//g, "-").split("-");

        fs.writeFile('output/' + parsedDate[2] + '-' + parsedDate[1] + '-' + parsedDate[0] + ' - ' + parsedTitle + '.txt', data, function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
          
        
    }
);
