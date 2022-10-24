const express = require('express')
const mongoose = require("mongoose")
const router = express.Router();
const todoSchema = require("../schemas/todoSchema")
const Todo = new mongoose.model("Todo",todoSchema);


//GET ALL THE TODOS
  router.get("/get",async (req,res)=>{
    await Todo.find({status:"active"})
    .select({
      _id:0,
    })
    .limit(2)
    .exec((err,data)=>{
      if (err) {
        res.status(500).json({error: "There was a server side error!"})
        
      } else{
        res.status(200).json({result:data, message: "Success"})
      }
    })
  })
    
    

//GET A THE TODOS Id
router.get("/:id",async(req,res)=>{
  await Todo.find({_id:req.params.id},(err,data)=>{
    if (err) {
      res.status(500).json({error:"There was a server side error!"})
      
    } else{
      res.status(200).json({
        result : data,
        message : "Success"
      })
    }
  })

})
//Post A  THE TODOS
router.post("/",async(req,res)=>{
    const newTodo = new Todo(req.body);
    await newTodo.save((err)=>{
        if (err) {
            res.status(500).json({error: "There was a server side error!"})
            
        } else{
            res.status(200).json({message:"Todo Was inserted successfully"})
        }

    })

})
//Post MULTIPLE   THE TODOS
router.post("/all",async(req,res)=>{
    await Todo.insertMany(req.body,(err)=>{
        if (err) {
            res.status(500).json({error: "There was a server side error!"})
            
        } else{
            res.status(200).json({message:"Todos were inserted successfully!"})

        }

    })

})
//Put A  THE TODOS
router.put("/:id", async (req, res) => {
    const result = await Todo.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          status: "active",
        },
      },
      {
        new: true,
        useFindAndModify: false,
      },
      (err) => {
        if (err) {
          res.status(500).json({
            error: "There was a server side error!",
          });
        } else {
          res.status(200).json({
            message: "Todo was updated successfully!",
          });
        }
      }
    );
    console.log(result);
  });
//DELETE   THE TODOS
router.delete("/:id",async(req,res)=>{
  await Todo.deleteOne({_id: req.params.id},(err)=>{
    if (err) {
      res.status(500).json({error:"There Was a server side error"})
      
    } else{
      res.status(200).json({message:"Todo was deleted Successfully"})
    }
  })

})

module.exports = router;