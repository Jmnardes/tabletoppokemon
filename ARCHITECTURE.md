# PokeTactics — Arquitetura do Front-End

## Visão Geral

PokeTactics é um jogo tático multiplayer de Pokémon em tempo real, com gameplay baseado em turnos. O front-end é uma SPA React que se comunica via WebSocket (Socket.io) com um servidor backend que gerencia toda a lógica de jogo.

---

## Stack Tecnológica

| Camada | Tecnologia |
|--------|-----------|
| Framework | React 18 (Hooks) |
| UI Library | Chakra UI 2.7 |
| State | React Context (PlayerContext) |
| Real-time | Socket.io Client 4.6 |
| Animações | Framer Motion 6.3 |
| Estilização | Emotion (CSS-in-JS) + Chakra Theme |
| Gráficos | Recharts 2.15 |
| Fonte | Press Start 2P (retro 8-bit) |
| Build | React App Rewired (CRA override) |
| Lint/Format | ESLint 8 + Prettier 3 |

---

## Navegação (Sem Router)

A navegação é controlada por estado, sem react-router:

```
hasGameStarted === false  →  <GameMenu />
hasGameStarted === true   →  <Game />
  └─ gameEnded === true   →  <GameEnd />
```

### Fluxo de Telas

```
GameMenu ─┬─ (Novo)   → GameNew → GameLobby ──→ Game → GameEnd
          ├─ (Entrar)  → GameJoin → GameLobby ─┘
          ├─ (Debug)   → DebugPage
          └─ (Stats)   → StatisticsPage
```

---

## Comunicação com Servidor

### Socket.io (`src/client.js`)

- Conexão automática com reconexão infinita
- Auth via `localStorage` (playerId, sessionCode)
- Timeout de 20s por request

### Padrão Request/Response

```
emit(eventName, data, timeout) → Promise
  1. Valida conexão e sessão
  2. Monta request: { id, sessionCode, data }
  3. Timeout timer
  4. Emite com callback
  5. Resolve/rejeita promise
```

### Eventos do Servidor (Push)

| Evento | Descrição |
|--------|-----------|
| `turn-start` | Novo turno: dados do evento, pokémon, augments, tasks |
| `turn-end-other` | Outro jogador finalizou turno |
| `game-end` | Jogo concluído, resultados |
| `player-capture-pokemon` | Pokémon capturado |
| `player-update-status` | Itens/status atualizados |
| `player-update-task` | Progresso de tasks |
| `player-use-berry` | Berry utilizada |
| `player-update-team/box` | Sync de pokémon |
| `session-join` / `session-join-other` | Entrada na sessão |
| `lobby-start` | Jogo iniciado |

### Resync

Acionado automaticamente na reconexão. Solicita snapshot completo via `session-resync` e reaplica todo o estado.

---

## Gerenciamento de Estado

### PlayerContext (`src/context/PlayerContext.jsx`)

Contexto central (~600 linhas) que armazena todo o estado do jogo:

```
PlayerContext
├── session       → { sessionCode, turns, level, teamLength, badgesToWin, ... }
├── player        → { id, status, balls, items, berries, daycare, augments, ... }
├── opponents     → Array<OpponentData>
├── pokemonData   → { [id]: PokemonObject }  (todos os pokémon conhecidos)
├── teamIds       → Array<string>             (IDs do time)
├── boxIds        → Array<string>             (IDs da box)
├── encounter     → Array<PokemonObject>      (pokémon do encontro atual)
├── nextEvent     → 'Walk' | 'Challenge' | 'Battle'
├── gym / nextGym → Dados do ginásio atual/próximo
├── tasks         → Array<Task>
├── achievements  → Array<Achievement>
├── game          → { 14+ flags de modais, gameEnded, ... }
├── hasGameStarted, waitingForPlayers, connected, loading
└── Funções: emit, resync, updateGame, updatePlayer, updatePokemon,
             addToTeam, moveToBox, changeBall, changeItem, ...
```

### Funções Principais do Context

| Função | Uso |
|--------|-----|
| `emit(name, data, timeout)` | Request ao servidor com timeout |
| `resync()` | Sincronização completa do estado |
| `updateGame(data)` | Atualizar flags de modais/jogo |
| `updatePlayer(amount, key, type)` | Atualizar dados aninhados do player |
| `updatePokemon(id, updates)` | Patch em dados de pokémon |
| `addToTeam/Box`, `moveToTeam/Box` | Gerenciamento de time |
| `getTeamPokemons/BoxPokemons/AllPokemons` | Listas filtradas |
| `changeBall/changeItem/updateStatus` | Updates de inventário via servidor |
| `playerWinPrize(prize)` | Distribuição de prêmios |
| `syncPokemonsFromServer` | Sync em massa de pokémon |

---

## Layout do Jogo

```
┌─────────────────────────────────────────────────────┐
│                   GameHeader                         │
│  [Trainer] [XP Bar] [NextEvent] [Balls] [Buttons]   │
├───────────┬──────────────────────┬──────────────────┤
│ LeftPanel │    TeamContainer     │   RightPanel     │
│           │                      │                  │
│ TaskBoard │    PokeTeam          │   Opponents      │
│ Objectives│    (6 cards)         │   (OpponentCards) │
│           │                      │                  │
│ (collapse)│    [Finish Turn]     │   (collapsible)  │
└───────────┴──────────────────────┴──────────────────┘
```

### Header (`src/game/header/`)

