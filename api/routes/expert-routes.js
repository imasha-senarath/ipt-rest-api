const express = require('express');
const router = express.Router();
const expertModel = require("../models/expert-model");
const sql = require("../../database");


//expert register
router.post('/experts/register', function(req, res){
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty."
    });
  }

  const expert = new expertModel({
    id: req.body.id,
    name: req.body.name,
    email: req.body.email,
    profession:req.body.profession,
    password: req.body.password,
    status:'pending'
  });
  
  expertModel.register(expert, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "error"
      });
    else res.send({message:'pass'});
  });
});


//expert login 
router.post('/experts/login', function(req, res) {
  const expert = new expertModel({
    id: req.body.id,
    password: req.body.password
  });

	if (expert.id && expert.password) {
		sql.query('SELECT * FROM experts WHERE id = ? AND password = ? AND status = ?', [expert.id, expert.password, 'approved'], function(error, results, fields) {
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


//get all experts
router.get("/experts", function(req, res){
  expertModel.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "error"
      });
    else res.send(data);
  });
});

 
//get expert by id
router.get("/experts/:id", function(req, res){
  expertModel.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found expert with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving expert with id " + req.params.id
        });
      }
    } else res.send(data);
  });
})


//delete expert by id
router.delete("/experts/:id", function(req, res){
  expertModel.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found expert with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete expert with id" + req.params.idd
        });
      }
    } else res.send({ message: `Expert was deleted successfully` });
  });
})


//update expert by id  
router.put("/experts/:id", function(req, res){
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty."
    });
  }
  
  expertModel.updateById(
    req.params.id,
    new expertModel(req.body),
    (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
           res.status(404).send({
             message: `Not found expert with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating expert with id " + req.params.id
            });
          }
        } else res.send(data);
      }
    );
});


//approve expert by id  
router.put("/approve/experts/:id", function(req, res){
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty."
    });
  }

  const expert = new expertModel({
    status:'approved'
  });
  
  expertModel.approveById(
    req.params.id,
    expert,
    (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
           res.status(404).send({
             message: `Not found expert with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating expert with id " + req.params.id
            });
          }
        } else res.send(data);
      }
    );
});

module.exports = router;


