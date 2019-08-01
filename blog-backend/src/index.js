require('dotenv').config();

const Koa = require('koa');
const Router = require ('koa-router');
const bodyParser = require('koa-bodyparser');

const api = require('./api');

const mongoose = require('mongoose');

const session = require('koa-session');


const {
    PORT:port = 4000,   //값이 존재하지 않을때 4000값을 기본으로 사용
    MONGO_URI:mongoURI,
    COOKIE_SIGN_KEY: signKey
} = process.env;

const app = new Koa();
const router = new Router();

mongoose.Promise = global.Promise;  //Node의 Promise를 사용하도록 설정.
mongoose.connect(mongoURI,{useNewUrlParser:true}).then(() => {
    console.log('connected to mongodb');
  }).catch((e) => {
    console.error(e);
  });

//라우터 설정
router.use('/api', api.routes());

//라우터 적용 전에 bodyparser 적용
app.use(bodyParser());


//세션/키 적용
const sessionConfig = {
  maxAge: 8640000,  //하루
  //signed: true(기본으로 설정되어 있습니다.)
}

app.use(session(sessionConfig, app));
app.key = [signKey];

//app인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());


app.listen(port,()=>{
    console.log('listening port',port);
});

