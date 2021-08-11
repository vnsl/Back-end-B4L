create table if not exists consumidor (
	id serial primary key,
  	nome varchar(100) not null,
  	email varchar(100) not null,
	telefone int not null,
  	senha text not null
);