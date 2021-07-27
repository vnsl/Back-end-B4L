create database cubos_food;

create table if not exists categoria (
	id serial primary key,
  	nome varchar(30) not null
);

create table if not exists usuario (
	id serial primary key,
  	nome varchar(100) not null,
  	email varchar(100) not null,
  	senha text not null
);

create table if not exists restaurante (
	id serial primary key,
  	usuario_id int not null,
  	nome varchar(50) not null,
  	descricao varchar(100),
  	categoria_id int not null,
  	taxa_entrega int default 0,
	tempo_entrega_minutos int default 30,
  	valor_minimo_pedido int default 0,
  	foreign key (usuario_id) references usuario (id),
  	foreign key (categoria_id) references categoria (id) 	
);

create table if not exists produto (
	id serial primary key,
  	restaurante_id int not null,
  	nome varchar(50) not null,
  	descricao varchar(100),
  	preco int not null,
  	ativo boolean default true,
  	permite_observacoes boolean default false,
  	foreign key (restaurante_id) references restaurante (id) 
);

