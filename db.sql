create table admin
(
    id         bigint auto_increment
        primary key,
    email      varchar(255)                         not null comment '계정',
    password   char(60)                             not null comment '비밀번호',
    name       varchar(64)                          not null comment '이름',
    signin_at  datetime                             null comment '로그인 일자',
    created_at datetime default current_timestamp() not null comment '생성일자',
    updated_at datetime default current_timestamp() not null comment '수정일자',
    constraint email_UNIQUE
        unique (email)
)
    comment '관리자 계정 정보';

create table admin_api_token
(
    id                             bigint auto_increment comment 'PK'
        primary key,
    admin_id                       bigint                               not null comment '발급한 관리자 PK',
    access_token                   text                                 not null comment 'API 사용 권한 토큰',
    refresh_token                  text                                 not null comment '재 발급용 토큰',
    access_token_expired_datetime  datetime                             not null comment 'access token 만료일자',
    refresh_token_expired_datetime datetime                             not null comment 'refresh token 만료일자',
    created_at                     datetime default current_timestamp() not null comment '생성일자',
    constraint `FK_ADMIN-ADMIN_API_TOKENS`
        foreign key (admin_id) references admin (id)
)
    comment '관리자에게 발급된 토큰 목록';

create table user
(
    id         bigint auto_increment
        primary key,
    email      varchar(255)                         not null comment '로그인 ID 및 이메일',
    password   char(60)                             not null comment '비밀번호',
    name       varchar(64)                          not null comment '이름',
    nick_name  varchar(20)                          not null comment '별칭',
    memo       varchar(255)                         null comment '메모',
    signin_at  datetime                             null comment '로그인 일자',
    created_at datetime default current_timestamp() not null comment '생성일자',
    updated_at datetime default current_timestamp() not null comment '변경일자',
    constraint email_UNIQUE
        unique (email),
    constraint nick_name_UNIQUE
        unique (nick_name)
)
    comment '유저 계정 정보';

create table user_api_token
(
    id                             bigint auto_increment comment 'PK'
        primary key,
    user_id                        bigint                               not null comment '발급한 유저 PK',
    access_token                   text                                 not null comment 'API 사용 권한 토큰',
    refresh_token                  text                                 not null comment '재 발급용 토큰',
    access_token_expired_datetime  datetime                             not null comment 'access token 만료일자',
    refresh_token_expired_datetime datetime                             not null comment 'refresh token 만료일자',
    created_at                     datetime default current_timestamp() not null comment '생성일자',
    constraint `FK_USERS-USER_API_TOKENS`
        foreign key (user_id) references user (id)
)
    comment '유저에게 발급된 토큰 목록';


