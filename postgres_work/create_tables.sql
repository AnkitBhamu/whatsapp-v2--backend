-- user table
CREATE TABLE USERS (
    name VARCHAR(255) DEFAULT '',
    mobile VARCHAR(255) NOT NULL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    contacts VARCHAR[] default '{}',
    profile_pic VARCHAR(255) default '',
    about  VARCHAR(255) DEFAULT ''
)
-- Message store table

CREATE TABLE MsgStore (
    sender VARCHAR(255) NOT NULL,
    receiver VARCHAR(255) NOT NULL,
    msg text NOT NULL,
    msgread boolean default false,
    opened boolean default false,
    msgtime timestamp NOT NULL,
    msgtype VARCHAR(255) NOT NULL,
    msglink text default '',
    msgcaption text default ''
)