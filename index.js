const express = require("express");
const app = express();
const bodyParser =  require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const JWTsecret = "ahdfuhsudhfsdhfsdf";

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

function auth(req, res, next){
    const authToken = req.headers['authorization'];

    if(authToken != undefined){
        const bearer = authToken.split(' ');
        var token = bearer[1];

        jwt.verify(token, JWTsecret,(err, data)=>{
            if(err){
                res.status(401);
                res.json({err: "Token inválido!"});
            }else{
                req.token = token;
                req.loggedUder = {id: data.id, email: data.email};
                next();
                //console.log(data);
            }
        })

    }else{
        res.status(401);
        res.json({err: "Token inválido!"});
    }
    
    
}

var DB = {

    games:[
        {
            id: 23,
            title: "Call of duty MW",
            year: 2019,
            price:60
        },
        {
            id: 65,
            title: "Sea of thieves",
            year: 2018,
            price:40
        },
        {
            id: 2,
            title: "Minecraft",
            year: 2012,
            price:20
        }

    ],
    users:[
        {
            id:1,
            name:"Marcelo",
            email:"marcelolcarvalho@gmail.com",
            password:"123456"
        },
        {
            id:2,
            name:"José",
            email:"joselcarvalho@gmail.com",
            password:"123456"
        }
    ]

}
    
app.get("/games",auth,(req, res) => {
    res.statusCode = 200;
    res.json(DB.games);
    //res.json({user: req.loggedUder, games: DB.games});
});


app.get("/game/:id",(req, res) => {
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        var id = parseInt(req.params.id);
                                 //achar um game que tenha um id igual ao parametro
        var game = DB.games.find(g => g.id == id);

        if (game != undefined) {
            res.statusCode = 200;
            res.json(game);

        }else{
            res.sendStatus(404);
        }

    }
})

app.post("/game",auth,(req,res) => {
    var {title, price, year} = req.body;

    DB.games.push({
        id:100,
        title,
        price,
        year
    })

    res.sendStatus(201);

})

app.delete("/game/:id",auth,(req, res) => {
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        var id = parseInt(req.params.id);
                                 //achar um game que tenha um id igual ao parametro
        var index = DB.games.findIndex(g => g.id == id);

        if (index == -1) {
            res.sendStatus(404);

        }else{
            DB.games.splice(index,1);
            res.sendStatus(200);
        }
    }    
});

app.put("/game/:id", (req, res) => {

    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        var id = parseInt(req.params.id);
                                 //achar um game que tenha um id igual ao parametro
        var game = DB.games.find(g => g.id == id);

        if (game != undefined) {

            var {title, price, year} = req.body;  

            if ( title != undefined){
                game.title = title;
            }

            if ( price != undefined){
                game.price = price;
            }

            if ( year != undefined){
                game.year = year;
            }

            res.sendStatus(200);

        }else{
            res.sendStatus(404);
        }

    }    

})

app.post("/auth",(req, res) => {
    
    var {email, password} = req.body;

    if(email != undefined){

        var user = DB.users.find(u => u.email == email);

        if (user != undefined) {
            if(user.password == password){
                
                jwt.sign({id: user.id, email: user.email}, JWTsecret, {expiresIn:'48h'},(err, token) =>{
                    if (err){
                        res.status(400);
                        res.json({err: "Falha interna"});
                    }else{
                        res.status(200);
                        res.json({token: token});
                    }
                })
                
                
            }else{
                res.status(401);
                res.json({err: "Credenciais inválidas!"});
            }
        }else{
            res.status(400);
            res.json({err: "O e-mail enviado não existe na base de dados!"});
        }

    }else{
        res.status(400);
        res.json({err: "O e-mail enviado é inválido!"});
    }
})

app.listen(45678,()=>{
    console.log("API IS RUNNING!")
})