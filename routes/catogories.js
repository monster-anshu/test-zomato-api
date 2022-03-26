const express = require("express");
const router = express.Router();
const DB = require("../Database/db");
router.get("/", (req, res) => {
  try {
    const qu = "SELECT * FROM CATOGARIES;";
    DB.conn.query(qu, (error, result) => {
      if (error) return res.json({ err: error, success: false });
      res.json({ result, success: true });
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      err: error,
      success: false,
    });
  }
});
router.post("/", (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(401).json({ err: "Name Field not entered" });
    const qu = "INSERT INTO CATOGARIES(NAME) VALUES (?)";
    DB.conn.query(qu, [name], (error, result) => {
      if (error)
        return res.status(409).json({ err: error.sqlMessage, success: false });

      res.json({ msg: "Catogary added : " + name, success: true });
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      err: error,
      success: false,
    });
  }
});
router.delete("/:name", (req, res) => {
  try {
    const { name } = req.params;
    const qu = "DELETE FROM CATOGARIES WHERE NAME = ?";
    DB.conn.query(qu, [name], (error, result) => {
      if (error)
        return res.status(409).json({ err: error.sqlMessage, success: false });

      if (!result.affectedRows)
        return res
          .status(404)
          .json({ msg: "Catogary not found : " + name, success: false });

      res.json({
        msg: "Catogary deleted : " + name,
        success: true,
      });
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      err: error,
      success: false,
    });
  }
});
router.put("/", (req, res) => {
  try {
    const { name, newName } = req.body;
    const qu = "UPDATE CATOGARIES SET NAME = ? WHERE NAME = ? ;";
    DB.conn.query(qu, [newName, name], (error, result) => {
      if (error) return res.status(501).json({ error, success: false });
      if (!result.affectedRows)
        return res
          .status(404)
          .json({ err: "Catogary Not Found : " + name, success: false });
    });
    res.json({ msg: "Catogary update to :" + newName });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      err: error,
      success: false,
    });
  }
});
module.exports = router;
