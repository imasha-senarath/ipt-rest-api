const express = require('express');
const router = express.Router();
const studentModel = require("../models/student-model");
const sql = require("../../database");


//student register
router.post('/students/register', function(req, res){
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty."
    });
  }

  const student = new studentModel({
    id: req.body.id,
    name: req.body.name,
    email: req.body.email,
    degree: req.body.degree,
    password: req.body.password,
    status:'pending',
    category:'',
    qualifications:''
  });
  
  studentModel.register(student, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "error"
      });
    else res.send({message:'pass'});
  });
});


//student login 
router.post('/students/login', function(req, res) {
  const student = new studentModel({
    id: req.body.id,
    password: req.body.password
  });

	if (student.id && student.password) {
		sql.query('SELECT * FROM students WHERE id = ? AND password = ? AND status = ?', [student.id, student.password, 'approved'], function(error, results, fields) {
			if (results.length > 0) {
				res.send({message:'Authentication successful'});
			} else {
				res.send({message:'Authentication fail'});
			}			
			res.end();
		});
	} else {
		res.send({message:'Please enter ID and Password.'});
		res.end();
	}
});


//get all students
router.get("/students", function(req, res){
  studentModel.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "error"
      });
    else res.send(data);
  });
});

 
//get student by id
router.get("/students/:id", function(req, res){
  studentModel.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Student with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Student with id " + req.params.id
        });
      }
    } else res.send(data);
  });
})


//delete student by id
router.delete("/students/:id", function(req, res){
  studentModel.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Student with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Student with id" + req.params.idd
        });
      }
    } else res.send({ message: `Student was deleted successfully` });
  });
})


//get student by category
router.get("/:category/students", function(req, res){
  studentModel.findByCategory(req.params.category, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Student with category ${req.params.category}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Student with category " + req.params.category
        });
      }
    } else res.send(data);
  });
})


//update student by id  
router.put("/students/:id", function(req, res){
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty."
    });
  }
  
  studentModel.updateById(
    req.params.id,
    new studentModel(req.body),
    (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
           res.status(404).send({
             message: `Not found Student with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Student with id " + req.params.id
            });
          }
        } else res.send(data);
      }
    );
});


//update qualification of the student by id  
router.put("/students/qualification/:id", function(req, res){
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty."
    });
  }
  
  studentModel.updateQualificationById(
    req.params.id,
    new studentModel(req.body),
    (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
           res.status(404).send({
             message: `Not found Student with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Student with id" + req.params.id
            });
          }
        } else res.send(data);
      }
    );
});


//approve student by id  
router.put("/approve/students/:id", function(req, res){
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty."
    });
  }

  const student = new studentModel({
    status:'approved'
  });
  
  studentModel.approveById(
    req.params.id,
    student,
    (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
           res.status(404).send({
             message: `Not found Student with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Student with id " + req.params.id
            });
          }
        } else res.send(data);
      }
    );
});

module.exports = router;


