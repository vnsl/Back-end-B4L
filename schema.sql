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

insert into categoria (nome, img_categoria) values ('Diversos', 'https://photos.google.com/share/AF1QipNoDo7OLjuUxxNzpotpQm7gk_VHu26aHnJDTBGrsMlvyLgmgjnR2YhyYon20cysmg/photo/AF1QipPWG2BDgPDB0Axv4S2wnkanySKdJYJ6eI85gsIz?key=WC1LXzhrUTc0MXMwV0xYNFdXLVk4VnFEN19WMzln');
insert into categoria (nome, img_categoria) values ('Lanches', 'https://photos.google.com/share/AF1QipNoDo7OLjuUxxNzpotpQm7gk_VHu26aHnJDTBGrsMlvyLgmgjnR2YhyYon20cysmg/photo/AF1QipOGG4Zo-QPpltU8qUgRzKjYXGjY2aoZFaaeHS2y?key=WC1LXzhrUTc0MXMwV0xYNFdXLVk4VnFEN19WMzln');
insert into categoria (nome, img_categoria) values ('Carnes', 'https://photos.google.com/share/AF1QipNoDo7OLjuUxxNzpotpQm7gk_VHu26aHnJDTBGrsMlvyLgmgjnR2YhyYon20cysmg/photo/AF1QipMgThkTBqZ0w3qMukX6OTEBrxpMnWv0xAsYqck_?key=WC1LXzhrUTc0MXMwV0xYNFdXLVk4VnFEN19WMzln');
insert into categoria (nome, img_categoria) values ('Massas', 'https://photos.google.com/share/AF1QipNoDo7OLjuUxxNzpotpQm7gk_VHu26aHnJDTBGrsMlvyLgmgjnR2YhyYon20cysmg/photo/AF1QipMpU_qbRk_J20vVrBiiuBrJtv1ghOXpKK6of6hh?key=WC1LXzhrUTc0MXMwV0xYNFdXLVk4VnFEN19WMzln');
insert into categoria (nome, img_categoria) values ('Pizzas', 'https://photos.google.com/share/AF1QipNoDo7OLjuUxxNzpotpQm7gk_VHu26aHnJDTBGrsMlvyLgmgjnR2YhyYon20cysmg/photo/AF1QipN-QFZ6uD4DbjqGYCWMEbVuYqEqRdWa39IEu48T?key=WC1LXzhrUTc0MXMwV0xYNFdXLVk4VnFEN19WMzln');
insert into categoria (nome, img_categoria) values ('Japonesa', 'https://photos.google.com/share/AF1QipNoDo7OLjuUxxNzpotpQm7gk_VHu26aHnJDTBGrsMlvyLgmgjnR2YhyYon20cysmg/photo/AF1QipP7opfjea-psdaJHJqitq7f8AH1q8ZAo1vlgU-_?key=WC1LXzhrUTc0MXMwV0xYNFdXLVk4VnFEN19WMzln');
insert into categoria (nome, img_categoria) values ('Chinesa', 'https://photos.google.com/share/AF1QipNoDo7OLjuUxxNzpotpQm7gk_VHu26aHnJDTBGrsMlvyLgmgjnR2YhyYon20cysmg/photo/AF1QipOVfA6lMGYpMiModj8GCtSesTdB6GSTx5wUDEdz?key=WC1LXzhrUTc0MXMwV0xYNFdXLVk4VnFEN19WMzln');
insert into categoria (nome, img_categoria) values ('Mexicano', 'https://photos.google.com/share/AF1QipNoDo7OLjuUxxNzpotpQm7gk_VHu26aHnJDTBGrsMlvyLgmgjnR2YhyYon20cysmg/photo/AF1QipNDuEnWq8uCy7duZtwu-PEHo1k_qwa1kA0raLdc?key=WC1LXzhrUTc0MXMwV0xYNFdXLVk4VnFEN19WMzln');
insert into categoria (nome, img_categoria) values ('Brasileira', 'https://photos.google.com/share/AF1QipNoDo7OLjuUxxNzpotpQm7gk_VHu26aHnJDTBGrsMlvyLgmgjnR2YhyYon20cysmg/photo/AF1QipNTLqIuwqcY8V_OU6o5cM0GQOP2TgA8f-el-Q8q?key=WC1LXzhrUTc0MXMwV0xYNFdXLVk4VnFEN19WMzln');
insert into categoria (nome, img_categoria) values ('Italiana', 'https://photos.google.com/share/AF1QipNoDo7OLjuUxxNzpotpQm7gk_VHu26aHnJDTBGrsMlvyLgmgjnR2YhyYon20cysmg/photo/AF1QipPeM1FqaVC_IQttyx5reH4evrpGSqINIvPX9z68?key=WC1LXzhrUTc0MXMwV0xYNFdXLVk4VnFEN19WMzln');
insert into categoria (nome, img_categoria) values ('Árabe', 'https://photos.google.com/share/AF1QipNoDo7OLjuUxxNzpotpQm7gk_VHu26aHnJDTBGrsMlvyLgmgjnR2YhyYon20cysmg/photo/AF1QipM93gns4k-WGCpkyOJtkqrF6fDoDFR_-kUUPY4y?key=WC1LXzhrUTc0MXMwV0xYNFdXLVk4VnFEN19WMzln');

