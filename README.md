### Início
1. Abra seu terminal e clone este projeto com o seguinte comando "git clone https://github.com/IsraExe/beer-world.git"

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

### Requisitos
- Somente node versão 20 ou superior.  

### Requisitos feitos:
- Todos os endpoints de consulta de dados devem ter autenticação por webtoken ou similar ✔️
- Interface de login com feedbacks de usuário ou senha incorreta ✔️
- Listagem dos dados da API ✔️
- Paginação dos dados ✔️
- Build para produção: https://beer-world.onrender.com ✔️
- Dockerfile com todas dependências ✔️
