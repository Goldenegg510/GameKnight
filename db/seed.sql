--create tables
create table users (
user_id serial primary key,
username varchar(50),
password varchar,
email varchar(50)
);

create table groups(
group_id serial primary key,
group_name varchar(50)
);

create table events (
event_id serial primary key,
event_date varchar(20),
group_id int references groups
);

create table messages (
message_id serial primary key,
user_id references users,
group_id references groups,
message varchar
);

create table games (
game_id serial primary key,
game_name varchar(150),
game_length int,
game_player_limit int
);

create table user_groups (
user_group_id serial primary key,
user_id int references users,
group_id int references groups
);

-- inserts
insert into users (
  username,
  password,
  email
) values (
  'JacobRHyer',
  'youShallNotPass',
  'Jacobrhyer@gmail.com'
), (
  'hyeraben',
  'youShallNotPass',
  'hyeraben@gmail.com'
);

insert into groups (
  group_name
) values (
  'fruitheights1'
  ), (
  'kaysville1'
  );

insert into events (
event_date,
group_id
) values (
'Thurs May 9th',
1
), (
'Thurs May 16th',
1
), (
'Wed May 8th',
2
), (
'Wed May 15th',
2
)

insert into user_groups (
user_id,
group_id
) values (
1,
1
), (
1,
2
),(
2,
1
)
