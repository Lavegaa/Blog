const Post = require('../../models/post');
const Joi = require('joi');

const {ObjectId} = require('mongoose').Types;

exports.checkObjectId = (ctx, next) =>{
    const {id} = ctx.params;

    //검증 실패
    if(!ObjectId.isValid(id)){
        ctx.status = 400;   //400 Bad Request
        return null;
    }

    return next();  //next를 리턴해야 ctx.body가 제대로 설정됨.
};

exports.checkLogin = (ctx, next) => {
    if(!ctx.session.logged) {
        ctx.status = 401;   //Unathorized
        return null;
    }
    return next();
}

/*
    포스트 작성
    POST /api/posts
    { title,body,tags}
*/

exports.write = async (ctx) => {
    //객채가 지닌 값들을 검증
    const schema = Joi.object().keys({
        title:Joi.string().required(),  //뒤에 required를 붙여 주면 필수 항목이라는 의미
        body:Joi.string().required(),
        tags:Joi.array().items(Joi.string()).required()
    });
    //첫 번째 파라미터는 검증할 객체, 두 번째는 스키마
    const result = Joi.validate(ctx.request.body,schema);
    //오류가 발생하면 오류 내용 응답.
    if(result.error){
        ctx.status = 400;
        ctx.body = result.error;
        return;
    }

    //REST API의 request body는 ctx.request.body에서 조회할 수 있다.
    const {
        title,
        body,
        tags
    } = ctx.request.body;

   const post = new Post({
       title,body,tags
   });

   try {
    await post.save(); // 데이터베이스에 등록합니다.
    ctx.body = post; // 저장된 결과를 반환합니다.
  } catch (e) {
    // 데이터베이스의 오류 발생
    ctx.throw(e, 500);
  }

}

/*
    포스트 목록 조회
    GET /api/posts
*/
exports.list = async (ctx) => {

    //page가 주어지지 않았다면 1로 간주
    //query는 문자열 형태로 받아 오르므로 숫자로 변환
    const page = parseInt(ctx.query.page || 1,10);
    const { tag } = ctx.query;

    const query = tag ? {
        tags: tag   //tags배열에 tag를 가진 포스트 찾기
    } : {}

    //잘못된 페이지가 주어졌다면 오류
    if(page<1){
        ctx.status = 400;
        return;
    }

    try {
        //sort 1오름차순,-1내림차순
        const posts = await Post.find(query)
        .sort({_id:-1})
        .limit(10)
        .skip((page-1)*10)
        .lean()
        .exec();
        const postCount = await Post.countDocuments().exec();
        //마지막 페이지 알려주기
        //ctx.set은 response header를 설정
        ctx.set('Last-page',Math.ceil(postCount/10));
        const limitBodyLength = post => ({
            //원치 않는 데이터가 들어가는 현상 해결방법.
            //위에 exec하기 전에 lean하거나 다음과 같이 json형식으로 받음.
            //...post.toJSON(),
            ...post,
            body:post.body.length<200 ? post.body : `${post.body.slice(0,200)}...`
        });
        ctx.body = posts.map(limitBodyLength);
    } catch(e){
        ctx.throw(e,500);
    }
};

/*
    특정 포스트 조회
    GET /api/posts/:id
*/
exports.read = async (ctx) => {

    const {id} = ctx.params;

    try{
        const post = await Post.findById(id).exec();

        if(!post){
            ctx.status = 404;
            return;
        }
        ctx.body = post;
    } catch(e) {
        ctx.throw(e,500);
    }
};

/* 특정 포스트 제거
    DELETE /api/posts/:id
*/

exports.remove = async (ctx) => {
    const {id} = ctx.params;
    
    try {
        await Post.findByIdAndRemove(id).exec();
        ctx.status = 204;
    } catch (e) {
        ctx.throw(e,500);
    }

};



/* 포스트 수정(특정 필드 변경)
    PATCH /api/posts/:id
    { title, body}}
*/

exports.update =  async (ctx) => {
    //PATCH 매서드는 주어진 필드만 교체합니다.
    const {id} = ctx.params;

    try {
        const post = await Post.findByIdAndUpdate(id,ctx.request.body,{
            new:true
            //이 값을 설정해야 업데이트 된 객체를 반환한다.
            //설정하지 않으면 업데이트되기 전의 객체를 반환한다.
        }).exec();
        //포스트가 존재하지 않을 때
        if(!post){
            TextTrack.status = 404;
            return;
        }
        ctx.body = post;
    } catch (e) {
        ctx.throw(e,500);
    }
};


