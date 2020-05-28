const express = require('express');
const app = express();
var admin = require('firebase-admin');
var bodyParser = require("body-parser");
var firebaseapp=require('firebase/app');
var firebase=require('firebase');
let serviceAccount = require('./admin_sdk.json');
var cookieParser=require('cookie-parser');
var extras=require('./extras');
var fs=require('fs');
var path=require('path');
var multer=require('multer');
var firebaseConfig = {
  apiKey: "AIzaSyD_H7_tcH_zicBWDEytvSvFtuuqG9YK94w",
  authDomain: "vitbuzz-ae9cc.firebaseapp.com",
  databaseURL: "https://vitbuzz-ae9cc.firebaseio.com",
  projectId: "vitbuzz-ae9cc",
  storageBucket: "vitbuzz-ae9cc.appspot.com",
  messagingSenderId: "496073937616",
  appId: "1:496073937616:web:f3ca19858ec86d6d8d84d5",
  measurementId: "G-72WHDLRLLG"
};
firebaseapp.initializeApp(firebaseConfig);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "vitbuzz-ae9cc.appspot.com"
});
var bucket = admin.storage().bucket();
var database = admin.firestore();

var curNewsDoc={};
var curEventDoc={};
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/static'));
app.use(cookieParser());
app.get('/', async(req, res) => {
    console.log("Conneted");
    if(req.headers.cookie && extras.parseCookies(req.headers.cookie)["login"] && extras.parseCookies(req.headers.cookie)["login"]=="1"){
      res.render("userHome");
    }
    else{
    res.render('login');
    }
});

app.get('/fetchNews',async(req,res)=>{
    res.send(['1','2','2','3']);
});

app.post('/registerpost',async(req,res)=>{
  firebase.auth().createUserWithEmailAndPassword(req.body.email,req.body.pwd).then((user)=>{
    console.log(user);
    res.cookie("login","1").cookie("loggeduser",user.user.uid).status(200).send("success");
}).catch((error)=>{
    console.log(error);
    res.status(400).send("Failed");
});
});

app.post('/loginpost',async(req,res)=>{
  console.log(req);
  firebase.auth().signInWithEmailAndPassword(req.body.email,req.body.pwd).then((user)=>{
    console.log(user.user.uid);
    res.cookie("login","1").cookie("loggeduser",user.user.uid).status(200).send("success");
}).catch((error)=>{
    console.log(error);
    res.status(400).send("Failed");
});
});


app.get('/css1',(req,res)=>{
  res.sendFile(__dirname+"/static/css/css1.css");
});

app.get('/css2',(req,res)=>{
  res.sendFile(__dirname+"/static/css/css2.css");
});
app.get('/css3',(req,res)=>{
  res.sendFile(__dirname+"/static/css/css3.css");
});
app.get('/css4',(req,res)=>{
  res.sendFile(__dirname+"/static/css/css4.css");
});
app.get('/css5',(req,res)=>{
  res.sendFile(__dirname+"/static/css/css5.css");
});
app.get('/css6',(req,res)=>{
  res.sendFile(__dirname+"/static/css/css6.css");
});
app.get('/css7',(req,res)=>{
  res.sendFile(__dirname+"/static/css/css7.css");
});
app.get('/css8',(req,res)=>{
  res.sendFile(__dirname+"/static/css/css8.css");
});

app.get('/css9',(req,res)=>{
  res.sendFile(__dirname+"/static/css/css9.css");
});

app.get('/menucss',(req,res)=>{
  res.sendFile(__dirname+"/static/css/menu.css");
});

app.get('/menujs',(req,res)=>{
  res.sendFile(__dirname+"/menu.js");
});

app.get('/logoutjs',(req,res)=>{
  res.sendFile(__dirname+"/logout.js");
});

app.get('/extrasjs',(req,res)=>{
  res.sendFile(__dirname+"/extras.js");
});

app.get('/maincss',(req,res)=>{
  res.sendFile(__dirname+"/static/css/main.css");
});

app.get('/loginhtml',(req,res)=>{
  res.render("login");
});

app.get('/publishEventshtml',(req,res)=>{
  res.render("publishEvents");
});

app.get('/publishNewshtml',(req,res)=>{
  res.render("publishNews");
});

