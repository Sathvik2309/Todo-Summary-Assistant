-- SQL to create the todos table in Supabase
create table if not exists todos (
  id serial primary key,
  task text not null,
  completed boolean default false
);
