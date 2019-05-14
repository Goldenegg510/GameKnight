insert into events(
  event_date,
  group_id,
  place,
  time
) values (
${event_date},
${group_id},
${place},
${time}
) returning event_id;