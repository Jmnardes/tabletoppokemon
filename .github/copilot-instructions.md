---
applyTo: "**"
---

# PokeTactics — Convenções e Padrões do Projeto

## Arquitetura

- **SPA React 18** com Chakra UI, sem react-router (navegação por estado).
- **Estado global** via `PlayerContext` — único contexto com ~600 linhas.
- **Comunicação** exclusivamente via Socket.io (`src/client.js`).
- Consulte `ARCHITECTURE.md` para visão completa do sistema.

## Estrutura de Pastas

```
src/
├── assets/          # Imagens, JSONs de dados, SVGs
│   ├── images/      # Sprites, backgrounds, badges, etc.
│   ├── json/        # Dados estáticos (pokémons, moves, items, etc.)
│   └── svgs/        # Ícones SVG como componentes React
├── components/      # Componentes reutilizáveis (UI genérica)
├── constants/       # Constantes e enums
├── context/         # React Context (PlayerContext)
├── features/        # Componentes de domínio do jogo
│   ├── pokemon/     # Cards, stats, listas de pokémon
│   ├── elements/    # Tipos e efetividade
│   ├── items/       # Berries, dust, itens
│   ├── augments/    # Augments do jogador
│   └── prizes/      # Ícones de prêmios
├── game/            # Componentes específicos da tela de jogo
│   ├── body/        # Layout principal (panels, team)
│   ├── header/      # Header do jogo (stats, botões)
│   └── modals/      # Modais do jogo (ModalController + modais)
├── pages/           # Telas/páginas da aplicação
└── utils/           # Funções utilitárias
```

## Convenções de Código

### Componentes

- Componentes em **PascalCase**: `PokeCard.jsx`, `GameHeader.jsx`.
- Um componente por arquivo. Nome do arquivo = nome do componente.
- Usar **function components** com hooks (sem class components).
- Preferir composição sobre herança.

### Imports

- Usar **path aliases** definidos em `config-overrides.js`:
  ```js
  import Component from '@features/pokemon/Card'
  import { PlayerContext } from '@context/PlayerContext'
  import socket from '@client'
  import { taskTypeEnum } from '@enum'
  ```
- Ordem de imports:
  1. React / bibliotecas externas
  2. Componentes internos (via alias)
  3. Utils / helpers
  4. Assets / constantes
  5. Estilos

### Estado e Context

- **Não criar novos contextos** sem necessidade. O `PlayerContext` é o estado central.
- Usar `updateGame()` para flags de modais.
- Usar `emit()` para qualquer comunicação com o servidor.
- Usar `updatePokemon()` para patches em dados de pokémon.

### Estilização

- **Chakra UI props** para estilização (não CSS files separados).
- Cores do tema via `useColorModeValue(light, dark)`.
- Tema em `src/theme.jsx` — fonte "Press Start 2P" global.
- Modo escuro como padrão (`initialColorMode: 'dark'`).

### Modais

- Modais controlados por flags booleanas no `game` state.
- `ModalController` é o ponto central de orquestração.
- Para adicionar um novo modal:
  1. Criar componente em `src/game/modals/[NomeModal]/`
  2. Adicionar flag no `game` state do `PlayerContext`
  3. Registrar no `ModalController`

### Dados Estáticos

- Dados do jogo em `src/assets/json/` (pokémons, moves, items, etc.).
- **Não modificar** esses JSONs manualmente — eles são gerados/mantidos separadamente.
- Referenciados via import direto: `import pokemons from '@assets/json/pokemons.json'`

## Padrões de Qualidade

### Testes

- Testes unitários em `__tests__/` ao lado do arquivo testado ou em pasta `tests/` paralela.
- Nomenclatura: `NomeComponente.test.jsx` ou `utilFunction.test.js`.
- Cobrir: utils, funções de cálculo, lógica de negócio.
- Mocks para socket.io e contexto quando necessário.

### Boas Práticas

- **Sem console.log** em código commitado (usar apenas em debug).
- **Sem código comentado** — remover ao invés de comentar.
- **Sem magic numbers** — usar constantes ou configs de `gameConfiguration.js`.
- Manter funções curtas e com responsabilidade única.
- Nomes descritivos em inglês para variáveis e funções.

### Git

- Commits semânticos: `feat:`, `fix:`, `chore:`, `refactor:`, `test:`, `docs:`.
- Uma mudança lógica por commit.
- Branch naming: `feature/`, `fix/`, `refactor/`, `test/`.

## Path Aliases

| Alias | Caminho |
|-------|---------|
| `@assets` | `src/assets` |
| `@components` | `src/components` |
| `@context` | `src/context` |
| `@features` | `src/features` |
| `@game` | `src/game` |
| `@pages` | `src/pages` |
| `@utils` | `src/utils` |
| `@client` | `src/client` |
| `@enum` | `src/constants/enum` |
| `@hooks` | `src/hooks` |

## Dependências Principais

- **Chakra UI** — componentes e layout
- **Socket.io Client** — comunicação em tempo real
- **Framer Motion** — animações
- **React Icons / Phosphor** — ícones
- **Recharts** — gráficos de estatísticas
- **React Select + chakra-react-select** — selects customizados

## Contract Tests (Front ↔ Back Sync)

- Arquivos de contrato: `*.contract.test.js` dentro de `__tests__/`.
- Cada contract test define uma constante com os campos/valores esperados do outro lado (ex: `PLAYER_CONTRACT_FIELDS`).
- A MESMA constante (mesmo nome, mesmos valores) deve existir no teste espelho do repositório `poketactics-server`.
- Se um contract test for alterado neste repo, o teste correspondente no server DEVE ser atualizado.
- Contract tests validam: enums (chaves e valores), factory shapes (campos obrigatórios), response shapes.
- Convenção de nome da constante: `[ENTITY]_CONTRACT_[TYPE]` (ex: `PLAYER_CONTRACT_FIELDS`, `TASK_TYPE_CONTRACT_KEYS`).
- Nunca remover ou renomear uma constante `_CONTRACT_` sem atualizar o repo espelho.
