const sql = require("../../database");

//constructor
const Student = function(student) {
    this.id = student.id;
    this.name = student.name;
    this.email = student.email;
    this.degree = student.degree;
    this.password = student.password;
    this.status = student.status;
    this.category = student.category;
    this.qualifications = student.qualifications;
  };

Student.register = (newStudent, result) => {
  sql.query("INSERT INTO students SET ?", newStudent, (err, res) => {
    if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
    }
  
    console.log("created student: ", { id: res.insertId, ...newStudent });
    result(null, { id: res.insertId, ...newStudent });
  });
};


Student.getAll = (result) => {
    sql.query('SELECT * FROM students', (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("students: ", res);
      result(null, res);
    });
};


Student.findById = (id, result) => {
    sql.query(`SELECT * FROM students WHERE id = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found student: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      result({ kind: "not_found" }, null);
    });
  };


  Student.findByCategory = (category, result) => {
    sql.query(`SELECT * FROM students WHERE category = '${category}'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found student: ", res);
        result(null, res);
        return;
      }
  
      result({ kind: "not_found" }, null);
    });
  };


Student.remove = (id, result) => {
    sql.query("DELETE FROM students WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted students with id: ", id);
      result(null, res);
    });
};


Student.updateById = (id, student, result) => {
  sql.query(
    "UPDATE students SET name = ?, email = ?, degree = ? WHERE id = ?",
    [student.name, student.email, student.degree, id],
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

      console.log("updated student: ", { id: id, ...student });
      result(null, { id: id, ...student });
    }
  );
};


Student.updateQualificationById = (id, student, result) => {
  sql.query(
    "UPDATE students SET category = ?, qualifications = ? WHERE id = ?",
    [student.category, student.qualifications, id],
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

      console.log("updated student: ", { id: id, ...student });
      result(null, { message: 'pass'});
    }
  );
};


Student.approveById = (id, student, result) => {
  sql.query(
    "UPDATE students SET status = ? WHERE id = ?",
    [student.status, id],
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

      console.log("updated student: ", { id: id, ...student });
      result(null, { id: id, ...student });
    }
  );
};




  module.exports = Student;