create table user(
    id int primary key AUTO_INCREMENT,
    name varchar(250),
    contactNumber varchar(20),
    email varchar(250),
    password varchar(250),
    status varchar(20),
    role varchar(20),
    UNIQUE (email)
);

insert into user(name, contactNumber, email, password, status, role) values('Admin', '1231231231', 'admin@gmail.com', 'admin', 'true', 'admin');
-- insert into user(name, contactNumber, email, password, status, role) values('Test', '987654321', 'iva55@ethereal.email', 'DrX5XeQ9KY1SNxQs3M', 'false', 'user');
-- insert into user(name, contactNumber, email, password, status, role) values('Ramon', '0632588154', 'rallyshops@gmail.com', '01051505', 'false', 'user');

create table category(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    primary key(id)
);

create table product(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    categoryId integer NOT NULL,
    description varchar(255),
    price integer,
    status varchar(20),
    primary key(id)
);