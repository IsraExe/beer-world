# Instruções para rodar o projeto

### Backend e banco de dados
1. Abra um terminal da pasta "backend" e digite "npm i" para baixar todas as dependências do projeto.
2. Crie um arquivo na raíz da pasta "backend" chamado de ".env".
3. Copie todo o texto que está o ".env.example" e cole para o arquivo ".env". Mude o valor das variáveis de ambiente conforme as necessidade do seu ambiente local.
4. Crie um banco de dados usando a ferramente de sua preferência com o mesmo nome do banco que você colocou no ".env" do projeto. Caso tenha usado o exemplo dado, o banco deve se chamar "beer_world".
5. Starte o projeto escrevendo "npm run dev" no terminal.

### Front-end
1. Abra o terminal da pasta "frontend" e digite "npm i" para baixar todas as dependências do projeto.
2. Crie um arquivo na raíz da pasta "frontend" chamado de ".env".
3. Copie todo o texto que está o ".env.example" e cole para o arquivo ".env". Mude o valor das variáveis de ambiente conforme as necessidade do seu ambiente local.
4. Starte o projeto escrevendo "npm run dev" no terminal.

### Informações importantes
- Desenvolvido em node versão 20.15.0.
- Há duas versões de autorização de token. A de cookies é a oficial. A que salva no localstorage foi somente para o deploy funcionar em sua totalidade na hospedagem gratuita da onrender, pois após muita pesquisa descobri que tinha essa limitação.
- Como não foi desenvolvido um sistema de permissão, as rotas de CRUD funcionam apenas ao próprio usuário. Por exemplo, o usuário só pode editar a si mesmo.

### Requisitos feitos:
- Todos os endpoints de consulta de dados devem ter autenticação por webtoken ou similar ✔️
- Interface de login com feedbacks de usuário ou senha incorreta ✔️
- Listagem dos dados da API ✔️
- Paginação dos dados ✔️
- Build para produção: https://beer-world.onrender.com ✔️
- Dockerfile com todas dependências ✔️

## Endpoints

### Criar Usuário
- **Endpoint:** `/user/create`
- **Método:** POST
- **Descrição:** Cria um novo usuário com as informações fornecidas.
- **Body da Requisição:**
    ```json
    {
        "name": "string",
        "email": "string",
        "password": "string"
    }
    ```

### Atualizar Usuário
- **Endpoint:** `/user/update`
- **Método:** PUT
- **Descrição:** Atualiza o usuário com as informações fornecidas.
- **Body da Requisição:**
    ```json
    {
        "name": "string",
        "email": "string",
        "password": "string"
    }
    ```

### Listar Todos os Usuários
- **Endpoint:** `/user/list`
- **Método:** GET
- **Descrição:** Retorna todos os usuários registrados.

### Deletar Usuário
- **Endpoint:** `/user/delete`
- **Método:** DELETE
- **Descrição:** Deleta o usuário.

### Login Usuário
- **Endpoint:** `/user/login`
- **Método:** POST
- **Descrição:** Faz o login na aplicação de acordo com as informações fornecidas.
- **Body da Requisição:**
    ```json
    {
        "email": "string",
        "password": "string"
    }
    ```
### Deslogar Usuário
- **Endpoint:** `/user/logout`
- **Método:** GET
- **Descrição:** Desloga usuário da aplicação.