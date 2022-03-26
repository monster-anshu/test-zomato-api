const express = require("express");
const router = express.Router();
const DB = require("../Database/db");
router.get("/:cat", (req, res) => {
  try {
    const { cat } = req.params;
    if (!cat)
      return res
        .status(404)
        .json({ err: "Please Enter a Catogary", success: false });
    const qu = "SELECT * FROM ITEMS WHERE CATOGARY = ? ;";
    DB.conn.query(qu, [cat], (error, result) => {
      if (error)
        return res.status(409).json({
          error: { ...error, sql: "***" },
          success: false,
        });
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
    const { name, catogary, price } = req.body;
    if (!name || !catogary || !price)
      return res.status(401).json({ err: "Field not entered" });
    const checkqu = "SELECT * FROM ITEMS WHERE NAME = ? AND CATOGARY  = ? ;";
    DB.conn.query(checkqu, [name, catogary], (err, re) => {
      if (err) return res.status(500).json({ error: err, success: false });
      if (re.length)
        return res
          .status(309)
          .json({ success: false, error: "Items Already Exsits " });
      const qu = "INSERT INTO ITEMS(NAME,CATOGARY,PRICE) VALUES (?,?,?)";

      DB.conn.query(qu, [name, catogary, price], (error, result) => {
        if (error)
          return res.status(409).json({
            error: { ...error, sql: "***" },
            success: false,
          });

        res.json({ msg: "Catogary added : " + name, success: true });
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
router.delete("/", (req, res) => {
  try {
    const { name, catogary } = req.body;
    const qu = "DELETE FROM ITEMS WHERE NAME = ? AND CATOGARY = ? ";
    DB.conn.query(qu, [name, catogary], (error, result) => {
      if (error)
        return res.status(409).json({ err: error.sqlMessage, success: false });

      if (!result.affectedRows)
        return res
          .status(404)
          .json({ msg: "Item not found : " + name, success: false });

      res.json({
        msg: "Catogary added : " + name,
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
    const { name, newValue, catogary, field } = req.body;
    if (!name || !newValue || !catogary || !field)
      return res
        .status(404)
        .json({ err: "Field can't be empty ", success: false });
    const qu = `UPDATE  ITEMS SET ${field} = ? WHERE NAME = ? AND CATOGARY = ? ; `;
    DB.conn.query(qu, [newValue, name, catogary], (error, result) => {
      if (error)
        return res
          .status(501)
          .json({ error: { ...error, sql: "***" }, success: false });
      if (!result.affectedRows)
        return res
          .status(404)
          .json({ err: "Item not found " + oldName, success: false });
      res.json({ msg: "Item updates", success: true });
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      err: error,
      success: false,
    });
  }
});
module.exports = router;
