## 사용된 기술 목록
- nestjs
    * controller
    * provider
    * module
    * exception filter
    * custom decorator
    * pipe
    * guard
- 3rd party(built-in)
    * typeorm
    * jwt(jsonwebtoken)
    * swagger
    * dotenv
    * class-validator
    * jest
    
## 선행 작업
1. Mysql or MariaDB DB 서버
    - **db.sql** 테이블 생성

1. env 설정파일 작성 (파일 위치 : src > config > env)
    - .env.dev 파일 - 개발용 환경설정
    - .env.prod 파일 - 운영용 환경설정
    
## 설치 방법
```shell script
npm install
// or
yarn
```

## 프로젝트 실행
```shell script
// 개발 환경
npm run start:dev
// or
yarn start:dev
```

```shell script
// 운영 환경
npm run build
npm run start:prod
// or
yarn build
yarn start:prod
```

## Swagger 문서 확인
auth api document(로컬 기준) : http://localhost:3030/api/docs/auth<br>
user api document(로컬 기준) : http://localhost:3030/api/docs/user<br>
admin api document(로컬 기준) : http://localhost:3030/api/docs/admin
