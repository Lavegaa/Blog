# Blog

본 프로젝트는 Velopert님의 강좌를 보고 제작했다.  
React 기반으로 제작한 블로그다. 마크다운 문법을 사용해 게시물을 구조적으로 작성 할 수 있다.  
##에디터
![editor](https://user-images.githubusercontent.com/34911173/67914400-57219280-fbd3-11e9-8c71-48959ee6feaf.PNG)

# 빠른 시작

## 클론

```
git clone https://github.com/Lavegaa/Blog.git
```

## Backend dependencies 설치

```
cd blog-backend
```

```
yarn
```

## Frontend dependencies 설치

```
cd blog-frontend
```

```
yarn
```

# 라이브러리

## Backend

- mongoose
- koa
- koa-bodyparser
- koa-router
- koa-session
- dotenv

## Frontend

- react
- redux
- redux-actions
- redux-pender
- react-router-dom
- axios
- query-string
- immutable
- node-sass
- open-color

### 마크다운 에디터

- codemirror
- marked
- prismjs
- remove-markdown
  > Backend의 포트(4000)와 Frontend의 포트(3000)가 달라 proxy를 통해 접속했다.