app.get('/userEventshtml',(req,res)=>{
  res.render("userEvents");
});

app.get('/userNewshtml',(req,res)=>{
  res.render("userNews");
});
app.get('/userHomehtml',(req,res)=>{
  res.render("userHome");
});

app.get('/hostelhtml',(req,res)=>{
  res.render("hostel");
});

app.post('/logout',(req,res)=>{
      res.cookie("login","0").clearCookie("loggeduser").status(200).send("Logged Out!");
});

app.get('/openNewsView',(req,res)=>{
  console.log(curNewsDoc);
  curNewsDoc['setLike']="0";
    firebase.firestore().collection("News").doc(curNewsDoc['nid']).collection('likes').get().then((likesDocs)=>{
      likesDocs.docs.forEach((doc)=>{
          if(doc.id==extras.parseCookies(req.headers.cookie)['loggeduser']){
            curNewsDoc['setLike']="1";
          }
      });
      res.render("newsView",curNewsDoc);
    }).catch((err)=>{
      res.status(400).send(err);
    });
  
});

app.get('/openEventView',(req,res)=>{
  console.log(curEventDoc);
  curNewsDoc['setRegistered']="0";
    firebase.firestore().collection("News").doc(curEventDoc['eid']).collection('registered').get().then((regDocs)=>{
      regDocs.docs.forEach((doc)=>{
          if(doc.id==extras.parseCookies(req.headers.cookie)['loggeduser']){
            curEventDoc['setRegistered']="1";
          }
      });
      res.render("eventView",curEventDoc);
    }).catch((err)=>{
      res.status(400).send(err);
    });
  
});

app.post('/addLike',(req,res)=>{
  firebase.firestore().collection("News").doc(curNewsDoc['nid']).collection('likes').doc(extras.parseCookies(req.headers.cookie)['loggeduser']).set({"uid":extras.parseCookies(req.headers.cookie)['loggeduser'],"time":firebase.firestore.Timestamp.fromDate(new Date())})
  .then((x)=>{
    firebase.firestore().collection("News").doc(curNewsDoc['nid']).update({likes:parseInt(curNewsDoc['likes'])+1}).then(()=>{
      curNewsDoc['likes']=String(parseInt(curNewsDoc['likes'])+1);
      curNewsDoc['setLike']="1";
      res.status(200).send("Success");
    })
    .catch((err1)=>{
      res.status(400).send("Failed");
    });
  })
  .catch((err)=>{
    res.status(400).send("Failed");
  });
});

app.post('/removeLike',(req,res)=>{
  firebase.firestore().collection("News").doc(curNewsDoc['nid']).collection('likes').doc(extras.parseCookies(req.headers.cookie)['loggeduser']).delete()
  .then((x)=>{
    firebase.firestore().collection("News").doc(curNewsDoc['nid']).update({likes:parseInt(curNewsDoc['likes'])-1}).then(()=>{
      curNewsDoc['likes']=String(parseInt(curNewsDoc['likes'])-1);
      curNewsDoc['setLike']="0";
      res.status(200).send("Success");
    })
    .catch((err1)=>{
      res.status(400).send("Failed");
    });
  })
  .catch((err)=>{
    res.status(400).send("Failed");
  });
});

app.post('/addRegistration',(req,res)=>{
  firebase.firestore().collection("Events").doc(curEventDoc['eid']).collection('registered').doc(extras.parseCookies(req.headers.cookie)['loggeduser']).set({"uid":extras.parseCookies(req.headers.cookie)['loggeduser'],"time":firebase.firestore.Timestamp.fromDate(new Date())})
  .then((x)=>{
    firebase.firestore().collection("Events").doc(curEventDoc['eid']).update({registered:parseInt(curEventDoc['registered'])+1}).then(()=>{
      curEventDoc['registered']=String(parseInt(curEventDoc['registered'])+1);
      curEventDoc['setregistered']="1";
      res.status(200).send("Success");
    })
    .catch((err1)=>{
      console.log(err1);
      res.status(400).send("Failed");
    });
  })
  .catch((err)=>{
    console.log(err);
    res.status(400).send("Failed");
  });
});

