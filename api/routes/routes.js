const express = require("express");
const router = express.Router();

// Model
const Task = require("../models/Task.js");

// GET
router.get('/', (req, res) => {
    Task.find()
        .then(tasks => res.status(200).json(tasks))
        .catch(e => res.status(500).json({
            mongoErr: e
        }));        
});

// GET
router.get('/:id', (req, res) => {
    Task.findById(req.params.id)
        .then(task => {
            task !== null
                ? res.status(200).json(task)
                : res.status(404).json({
                    errorMessage: "Task not found"
                });
        })
        .catch(e => res.status(500).json({
            mongoErr: e
        }));
});

// POST
router.post('/', (req, res) => {
    const newTask = new Task({
        description: req.body.description,
        isComplete: req.body.isComplete,
    });

    newTask
        .save()
        .then(todo => res.status(201).json(todo))
        .catch(e => res.status(400).json({
            mongoErr: e
        }));    
});

// PUT
router.put('/:id', (req, res) => {
    const {
        description,
        isComplete,
    } = req.body;                               

    Task.findById(req.params.id)
        .then(task => {
            if(task !== null) {
                task.description = description;
                task.isComplete = isComplete;
    
                task.save()
                    .then(updatedTask => res.status(200).json(updatedTask))
                    .catch(e => res.status(400).json({          
                        mongoErr: e
                    }));
            } else {
                res.status(404).json({
                    errorMessage: "Task not found"
                });
            }
        })
        .catch(e => res.status(500).json({
            mongoErr: e
        }));
});

// DELETE
router.delete('/:id', (req, res) => {
    Task.findById(req.params.id)
        .then(task => {
            if(task !== null) {
                task.remove()
                    .then(() => res.status(200).json({
                        deleted: true,
                        task
                    }));
            } else {
                res.status(404).json({
                    errorMessage: "Task not found"
                });
            }
        })
        .catch(e => res.status(500).json({
            mongoErr: e
        }));
});

module.exports = router;