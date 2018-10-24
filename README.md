_Структура_  
```
- views/   
  - home.handlebars   
  - layouts/   
    - main.handlebars  	
- public/   
  - main.js     
  - style.css 
- app.js   
- index.js  
- .gitignore
- package.json  
- package-lock.json
```  
_Локально_  
1. `git clone https://github.com/Uniyar/Messenger-Express-Postgresql.git`
2. `npm install`  
3. `node app`  

_Предварительная работа в SQL SHELL(psql)_   
Создаем новую таблицу     
```
CREATE table messenger(
id serial primary key,
name varchar(50) not null,
message varchar(280) not null
);
```
`psql \! chcp 1251` - исправить шрифт  
`\dt` - список таблиц  
удалить таблицу: `DROP TABLE messenger;`  
вставка в таблицу: `INSERT INTO messenger VALUES (1, '<YOUR_NAME>', '<YOUR_MESSAGE>');`  
просмотр содержимого: `SELECT * FROM messenger;`  
