import express, { urlencoded } from "express";
import connectToDb from "./config/dbConnect.js";
const app = express();
import passport from "passport";
import session from 'express-session'
const PORT = process.env.PORT || 3000
//import initializeLocalStrategy from "./config/localStatargy.js";
import  GoogleStrategyConfig  from './config/googleStatargy.js'
import {config} from "dotenv"
config()

//initializeLocalStrategy(passport)
GoogleStrategyConfig(passport)

app.set('view engine', 'ejs')

//import models

import User from "./models/User.model.js"


//predefine middle wares...
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(session({
  secret: "mahesh_dalle",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, httpOnly: false, maxAge:30 * 24 * 60 * 60 * 1000 }
}))
/* PASSPORT SETTING THAT MANDETORY..... */
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.render('index', { name: 'sarthak' })
})


const ensureAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};


app.get('/register', (req, res) => {
  res.render('register');
})

app.get('/login', (req, res) => {
  res.render('login')
})

app.get('/dashboard',ensureAuth,(req,res)=>{
 //console.log(req.isAuthenticated())  
  console.log(req.user)
  res.render('dashboard',{user : req.user})
})

app.post('/login',passport.authenticate("local",{failureRedirect:'/login'}),(req,res)=>{
   console.log(req.user)  
   res.redirect('/dashboard',{user : req.user})
})

app.post('/register',async (req,res)=>{
   let {name,username,password} = req.body
    if(!name ,!username,!password){
      return res.send("please fill all fileds");
    }
     
     try {
         let alredyExist = await User.findOne({username:username});
         ///console.log(alredyExist)
         if(alredyExist){
          return res.send("user is alredy exist");
         }
        let newUser = new User({name,username,password});
        if(!newUser){
          return res.send("some thing went wrong")
        }
        await newUser.save()
        res.send('sucess')
     } catch (error) {
        console.log(error)
     }
})

app.get('/auth/google',passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/dashboard');
  });

app.listen(PORT, () => {
  console.log(`server is running 🐷 on  ${PORT}`)
  connectToDb()
})