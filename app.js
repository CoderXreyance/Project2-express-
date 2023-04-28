const express = require('express');
const app = express();
app.use(express.json());

let students =[
    {id:1,name:"reyansh"},
    {id:2,name:"utsav"},
    {id:3,name:"avi"},
    {id:4,name:"mayank"},
    {id:5,name:"koshik"}
]

//sending students detail to the client
app.get('/students',(req,res)=>{
    res.send(students);
})

//query string
// app.get('/students',(req,res)=>{
//     res.send(req.query);
// })

//routing
app.get('/students/:id',(req,res)=>{
    students.find((e) => {
        if(e.id == +req.params.id)
        {
            res.send(e)
        }
    })
    res.status(404).send("not found")
})


app.post('/students',(req,res)=>{
    let student = {
        id : students.length + 1,
        name : req.body.name
    }
    students.push(student);
    res.json(student);
})

//updating the detail
app.put('/students/:id',(req,res) => {
    let name = req.body.name;
    students.find((e)=>{
        if(e.id == +req.params.id){
            e.name = name
            res.send(e);
        }
    })
    res.status(404).send("Not found");
})

//deleting the detail
app.delete('/students/:id',(req,res) => {
    let index = students.findIndex((e1) =>{
        if(e1.id == +req.params.id){
            return true;
        }
    })
    if(index < 0){
        res.status(404).send("Not found");
        return;
    }
    let student = students[index];
    students.splice(index,1);
    res.send(student);
})
  
app.listen(8080,()=>{
    console.log("server is listening on port 8080");
})