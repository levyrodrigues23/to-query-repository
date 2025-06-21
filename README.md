# To Query Repository

Um site para buscar, adicionar e gerenciar repositórios do GitHub, visualizando informações detalhadas e issues de cada repositório.

## Índice

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Como Usar](#como-usar)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Desenvolvimento e Scripts](#desenvolvimento-e-scripts)
- [Licença](#licença)

---

## Visão Geral

O **To Query Repository** permite ao usuário:

- Buscar repositórios do GitHub utilizando a API pública.
- Adicionar repositórios de forma interativa e visualizá-los em uma lista local.
- Remover repositórios da sua lista.
- Visualizar detalhes e issues de cada repositório, filtrando por issues abertas, fechadas ou todas.

## Funcionalidades

- **Busca de repositórios**: Autocompletar e sugestões usando a API de busca do GitHub.
- **Gerenciamento local**: Os repositórios adicionados são salvos no `localStorage`, persistindo entre sessões.
- **Visualização de issues**: Acesse detalhes, issues e filtros de cada repositório.
- **Paginação e filtros**: Navegue entre issues com paginação e filtros por estado.
- **Remoção**: Remova repositórios da sua lista facilmente.

## Como Usar

1. **Instale as dependências**:

   ```bash
   npm install
   ```

2. **Rode o projeto em modo desenvolvimento**:

   ```bash
   npm run dev
   ```

3. **Abra no navegador**:

   Normalmente, acesse [http://localhost:5173](http://localhost:5173).

4. **Adicione um repositório**:

   - Digite o nome no formato `usuario/repositorio` no campo de busca.
   - Selecione uma sugestão ou adicione diretamente.

5. **Visualize e navegue**:

   - Clique no ícone de barras ao lado de um repositório para ver detalhes e issues.

## Estrutura do Projeto

```
src/
  ├── main.jsx                  # Ponto de entrada da aplicação
  ├── routes.jsx                # Definição das rotas
  ├── services/
  │     └── api.jsx             # Configuração do axios para API do GitHub
  ├── pages/
  │     ├── Main/
  │     │    ├── Index.jsx      # Página principal (adicionar/listar repositórios)
  │     │    └── Styles.jsx     # Estilos da página principal
  │     └── Repositorio/
  │           ├── index.jsx     # Página de detalhes do repositório
  │           └── Styles.tsx    # Estilos da página de repositório
  └── styles/
        └── global.jsx          # Estilos globais
```

- **Main**: Tela inicial para busca, sugestão, adição e remoção de repositórios.
- **Repositorio**: Tela de detalhes, mostrando informações do repositório e suas issues.

## Tecnologias Utilizadas

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Axios](https://axios-http.com/)
- [Styled-components](https://styled-components.com/)
- [React Router DOM](https://reactrouter.com/)
- [React Icons](https://react-icons.github.io/react-icons/)

## Desenvolvimento e Scripts

- `npm run dev`: roda o servidor de desenvolvimento com HMR
- `npm run build`: gera build de produção
- `npm run lint`: verifica padrões de código

## Licença

Este projeto é open source e está sob a licença MIT.

---

**Autor:** [levyrodrigues23](https://github.com/levyrodrigues23)
