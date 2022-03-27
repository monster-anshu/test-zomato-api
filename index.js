const express = require("express");
const app = express();
app.use(express.json());
const DB = require("./Database/db");
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send(`
  <h1 style='text-align:center' >
  Base Url of Api : http://zomatoapu.herokuapp.com
  </h1>
  <h1>
    <a target="_blank" href="https://github.com/monster-anshu/Zomato.git">View Source Code</a>
  </h1>
  <h1>
    <a target="_blank" href="https://app.swaggerhub.com/apis-docs/monster-anshu/Zomato_Api/1.0.0">View Documentation</a>
  </h1>
  <h1>
    <a target="_blank" href="https://www.monster-anshu.cf">View my Portfolio</a>
  </h1>
  <h1>
    <a target="_blank" href="https://github.com/monster-anshu">View my Github</a>
  </h1>
  `);
});
app.use("/cat", require("./routes/catogories"));
app.use("/items", require("./routes/items"));
app.listen(port, () => {
  DB.connectDB();
  console.log("Api running on port : " + port);
});
