var moment   =    require("moment");
var express   =    require("express");
var mysql     =    require('mysql');
var config = {
  host     : 'localhost',
  user     : 'root',
  password : '',
//  password : 'pass',
  database : 'language_app',
};
var cors = require('cors');
var app = express();
 
class Database {
  constructor( config ) {
    this.connection = mysql.createConnection( config );
  }
  query( sql, args ) {
    return new Promise( ( resolve, reject ) => {
      this.connection.query( sql, args, ( err, rows ) => {
        if ( err ) return reject( err );
        resolve( rows );
      });
    });
  }
  close() {
    return new Promise( ( resolve, reject ) => {
      this.connection.end( err => {
        if ( err ) return reject( err );
        resolve();
      });
    });
  }
}

const database = new Database( config );
 
function handle_get_courses(req,res) {
  var answ = {languages: {}, onLearning: {}};
  database.query( 'SELECT * from Languages' )
  .then( rows => {
    answ.languages = rows;
    return database.query( `SELECT * from Users_learn_languages WHERE user_id=${req.query.userId}` );
  })
  .then( rows => {
    answ.onLearning = rows;
    return true;
  })
  .then( () => {
    res.json(answ);
  })
  .catch( err => { 
    console.log(err);
  })
}

function handle_get_user_info(req,res) {
  var answ = {};
  // TODO добавить проверку пароля
  database.query( `SELECT * FROM Users WHERE (login='${req.query.login}' OR email='${req.query.login}')` )
  .then( rows => {
    answ = rows;
    return true;
  })
  .then( () => {
    res.json(answ);
  })
  .catch( err => { 
    console.log(err);
  })
}

function handle_get_modules(req,res) {
  var answ = {modules: {}, tags:{}, onLearning: {}};
  database.query( `SELECT * FROM modules WHERE language_id=${req.query.languageId}` )
  .then( rows => {
    answ.modules = rows;
    return database.query( 'SELECT * FROM Tags' );
  })
  .then( rows => {
    answ.tags = rows;
    return database.query( `SELECT Module_progress.* FROM Module_progress JOIN Modules ON Module_progress.module_id=Modules.id WHERE (Modules.language_id=${req.query.languageId} AND Module_progress.user_id=${req.query.userId})` );
  })
  .then( rows => {
    answ.onLearning = rows;
    return true;
  })
  .then( () => {
    res.json(answ);
  })
  .catch( err => {
    console.log(err);
  })
}

function handle_get_content(req,res) {
  var answ = {content: {}, onLearning: {}};
  database.query( `SELECT * FROM Content WHERE module_id=${req.query.moduleId}` )
  .then( rows => {
    answ.content = rows;
    return true;
  })
  .then( () => {       
    res.json(answ);
  })
  .catch( err => {
    console.log(err);
  })
}

function handle_get_revision_modules(req,res) {
  var answ = {content: []};
  database.query( `SELECT Modules.id FROM Module_progress join Modules ON Module_progress.module_id = Modules.id where Module_progress.user_id=${req.query.userId} AND Modules.language_id=${req.query.languageId} order by (DATE_ADD(Module_progress.learning_date, INTERVAL (2*DATEDIFF(Module_progress.revision_date, Module_progress.learning_date)+1) DAY)) limit 1` )
  .then( rows => {
    if (rows.length > 0) {
      return database.query( `SELECT * FROM Content WHERE module_id=${rows[0].id}`);
    }
    return [];
  })
  .then( rows => {
    answ.content = rows;
    return true;
  })
  .then( () => {
    res.json(answ);
  })
  .catch( err => {
    console.log(err);
  })
}

