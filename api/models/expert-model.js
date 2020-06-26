const sql = require("../../database");

//constructor
const Expert = function(expert) {
    this.id = expert.id;
    this.name = expert.name;
    this.email = expert.email;
    this.profession = expert.profession;
    this.password = expert.password;
    this.status = expert.status;
  };

  Expert.register = (newExpert, result) => {
  sql.query("INSERT INTO experts SET ?", newExpert, (err, res) => {
    if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
    }
  
    console.log("created expert: ", { id: res.insertId, ...newExpert });
    result(null, { id: res.insertId, ...newExpert });
  });
};


Expert.getAll = (result) => {
    sql.query('SELECT * FROM experts', (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("experts: ", res);
      result(null, res);
    });
};


Expert.findById = (id, result) => {
    sql.query(`SELECT * FROM experts WHERE id = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found expert: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      result({ kind: "not_found" }, null);
    });
  };


  Expert.remove = (id, result) => {
    sql.query("DELETE FROM experts WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted expert with id: ", id);
      result(null, res);
    });
};


Expert.updateById = (id, expert, result) => {
  sql.query(
    "UPDATE experts SET name = ?, email = ?, profession = ? WHERE id = ?",
    [expert.name, expert.email, expert.profession, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated expert: ", { id: id, ...expert });
      result(null, { id: id, ...expert });
    }
  );
};


Expert.approveById = (id, expert, result) => {
  sql.query(
    "UPDATE experts SET status = ? WHERE id = ?",
    [expert.status, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated expert: ", { id: id, ...expert });
      result(null, { id: id, ...expert });
    }
  );
};


module.exports = Expert;