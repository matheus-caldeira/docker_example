# Docker_example



### Resumo
Exemplo de uso do docker-compose com Node + Typescript + Banco de Dados. 

***Esse projeto não tem como foco a arquitetura de código*** 

### Projeto

Foi desenvolvido um pequeno Crud que salva o nome do usuário em um banco de dados.

| Rotas | Método | URL |
| ------ | ------ | ------ |
| Create | Post | http://locahost:3333/ |
| Show | Get | http://locahost:3333/all |
| ID | Get | http://locahost:3333/:id |
| Update | Put | http://locahost:3333/:id |
| Delete | Delete | http://locahost:3333/:id |

### Tecnologia

Desenvolvido com as seguintes tecnologias:

* [Node.js] -  JavaScript runtime built on Chrome's V8 JavaScript engine.
* [Express] -  Fast node.js network app framework
* [TypeORM] -  ORM that can run in NodeJS and can be used with TypeScript and JavaScript


### Instalação

Necessário ter instalado o [Docker], incluindo o docker-compose.

Para rodar o projeto é necessário configurar o arquivo .env, existe um exemplo dispónivel [.env.example]

```sh
$ git clone https://github.com/matheus-caldeira/docker_example
$ cd docker_example
$ cp .env.example .env
```



#### Docker

Agora é necessário criar o container da aplicação.

Primeiro vamos fazer a build do container:
```sh
$ docker-compose build
```

Em seguida vamos rodar o container:
```sh
$ docker-compose up -d
```
> A flag `-d` serve para executar o container em segundo plano.

E por último vamos rodar as migrações:
```sh
$ docker-compose run app yarn typeorm migration:run
```

(Opicional) Para conferir individualmente o output de cada container, você pode rodar o comando:
```sh
$ docker-compose logs -f --tail=10 app
```

Pronto! A aplicação já está rodando na porta definida no .env, por padrão a 3333.
### Desenvolvimento 
Caso você abra o projeto em seu editor provavelmente vai acusar alguns erros de syntax, porque estamos utilizando Typescript e ele não localizou as dependencias utilizadas no projeto.

> Caso seu projeto seja feito apenas em Javascript não é necessário fazer isso.

Uma alternativa que encontrei foi remover a seguinte linha do arquivo `docker-compose.yml`
```sh
- /usr/app/node_modules
```

Para isso funcionar é necessário parar o container atual e rodar:
```sh
$ docker-compose run app yarn
```
> Vai ser criado uma pasta node_modules localmente na sua máquina, porém com permissão de root, pois é o user padrão nos container, para mais informações consulte [Docker].
> Para redifinir as permissões basta rodar `sudo chown -R $USER:$USER .`

Agora basta executar o container normalmente
```sh
$ docker-compose up -d
```

Para instalação de dependencias basta utilizar o seguinte comando:
```sh
$ docker-compose run app <command>
```
> No caso `app` é o nome do container definido em `docker-compose.yml`
> Exemplo: docker-compose run app yarn add cors
> Exemplo: docker-compose run app yarn typeorm migration:generate 

### Produção
Para rodar a aplicação em produção é necessário alterar o .env...

```sh
NODE_ENV=production
...
TYPEORM_ENTITIES=./dist/typeorm/entities/*.js
TYPEORM_MIGRATIONS=./dist/typeorm/migrations/*.js
TYPEORM_MIGRATIONS_DIR=./dist/typeorm/migrations
...
```

Gerar a build do projeto com:
```sh
$ docker-compose run app yarn build
```

Rodar as migrações:
```sh
$ docker-compose run app yarn typeorm migration:run
```

E iniciar o container:
```sh
$ docker-compose up -d
```

License
----

MIT


[//]: #
   [Node.js]: <http://nodejs.org>
   [Express]: <https://expressjs.com/>
   [Docker]: <https://docker.com/>
   [TypeORM]: <https://typeorm.io/#/>
   [.env.example]: <https://github.com/matheus-caldeira/docker_example/blob/main/.env.example>
   
