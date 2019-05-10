select g.group_name, g.group_id from groups g
join user_groups ug on ug.group_id = g.group_id
join users u on u.user_id = ug.user_id
where u.user_id = ${user_id}