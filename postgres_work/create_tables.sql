-- user table
CREATE TABLE USERS (
    name VARCHAR(255) DEFAULT '',
    mobile VARCHAR(255) NOT NULL PRIMARY KEY,
    contacts VARCHAR[] default '{}',
    profile_pic VARCHAR(255) default '',
    about  VARCHAR(255) DEFAULT ''
)
-- Message store table

CREATE TABLE MsgStore (
    msg_id SERIAL NOT NULL,
    sender VARCHAR(255) NOT NULL,
    receiver VARCHAR(255) NOT NULL,
    msg text NOT NULL,
    msgread boolean default false,
    reached_server boolean default false,
    msgtime timestamp with time zone NOT NULL,
    msgtype VARCHAR(255) NOT NULL,
    msglink text default '',
    msgcaption text default '',
    media_data BYTEA DEFAULT NULL
)