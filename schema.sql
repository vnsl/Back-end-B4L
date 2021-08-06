create database cubos_food;

create table if not exists categoria (
	id serial primary key,
  	nome varchar(30) not null,
	img_categoria text
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

insert into categoria (nome, img_categoria) values ('Diversos', 'https://lh3.googleusercontent.com/pw/AM-JKLUNwWTErcIf-m9zTGZqQ73nOZv4FqTguxTgeX9xnR_cceWMAVMr5uKxUbOmudPNQBIXVjs_Bl2sIQSWISVGZo2CN72_7oA-kdCSVTYwB7hgHLkDwVRQrosYIkI6aGo56WKtAMlXJWTGjdrlpS6rZ-em=w1366-h236-no?authuser=0');
insert into categoria (nome, img_categoria) values ('Lanches', 'https://lh3.googleusercontent.com/pw/AM-JKLUEnUZVkJH2dTYFhSq8tmBZc54U7NUI4gHPTA5uZKxXafY93H1wNXMKx4VvEyn1iSDStJ6p1lplmfrk24NHjPk8qpHa4isvH7-FXxzO3Y_9H1sEqt6rOTieQ91EKJXGak-1h9z8_SCoMcsgwqDzw0zA=w1366-h236-no?authuser=0');
insert into categoria (nome, img_categoria) values ('Carnes', 'https://lh3.googleusercontent.com/pw/AM-JKLVYBFg6novN5jDKGNTxYr7dgIu8DztOz-i9OkQ19249PaWCBMKKsYlw2vgyI95Rqo-LTxWgyTpmTFG_q5_vrMUmYxXpEd4UI4a2d5Gb1_Hw0tif6gZv_faquXQGEWrQ9h2rd6igJRcP0cW4lN-UenVq=w1366-h236-no?authuser=0');
insert into categoria (nome, img_categoria) values ('Massas', 'https://lh3.googleusercontent.com/pw/AM-JKLVTAY675SBlIdg-QXBPVVNPOEfWx_u2J13JodJT6KM2gsaJispeAoHNmcQUBh7Lnt9UO9EgeXO0MC8ki2jX2nTwL0jM42KTPJ-h3Rm3WmbJ22950OrFCCW141n9iCxGxN7nK_qsO_c_kj3NmP93xJCs=w1366-h236-no?authuser=0');
insert into categoria (nome, img_categoria) values ('Pizzas', 'https://lh3.googleusercontent.com/pw/AM-JKLXqviTkSIXHbeKBipJeDELtIR3GUDaCCK-PhQR6ZRpnc2dG8Tybk5WQ247gXIxFpfvhjKSv8-51LJG3edH76Xu_J9vxe8i0p4SZEKu209jwGJRu8q6rA-9R81bsG24-xJ3FJzFBO42HeTBJ844Uk4zi=w1366-h236-no?authuser=0');
insert into categoria (nome, img_categoria) values ('Japonesa', 'https://lh3.googleusercontent.com/pw/AM-JKLWUP9boxFhLUcjgxR2VzIgRrgeIzIUB8sTGEWosGoyUzfNt9MSgk0JPPPoEfKvOIMI_zO8pcnQ5WFM5gzX4ACpLvJ7ck040aWIFvXmX55EpCGsfAklO7onQl5D6MlxMIO0LZcJEAOXIagwdN_-zKVMJ=w1366-h236-no?authuser=0');
insert into categoria (nome, img_categoria) values ('Chinesa', 'https://lh3.googleusercontent.com/pw/AM-JKLVFU2Hw1LelKdBXijDJ3Vxj7MgnaKASZbYdWcJlFK4CZDPGn5ZMGVZeLVPnVt-QW9Xqo9VaUNDSuXbOsaUo49Wyp7bj0C9zez0f-KMT7YyFfdzgPRSNtAXfJ0-gkZ3BRsXhvMMvIHxmOQTZp5Fl9Nl_=w1366-h236-no?authuser=0');
insert into categoria (nome, img_categoria) values ('Mexicano', 'https://lh3.googleusercontent.com/pw/AM-JKLUBZDEFpA2WI1SN10KWm2kzoPUjqjp5b8XJYk0v6YjUF-a-icyQrIDRD2u7j-6hwhiem3LPfp-ArPKU9mN7j97z50kr21my7VjdZ3fk0gSmL-rXuzuod4E2WKy_suOAXXCE1nemkO0kG5WPhE6cfyff=w1366-h236-no?authuser=0');
insert into categoria (nome, img_categoria) values ('Brasileira', 'https://lh3.googleusercontent.com/pw/AM-JKLUh_IAcoFunHo0EiJFRWfiq9z10dzUTJWcFivY6orCoKn5UpciddmJuUSbnrX4h9qM_MlFDE3boqhcl1EoGcBLLyqil7KvlZwvjDDv5y9LAPyEZH_5BBeZCmabQdLLxryJcBVIhLlyjJoUva_hutXWM=w1366-h236-no?authuser=0');
insert into categoria (nome, img_categoria) values ('Italiana', 'https://lh3.googleusercontent.com/pw/AM-JKLUcY8UzcvHSRfjs2uYLhUQJbqzFdZdw8bJS_jAKFxY1FhO1a1Q996_r0UEUeDBZUTSbRYT43802NpblH70OM9OEBOsmGDYon6FRpNbDu7Kt95BtrRVioWyDJ3yLtx5U9AGO0NNiyiQN3EshjSsRReDr=w1366-h236-no?authuser=0');
insert into categoria (nome, img_categoria) values ('Árabe', 'https://lh3.googleusercontent.com/pw/AM-JKLUiDs4SyCM4Ll7B1bA11EjTZUPiJmBVN37N1DBJl-xG9LeC_neJjdjtEiB8ty2Q6qt1Gscuw82noVFCq6pChNhb5Vfaw_d-iM_36551FGS6cYLOtJcXIOYm_Iv-pkTouL9p-K5EOg-cvCqJKKTWLd1A=w1366-h236-no?authuser=0');
