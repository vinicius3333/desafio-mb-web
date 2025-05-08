# Desafio MB Web

Somos a maior plataforma de negociação de criptomoedas e ativos alternativos da América Latina, criada para elevar a experiência de quem vivencia essa revolução, entregando o melhor serviço de negociação de ativos alternativos, com liberdade, segurança e liquidez. Sendo assim, nós existimos para mudar a maneira como as pessoas lidam com o dinheiro através da tecnologia.

* [Como rodar](#como-rodar)
  * [Docker](#docker)
  * [Local](#local)
  * [Express com build](#express-com-build)

## Requisitos
- Node 20+

## Como rodar

### Docker
Execute o app com o docker rodando o seguinte comando na raiz do projeto:
``` bash
docker compose -f 'docker-compose.yml' up -d --build
```
Agora já é possível acessar clicando em [http://localhost:3000/registration](http://localhost:3000/registration).

<sub>Obs: certifique-se que a sua porta 3000 não está sendo usada por outra aplicação.</sub>

### Local
Também é possível rodar as aplicação em modo de desenvolvimento, basta que você rode o front e o back ao mesmo tempo, com os seguintes comandos:

Front-end:
``` bash
cd mb-vue
npm install
npm run dev
```

Back-end:
``` bash
cd ../mb-api
npm install
npm run dev
```
Para acessar a aplicação web, clique em [http://localhost:5173](http://localhost:5173).

### Express com build
Por último, você pode buildar o projeto local do front e fazer com que o backend retorne esse html e simule um ambiente de produção localmente.

Começamos no front-end:
``` bash
cd mb-vue
npm run build
cp dist/ ../mb-api/public -r // esse comando é importante para enviar os arquivos html/css/js para a pasta public do back
```

Agora no back-end:
``` bash
cd ../mb-api
npm start
```
Pronto, agora você acessar a app em [http://localhost:3000/registration](http://localhost:3000/registration).
