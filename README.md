# API de Games

Esta API é utilizada Games

## Endpoints
### GET /games
Esse endpoint é responsável por retornar a listagem de todos os games cadastrados no banco de dados.
#### Parâmetros
Nenhum
#### Respostas
##### OK! 200
Caso essa resposta aconteça, você vai receber a listagem de todos os games.
Exemplo de resposta:
````
[
	{
		"id": 23,
		"title": "Call of duty MW",
		"year": 2019,
		"price": 60
	},
	{
		"id": 65,
		"title": "Sea of thieves",
		"year": 2018,
		"price": 40
	},
	{
		"id": 2,
		"title": "Minecraft",
		"year": 2012,
		"price": 20
	}
]
````
##### Falha na autenticação! 401
Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autenticação da requisição. Motivos: Token inválido, Token expirado.
 
Exemlo de resposta:

````
{
	"err": "Token inválido!"
}
````

### POST /auth
Esse endpoint é responsável por fazer o processo de login.
#### Parâmetros
email: E-mail do usuário cadastrado no sistema.
password: Senha do usuário cadastrado no sistema, com aquele determinado e-mail

Exemplo:
````
{
	"email":"marcelolcarvalho@gmail.com",
	"password":"123456"
}
````

#### Respostas
##### OK! 200
Caso essa resposta aconteça, você vai receber o token JWT para conseguir acessar endpoints protegidos na API.
Exemplo de resposta:
````
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtYXJjZWxvbGNhcnZhbGhvQGdtYWlsLmNvbSIsImlhdCI6MTY2NzY4NDA4MSwiZXhwIjoxNjY3ODU2ODgxfQ.vfqFpFDfKSQQKG7gohAdB_we6vFzrz0glAUwIw2fhWs"
}
````
##### Falha na autenticação! 401
Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autenticação da requisição. Motivos: Senha ou e-mail incorretos.
 
Exemlo de resposta:

````
{err: "Credenciais inválidas!"}
````