app.post('/removeRegistration',(req,res)=>{
  firebase.firestore().collection("Events").doc(curEventDoc['eid']).collection('registered').doc(extras.parseCookies(req.headers.cookie)['loggeduser']).delete()
  .then((x)=>{
    firebase.firestore().collection("Events").doc(curEventDoc['eid']).update({registered:parseInt(curEventDoc['registered'])-1}).then(()=>{
      curEventDoc['registered']=String(parseInt(curEventDoc['registered'])-1);
      curEventDoc['setregistered']="1";
      res.status(200).send("Success");
    })
    .catch((err1)=>{
      res.status(400).send("Failed");
    });
  })
  .catch((err)=>{
    res.status(400).send("Failed");
  });
});


app.post('/uploadPhoto',(req,res)=>{
    try{
      var reader = new FileReader();
        reader.onload = function (e) {
                console.log(e);
                            //var array = new Uint8Array(e.target.result);
                            //var binaryString = String.fromCharCode.apply(null, array);
                    };
                    reader.readAsDataURL(req.body.file);
    }
    catch(e){
      console.log(e);
    }
});


var uploadNews = multer({dest: __dirname + '/uploads/newsimages'});

app.post('/uploadNews', uploadNews.single('photo'), async(req, res) => {
  if(req.file) {
      var tempPath=req.file.path;
      var nid=extras.randomString(10);
      var targetPath=path.join(__dirname, "./uploads/newsimages/"+nid+".png");
      fs.rename(tempPath, targetPath, err => {
        if (!err){
          bucket.upload(path.join(__dirname, "./uploads/newsimages/"+nid+".png"),{
            uploadType: "media",
            metadata: {
              contentType: 'image/png',
              metadata: {
                firebaseStorageDownloadTokens: "1234"
              }
            }
          }).then((fileDetais)=>{
            console.log(fileDetais);
            bucket.file(nid+".png").getSignedUrl({
              action: 'read',
              expires: '03-09-2491'
            }).then((x)=>{
              console.log(x);
              firebase.firestore().collection("News").doc(nid).set({"nid":nid,"uid":extras.parseCookies(req.headers.cookie)['loggeduser'],"likes":0,"title":req.body['newsTitle'],"desc":req.body['newsDesc'],"date":firebase.firestore.Timestamp.fromDate(new Date()),"imguri":"https://firebasestorage.googleapis.com/v0/b/" + bucket.name + "/o/" + nid+".png" + "?alt=media&token=1234"})
              .then((x)=>{
                  console.log(x);
                  res.status(200).contentType("text/plain").send("File uploaded!");
              })
              .catch((err)=>{
                  console.log(err);
                  res.status(400).send("Error");
              
              });
            }).catch((geterr)=>{
                console.log(geterr);
                res.status(400).send("Error");
            });
          })
          .catch((uploaderr)=>{
            console.log(uploaderr);
            res.status(400).send("Error");
          });
          
        }
        else{
          res.status(400).send("Error");
        }
      });
      
  }
  else throw 'error';
});

var uploadEvents = multer({dest: __dirname + '/uploads/eventimages'});

app.post('/uploadEvents', uploadEvents.single('photo'), async(req, res) => {
  console.log(req.headers);
  if(req.file) {
      var tempPath=req.file.path;
      var eid=extras.randomString(8);
      var targetPath=path.join(__dirname, "./uploads/eventimages/"+eid+".png");
      fs.rename(tempPath, targetPath, err => {
        if (!err){
          bucket.upload(path.join(__dirname, "./uploads/eventimages/"+eid+".png"),{
            uploadType: "media",
            metadata: {
              contentType: 'image/png',
              metadata: {
                firebaseStorageDownloadTokens: "1234"
              }
            }
          }).then(async(fileDetails)=>{
            console.log(fileDetails);
            bucket.file(eid+".png").getSignedUrl({
              action: 'read',
              expires: '03-09-2491'
            }).then(async(x)=>{
              console.log(x);
              firebase.firestore().collection("Events").doc(eid).set({"eid":eid,"uid":extras.parseCookies(req.headers.cookie)['loggeduser'],"registered":0,"title":req.body['eventTitle'],"desc":req.body['eventDesc'],"startDate":firebase.firestore.Timestamp.fromDate(new Date(req.body['regopen'])),"endDate":firebase.firestore.Timestamp.fromDate(new Date(req.body['regclose'])),"price":req.body["fees"],"capacity":req.body["capacity"],"date":firebase.firestore.Timestamp.fromDate(new Date()),"imguri":"https://firebasestorage.googleapis.com/v0/b/" + bucket.name + "/o/" + eid+".png" + "?alt=media&token=1234"})
                .then(async(x)=>{
                    console.log(x);
                    res.status(200).contentType("text/plain").send("File uploaded!");
                })
                .catch((err)=>{
                    console.log(err);
                    res.status(400).send("Error");
                
                });
            }).catch((geterr)=>{
                console.log(geterr);
                res.status(400).send("Error");
            });
          })
          .catch((uploaderr)=>{
            console.log(uploaderr);
            res.status(400).send("Error");
          });
          
        }
        else{
          res.status(400).send("Error");
        }
      });
      
  }
  else throw 'error';
});

