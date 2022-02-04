var express = require('express');
var ObjectId = require('mongodb').ObjectID;
var mongojs = require('mongojs');
var router = express.Router();

var db = mongojs("mongodb+srv://mlab_user:password@cluster0.7mq9h.mongodb.net/SchoolManagement?retryWrites=true&w=majority"); //db connection

//reading data
router.get('/getting', (req, res) => {
    db.student.find({}, (err, msg) => {
        if (!err) {
            res.status(200).json({
                message: msg
            })
        } else {
            res.status(500).json({
                message: err
            });
        }
    });
})


//adding data

router.post('/adddept', (req, res) => {

    db.Departments.save({
        name: req.body.name,
        hod: req.body.hod
    }, (err, msg) => {
        if (!err) {
            res.status(200).json({
                message: msg
            });
        } else {
            res.status(500).json({
                message: err
            });
        }
    });

});


// //updating records
router.put('/updatedept',(req,res)=>{
    
    db.Departments.update({_id:ObjectId(req.body._id)},{$set:{name:req.body.name,hod:req.body.hod}},(err,msg)=>{
        if (!err) {
            res.status(200).json({
                message: msg
            });
        } else {
            res.status(500).json({
                message: err
            });
        }
    })
})



// //deleting records
router.delete('/delete/:id', (req, res, next) => {
    console.log("deelete");
    var t = req.params.id.toString()
    console.log(t);
    
    db.Departments.remove({ _id: ObjectId(t) }, (err, msg) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json({ msg: msg });
        }
    });
});




module.exports = router;