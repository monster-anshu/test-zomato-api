const mysql = require("mysql");
const conn = mysql.createConnection({
  host: "db4free.net",
  user: "monster2312",
  database: "my_database2312",
  password: "$-Ay@@kwx6SRKV+",
  multipleStatements: true,
});

const connectDB = () => {
  conn.connect((error) => {
    if (error) throw error;
    console.log("Conneted with the mySql Database");
  });

  const createTables = `
  CREATE TABLE IF NOT EXISTS CATOGARIES (
    SNO int(11) NOT NULL AUTO_INCREMENT,
    NAME varchar(50) NOT NULL,
    PRIMARY KEY (SNO),
    UNIQUE KEY NAME (NAME)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  
  CREATE TABLE IF NOT EXISTS ITEMS (
    SNO int(11) NOT NULL AUTO_INCREMENT,
    NAME varchar(50) NOT NULL,
    CATOGARY varchar(50) NOT NULL,
    Price int(10) NOT NULL,
    PRIMARY KEY (SNO),
    KEY items_forign_key (CATOGARY)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

  ALTER TABLE ITEMS
    ADD CONSTRAINT items_forign_key FOREIGN KEY (CATOGARY) REFERENCES CATOGARIES (NAME) ON DELETE CASCADE ON UPDATE CASCADE;
  COMMIT;`;

  conn.query(createTables, (err, result) => {
    console.log("Table created");
  });
};
module.exports = { conn, connectDB };