- **Esquerda**: Nome do treinador + barra de XP
- **Centro**: Próximo evento (Walk/Challenge/Battle/Gym)
- **Direita**: Toolbar com botões de ação
  - Pokébolas, Upgrade, Ginásio, Daycare, Bag, Badges, Augments, Settings

### Left Panel (`src/game/body/LeftPanel/`)

- Colapsável (translação X 80%)
- TaskBoard: tasks ativas com progresso
- Objectives: achievements desbloqueáveis

### Team Container (`src/game/body/Team/`)

- Área central de gameplay
- Mostra os cards dos pokémon do time
- Botão "Finish Turn"

### Right Panel (`src/game/body/RightPanel/`)

- Colapsável
- Lista de OpponentCards com preview dos times adversários

---

## Sistema de Modais

### ModalController (`src/game/modals/ModalController.jsx`)

Controlador centralizado que:
1. Escuta eventos `turn-start` e `player-capture-pokemon`
2. Parseia dados e atualiza contexto
3. Determina qual modal abrir baseado no tipo de evento
4. Gerencia notificações de ginásio

### Modais do Jogo

| Modal | Trigger | Função |
|-------|---------|--------|
| ChallengeModal | `event.type === 'challenge'` | Encontro com pokémon selvagem |
| WalkModal | `event.type === 'walk'` | Evento narrativo + dado |
| BattleModal | `event.type === 'battle'` | PvP contra oponentes |
| EncounterModal | Turno 1 ou manual | Seleção de pokémon |
| CaptureModal | `player-capture-pokemon` | Confirmação de captura |
| GymModal | Botão do ginásio | Batalha contra líder |
| BerriesModal | Botão berries | Usar berries em pokémon |
| PokeUpgradeModal | Botão upgrade | Upgrade de tier |
| DayCareModal | Botão daycare | Gerenciamento daycare |
| PokeBagModal | Botão bag | Gerenciar box |
| BadgeCollectionModal | Botão badges | Ver insígnias |
| NewTasksModal | A cada 10 turnos | Novas tasks |
| AugmentsModal | Botão augments | Ver augments |
| PokeItemModal | Auto-triggered | Usar itens |

**Controle**: Flags booleanas no objeto `game` do contexto (`openXModal: true/false`).

---

## Mecânicas de Jogo

### Sistema de Turnos

1. Jogador executa ações (capturar, batalhar, usar itens)
2. Clica "Finish Turn" → emite `turn-end`
3. Servidor processa eventos de todos os jogadores
4. Novo turno com novo encontro/evento
5. Repete até alguém ganhar X badges (padrão: 8)

### Tipos de Evento

| Evento | Descrição |
|--------|-----------|
| **Challenge** | Encontro com pokémon selvagem, mecânica de captura |
| **Walk** | Evento narrativo simples, dado para prêmio |
| **Battle** | Combate PvP contra oponentes |
| **Gym** | Boss battle (gated por turno, escala de força) |

### Pokémon

- **Stats**: HP, ATK, DEF, SP.ATK, SP.DEF, SPD
- **Tiers**: 0-10 (rarity)
- **Tipos**: 18 tipos com matriz de efetividade
- **Natures**: 30+ natures com bônus/penalidades de stat
- **Shiny**: Chance configurável

### Progressão

- Pokémon sobem de level via treino/XP
- Badges via vitórias em ginásios
- Tasks com recompensas de ranking
- Augments como power-ups

### Configurações de Partida

| Parâmetro | Range | Default |
|-----------|-------|---------|
| Badges para vencer | 2-12 | 8 |
| Level up por turno | 1-2 | 1 |
| Turnos até ginásio | 2-5 | 4 |
| Força do ginásio | 0-3 | 2 |
| Chance de shiny | 1-3% | 1% |
| Dificuldade | Trainer/Catcher/Champion/Elite | Trainer |
| Geração | 1-8 | 8 |
| Tamanho do time | 3-6 | 6 |

---

## Dados Estáticos (`src/assets/json/`)

| Arquivo | Conteúdo |
|---------|----------|
| `pokemons.json` | Base de pokémon (id, nome, sprite, tipo, tier, stats) |
| `moves.json` | Movimentos por tipo (accuracy, damage, target, effects) |
| `items.json` | Itens (pokébolas, boosters de stat) |
| `elements.json` | Matriz de efetividade de tipos (18 tipos) |
| `natures.json` | Naturezas com modificadores de stat |
| `status.json` | Condições de status (poison, paralysis, etc.) |
| `events.json` | Definições de eventos |
| `treasures.json` | Definições de tesouros/prêmios |

---

## Fluxo de Dados

```
WebSocket Server
       │
       ├── Push Events (turn-start, game-end, ...)
       │        │
       │        ▼
       │   Socket (client.js)
       │        │
       │        ▼
       │   PlayerContext  ←── Req/Resp (emit)
       │        │
       │   ┌────┼────────────┐
       │   │    │            │
       │   ▼    ▼            ▼
       │ Modal  GameHeader   GameContent
       │ Ctrl   (stats,      (LeftPanel,
       │ (14+   items,       Team,
       │ modais) nextEvent)  RightPanel)
       │
```

---

## Path Aliases (`config-overrides.js`)

```
@assets     → src/assets
@components → src/components
@context    → src/context
@game       → src/game
@pages      → src/pages
@utils      → src/utils
@client     → src/client
@enum       → src/enum/enum
@hooks      → src/hooks
```
