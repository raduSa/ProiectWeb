var express = require('express');
var app = express();
var formidable = require('formidable');
const session = require('express-session');
const fs = require('fs');

app.set('view engine', 'ejs');

app.use(session({
secret: 'abcdefg', // pentru criptarea session ID-ului
resave: true, // să nu șteargă sesiunile idle
saveUninitialized: false 
// nu salvează obiectul sesiune dacă nu am setat niciun câmp
}));

app.get('/', (req, res) => {
  res.render('pagini/login');
});

app.post('/login', function(req, res) {
    var form = new formidable.IncomingForm();
    var ob;
    var date = fs.readFileSync("users.json");
    ob = JSON.parse(date).users;
    var verifica = function(username, parola) {
      for (let i = 0; i < ob.length; i++)
        if (username === ob[i].username && parola === ob[i].password)
          return username;
      return null;
   }
    form.parse(req, function(err, fields, files) {
         let user = verifica(fields.username[0], fields.parola[0]);
         
         if(user){
           req.session.username = user; 
           // setez userul ca proprietate a sesiunii
           res.redirect('/logout'); }
         else
           req.session.username = false;
    });
 });

app.get('/logout', function(req, res) {
  res.render('pagini/logout',{'username':req.session.username});
});

app.post('/logout', function(req, res) {
  req.session.destroy(); 
  // distrugem sesiunea la intrarea pe pagina de logout
  res.render('pagini/login');
});
app.listen(8080, () => {console.log("Howdy!");});