function handle_update_module_progress(req,res) {
  /*
  получаем: userId, moduleId, languageId, опционально resultsByTaskType которое объект
  */
  var answ = {learningPattern: []};
  database.query( `SELECT id FROM Module_progress WHERE user_id=${req.query.userId} AND module_id=${req.query.moduleId}` )
  .then( rows => {
    var query = '';
    var format = 'YYYY-MM-DD HH:mm:ss';
    var dateTime = moment(new Date()).format(format);
    
    if (rows.length > 0 && 'resultsByTaskType' in req.query) {
      query = `UPDATE Module_progress SET revision_date='${dateTime}' WHERE user_id=${req.query.userId} AND module_id=${req.query.moduleId}`
    } else {
      query = `INSERT INTO Module_progress (module_id, user_id, learning_date, revision_date) VALUES (${req.query.moduleId},${req.query.userId},'${dateTime}','${dateTime}')`
    }
    return database.query(query);
  })
  .then( rows => {
    if ('resultsByTaskType' in req.query) {
      return database.query( `SELECT id FROM Users_learn_languages WHERE user_id=${req.query.userId} AND language_id=${req.query.languageId}`);  
    } else {
      return [];
    }
  })
  .then( rows => {
    var query = '';
    if ('resultsByTaskType' in req.query) {
      if (rows.length === 0) {
        query = `INSERT INTO Users_learn_languages (user_id, language_id, img_success, img_total, aud_success, aud_total, sel_success, sel_total, wri_success, wri_total) VALUES (${req.query.userId}, ${req.query.languageId}, ${req.query.resultsByTaskType.imageSuccess}, ${req.query.resultsByTaskType.imageTotal}, ${req.query.resultsByTaskType.audioSuccess}, ${req.query.resultsByTaskType.audioTotal}, ${req.query.resultsByTaskType.selectionSuccess}, ${req.query.resultsByTaskType.selectionTotal}, ${req.query.resultsByTaskType.writtingSuccess}, ${req.query.resultsByTaskType.writtingTotal})`;
      } else {
        query = `UPDATE Users_learn_languages SET img_success=img_success+${req.query.resultsByTaskType.imageSuccess}, img_total=img_total+${req.query.resultsByTaskType.imageTotal}, aud_success=aud_success+${req.query.resultsByTaskType.audioSuccess}, aud_total=aud_total+${req.query.resultsByTaskType.audioTotal}, sel_success=sel_success+${req.query.resultsByTaskType.selectionSuccess}, sel_total=sel_total+${req.query.resultsByTaskType.selectionTotal}, wri_success=wri_success+${req.query.resultsByTaskType.writtingSuccess}, wri_total=wri_total+${req.query.resultsByTaskType.writtingTotal} WHERE user_id=${req.query.userId} AND language_id=${req.query.languageId}`;
      }
    } else {
      query = `INSERT INTO Users_learn_languages (user_id, language_id, img_success, img_total, aud_success, aud_total, sel_success, sel_total, wri_success, wri_total) VALUES (${req.query.userId}, ${req.query.languageId}, 0, 0, 0, 0, 0, 0, 0, 0)`;
    }
    return database.query(query);
  })
  .then( rows => {
    return database.query( `SELECT * FROM Users_learn_languages WHERE user_id=${req.query.userId} AND language_id=${req.query.languageId}`);
  })
  .then( rows => {
    answ.learningPattern = rows;
    return true;
  })
  .then( () => {
    res.json(answ);
  })
  .catch( err => {
    console.log(err);
  })
  
}


app.use(cors());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Origins', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
   
  next();
});

app.use(express.static('public'));

app.get("/user", function(req,res) {
  handle_get_user_info(req,res);
});

app.patch("/user", function(req,res) {
  console.log('update user');
});

app.get("/courses",function(req,res) {
  handle_get_courses(req,res);
});
 
app.get("/learning_modules",function(req,res) {
  handle_get_modules(req,res);
});

app.put("/upd_module", function(req,res) {
  handle_update_module_progress(req,res);
});

app.get("/module_content", function(req,res) {
  handle_get_content(req,res);
});
 
app.get("/resent_modules", function(req,res) {
  handle_get_revision_modules(req,res);
});
 
app.listen(4000);
