# Contrata-se.dev API

> Agregador de vagas para pessoas desenvolvedoras :computer::smile:

## Rodando o projeto localmente

**1 -** Clone o projeto e instale as dependêcias:

```sh
$ git clone https://github.com/Kaisen-san/contrata-se-dev-api.git
$ cd contrata-se-dev-api
$ npm install
```

**2 -** Rode o servidor:

```sh
$ npm start
```

## Consumindo a API

Atualmente, apenas as issues abertas de repositórios do GitHub são retornadas pela API.

Os formatos de request suportados são:

* Para retornar todas as issues abertas de um repositório:
  * `GET` --> `http://localhost:4000/api/v1/github/:accountName/:repoName`

* Para retornar as issues abertas de uma página específica de um repositório:
  * `GET` --> `http://localhost:4000/api/v1/github/:accountName/:repoName/:issuePage`

`:accountName` Nome da conta no GitHub. Exemplo: `frontendbr`, `backend-br`, `LarissaAbreu`

`:repoName` Nome de um repositório da conta acima. Exemplo: `vagas` (repositório tanto do `frontendbr` quanto do `backend-br`), `contrata-se-dev` (repositório da `LarissaAbreu`)

`:issuePage` Número de uma das páginas de issues do repositório acima (uma vez que a API do GitHub faz paginação dos resultados)

Para ambas as requisições um array com as issues abertas será retornado, cada issue contento os seguintes campos:

```JSON
[
  {
    "title": "SOME_TITLE",
    "html_url": "SOME_URL",
    "created_at": "SOME_DATE",
    "labels": {
      "name": "SOME_LABEL",
      "color": "SOME_COLOR"
    }
  },
]
```

Utilizando o navegador ou alguma ferramenta de consumo de APIs, como [Insomnia](https://insomnia.rest/) (:heart:) ou [Postman](https://www.getpostman.com/), tente os seguintes exemplos:

* `GET` --> `http://localhost:4000/api/v1/github/frontendbr/vagas/1`

* `GET` --> `http://localhost:4000/api/v1/github/frontendbr/vagas`

* `GET` --> `http://localhost:4000/api/v1/github/backend-br/vagas/21`

* `GET` --> `http://localhost:4000/api/v1/github/backend-br/vagas`

## Versionamento

Para manter uma melhor organização, seguiremos as diretrizes do [Versionamento Semântico 2.0.0](http://semver.org/).

## Contribuição

Veja no [guia](https://github.com/LarissaAbreu/contrata-se-dev/issues) os próximos passos do projeto :wink:

Quer contribuir? [Siga essas recomendações](https://github.com/Kaisen-san/contrata-se-dev-api/blob/master/CONTRIBUTING.md).

## Licença

[Licença MIT](https://github.com/Kaisen-san/contrata-se-dev-api/blob/master/LICENSE.md) © [Felipe Andrade](https://github.com/Kaisen-san)
