update users
set username = ${newUserName}
set email = ${email}
set password = ${hash}
where user_id = ${user_id}
returning user_id