const express = require("express");
const app = express()

const port =  1100
app.use(express.json())

var knex = require("knex")({
    client: "mysql",
    connection: {
      host: "localhost",
      user: "root",
      password: "Gouri@1434",
      database: "coustomerDetails",
    }
})

knex.schema.hasTable("consumer").then((exits)=> {
    if(!exits){
        return knex.schema.createTable("consumer",(t) => {
            t.increments("id").primary();
            t.string("name");
            t.string("lastname");
            t.string("contactNo");
        })
    }
})

app.post('/create', (req, res) => {
    knex("consumer").insert({
        name : req.body.name,
        lastname: req.body.lastname,
        contactNo: req.body.contactNo
    }).then(() => {
        res.send("data is inserted..")
        console.log("data is inserted..");
    }).catch((err) => {
        res.send(err)
        console.log(err);
    })
})

app.get('/data', (req, res) => {
    knex()
    .select("*")
    .from("consumer")
    .then((data) => {
        console.log(data)
        res.send(data)
    }).catch((err) => {
        console.log(err)
        res.send(err)
    })
})

app.get('/byId/:lastname', (req, res) => {
    knex()
    .select("*")
    .from("consumer")
    .where("lastname", req.params.lastname)
    .then((data) => {
        console.log(data)
        res.send(data)
    }).catch((err) => {
        console.log(err)
        res.send(err)
    })
})

app.put('/dataupdate/:id', (req, res) => {
    knex.update({
        lastname: req.body.lastname
    })
    .table("consumer")
    .where("id", req.body.id)
    .then((data) => {
        console.log(req.params.id)
        res.send(req.params.id)
    })
    .catch((err) => {
        console.log(err)
        res.send(err);
    })
})

app.delete('/cutdata/:id', (req, res) => {
    knex("consumer")
    .where({"id": req.params.id}).del()
    .then(() => {
        console.log("data is deleted")
        res.send({id: req.params.id})
    })
    .catch(() => {
        console.log("error is showing...")
        res.send("error is there....")
    })
})

app.listen(port, () => {
    console.log(`server is running on this ${port}`)
});