app.get('/getMyEvents',(req,res)=>{
    let myEventsArray=[];
    firebase.firestore().collection("Events").where("uid","==",extras.parseCookies(req.headers.cookie)['loggeduser']).orderBy("date","desc").get()
    .then((myEvents)=>{
        var c=0;
        myEvents.docs.forEach((doc)=>{
          myEventsArray[c]=doc.data();
            console.log(doc.data());
            c++;
        })
        res.status(200).send(myEventsArray);
    }).catch((fetchError)=>{
        res.status(400).send(fetchError);
    });
});

app.get('/getPopularEvents',(req,res)=>{
  let myEventsArray=[];
  firebase.firestore().collection("Events").orderBy("registered","desc").get()
  .then((myEvents)=>{
      var c=0;
      myEvents.docs.forEach((doc)=>{
        myEventsArray[c]=doc.data();
          console.log(doc.data());
          c++;
      })
      res.status(200).send(myEventsArray);
  }).catch((fetchError)=>{
      res.status(400).send(fetchError);
  });
});

app.get('/getRecentEvents',(req,res)=>{
  let myEventsArray=[];
  firebase.firestore().collection("Events").orderBy("date","desc").get()
  .then((myEvents)=>{
      var c=0;
      myEvents.docs.forEach((doc)=>{
        myEventsArray[c]=doc.data();
          console.log(doc.data());
          c++;
      })
      res.status(200).send(myEventsArray);
  }).catch((fetchError)=>{
      res.status(400).send(fetchError);
  });
});


app.get('/getMyNews',(req,res)=>{
  let myNewsArray=[];
  firebase.firestore().collection("News").where("uid","==",extras.parseCookies(req.headers.cookie)['loggeduser']).orderBy("date","desc").get()
  .then((myNews)=>{
      var c=0;
      myNews.docs.forEach((doc)=>{
        myNewsArray[c]=doc.data();
          console.log(doc.data());
          c++;
      })
      res.status(200).send(myNewsArray);
  }).catch((fetchError)=>{
      console.log(fetchError);
      res.status(400).send(fetchError);
  });
});

app.get('/getRecentNews',(req,res)=>{
  let myNewsArray=[];
  firebase.firestore().collection("News").orderBy("date","desc").get()
  .then((myNews)=>{
      var c=0;
      myNews.docs.forEach((doc)=>{
        myNewsArray[c]=doc.data();
          console.log(doc.data());
          c++;
      })
      res.status(200).send(myNewsArray);
  }).catch((fetchError)=>{
      console.log(fetchError);
      res.status(400).send(fetchError);
  });
});

app.get('/getPopularNews',(req,res)=>{
  let myNewsArray=[];
  firebase.firestore().collection("News").orderBy("likes","desc").get()
  .then((myNews)=>{
      var c=0;
      myNews.docs.forEach((doc)=>{
        myNewsArray[c]=doc.data();
          console.log(doc.data());
          c++;
      })
      res.status(200).send(myNewsArray);
  }).catch((fetchError)=>{
      console.log(fetchError);
      res.status(400).send(fetchError);
  });
});

app.post('/setCurrentNewsDoc',(req,res)=>{
    curNewsDoc=req.body;
    curNewsDoc['setLike']="0";
    res.status(200).send("OK");
    
});

app.post('/setCurrentEventDoc',(req,res)=>{
  curEventDoc=req.body;
  curEventDoc['setRegistered']="0";
  res.status(200).send("OK");
  
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

module.exports=app;