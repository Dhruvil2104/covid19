const express = require("express");
const favicon = require("express-favicon");
const path = require("path");
const port = process.env.PORT || 8080;
const app = express();
app.use(favicon(__dirname + "/build/favicon.ico"));
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "build")));
app.get("/get-key", function (req, res) {
  return res.send({ key: "AIzaSyABhOipwPM66s6JgjqEQgIhYV_LBRXNBRg" });
});
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.listen(port);
