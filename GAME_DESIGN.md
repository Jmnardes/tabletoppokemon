# PokeTactics — Game Design Document (GDD)

> Documento completo de design do jogo para referência de estúdio e criação de UI/UX no Figma.

---

## 1. Visão Geral do Jogo

**PokeTactics** é um jogo tático multiplayer de Pokémon jogado em turnos, onde jogadores competem entre si para capturar pokémons, fortalecer seus times e conquistar insígnias de ginásio. O primeiro jogador a atingir o número configurado de insígnias encerra o jogo, e o vencedor é determinado por pontos de ranking acumulados ao longo da partida.

### 1.1 Proposta

- Jogo multiplayer online em tempo real (via WebSocket)
- Salas privadas com código de acesso para jogar com amigos
- Estética retrô 8-bit (fonte "Press Start 2P")
- Suporte a modo claro e escuro
- Partidas configuráveis com diversas opções de personalização

### 1.2 Plataforma

- Aplicação web (SPA) — acessível via navegador
- Design responsivo com foco em desktop

### 1.3 Objetivo Principal

Conquistar insígnias de ginásio derrotando líderes e acumular o maior número de **Ranking Points** (pontos de classificação). O jogo termina quando qualquer jogador atinge o número configurado de insígnias, e o jogador com mais Ranking Points vence.

### 1.4 Condição de Vitória

| Critério | Descrição |
|----------|-----------|
| **Fim do jogo** | Qualquer jogador atingir o número de insígnias configurado (padrão: 8) |
| **Vencedor** | Jogador com maior quantidade de Ranking Points |
| **Desempate** | Quantidade de insígnias > Quantidade de capturas |

---

## 2. Fluxo de Telas

### 2.1 Diagrama de Navegação

```
┌──────────────┐
│  Game Menu   │
│  (Tela Inicial) │
├──────────────┤
│ • New Game   │──► GameNew (Configuração) ──► GameLobby ──► Game ──► GameEnd
│ • Join Game  │──► GameJoin (Código)       ──► GameLobby ──┘
│ • Statistics │──► StatisticsPage
│ • Debug      │──► DebugPage
│ • Game Info  │──► Modal informativo
└──────────────┘
```

### 2.2 Detalhamento de Cada Tela

#### 2.2.1 Tela: Menu Principal (`GameMenu`)

**Propósito:** Porta de entrada do jogo. O jogador decide o que fazer.

**Elementos:**
- Título do jogo "PokeTactics"
- Botão "New Game" — cria uma nova sala
- Botão "Join Game" — entra em uma sala existente
- Botão "Statistics" — visualiza estatísticas de pokémons
- Botão "Game Info" — abre modal com informações do jogo
- Toggle de tema claro/escuro (ThemeSwitch)
- Link para o repositório GitHub
- Botão de sair da sala (se já estiver em uma)

---

#### 2.2.2 Tela: Criar Nova Partida (`GameNew`)

**Propósito:** O host configura as regras da partida antes de criar a sala.

**Campos de configuração:**

| Campo | Descrição | Default | Mín | Máx |
|-------|-----------|---------|-----|-----|
| Nickname | Nome do treinador | — | 3 chars | 14 chars |
| Badges to Win | Insígnias para encerrar o jogo | 8 | 2 | 12 |
| Level Up/Turn | Níveis que pokémons sobem por turno | 1 | 1 | 2 |
| Turns Until Gym | Turnos entre cada disponibilidade de ginásio | 4 | 2 | 5 |
| Gym Strength | Bônus de força do líder de ginásio | 2 | 0 | 3 |
| Shiny Chance % | Chance percentual de encontrar um pokémon shiny | 1 | 1 | 3 |
| Difficulty | Nível de dificuldade (Trainer/Catcher/Champion/Elite) | Trainer (0) | 0 | 3 |
| Generation | Até qual geração de pokémons incluir | 8 (todas) | 1 | 8 |

**Ação:** Ao clicar "Create Game", gera um código de sessão e redireciona para o Lobby.

---

#### 2.2.3 Tela: Entrar em Partida (`GameJoin`)

**Propósito:** Jogador insere seu nickname e o código da sala para entrar.

**Campos:**
- Nickname (3–14 caracteres)
- Código da sala (inserido manualmente ou compartilhado pelo host)

**Ação:** Ao clicar "Join", entra na sala e é redirecionado para o Lobby.

---

#### 2.2.4 Tela: Lobby (`GameLobby`)

**Propósito:** Sala de espera onde todos os jogadores se preparam antes do jogo começar.

**Elementos:**
- Código da sala (com botão copiar)
- Seção "Game Objective" — exibe resumo visual:
  - Ícone de coroa: "Win X badges to end the game"
  - Ícone de estrela: "Highest ranking wins"
- Tabela de configurações da partida (dificuldade, shiny chance, badges, team length, etc.)
- Lista de jogadores conectados com status "Ready" (✓ verde / ✗ vermelho)
- Botão "Ready" — marca como pronto
- Botão "Start Game" (apenas host, quando todos prontos)
- Informação da versão do jogo

**Fluxo:**
1. Jogadores entram na sala
2. Cada um clica "Ready"
3. Host clica "Start Game"
4. Todos recebem o evento `lobby-start` e o jogo inicia

---

#### 2.2.5 Tela: Jogo (`Game`)

**Propósito:** Tela principal de gameplay. Layout com 3 painéis + header + modais.

**Estrutura completa descrita na Seção 3 (Layout do Jogo).**

---

#### 2.2.6 Tela: Fim de Jogo (`GameEnd`)

**Propósito:** Exibe os resultados finais da partida.

**Elementos:**
- Pódio de jogadores com colocação (1º, 2º, 3º ou #N)
- Para cada jogador:
  - Nome do treinador
  - Ranking Points (estrelas)
  - Badges conquistadas (coroa)
  - Capturas realizadas (pokébola)
  - Indicação "(You)" se for o jogador atual
  - Borda dourada para o jogador atual
- Destaque especial para 1º lugar (ícone de troféu dourado)
- Seção de "Full Stats" expandível com estatísticas detalhadas
- Abas: Resultados | Badges conquistadas
- Para cada badge: ícone da badge, nome do ginásio, nome do líder, tipo do ginásio

---

#### 2.2.7 Tela: Estatísticas (`StatisticsPage`)

**Propósito:** Visualização de dados do jogo fora de partida.

**Elementos:**
- Gráfico de barras (Recharts) mostrando distribuição de pokémons por tipo
- Dropdown para selecionar:
  - "Element Counts" — total de pokémons por tipo
  - "Tier 0" até "Tier 11" — distribuição por tier/raridade
- Ícones dos tipos como labels no eixo X
- Botão "Voltar" para o menu

---

## 3. Layout do Jogo (Tela Principal)

### 3.1 Estrutura Visual

```
┌──────────────────────────────────────────────────────────────────────┐
│                          GAME HEADER                                 │
│  [Trainer Name] [Turn] [★Ranking] [Dust] [Token] [Incense] [Badges] │
│         [Next Event Badge]                                           │
│  [Pokébolas ∞/Gx/Ux/Mx] [Upgrade] [Gym] [DayCare] [Bag] [Badges]  │
│  [Augments] [Training Camp] [Settings]                               │
├────────────┬──────────────────────────────┬──────────────────────────┤
│            │                              │                          │
│ LEFT PANEL │       TEAM CONTAINER         │      RIGHT PANEL         │
│            │                              │                          │
│ ┌────────┐ │  ┌──────┐ ┌──────┐ ┌──────┐ │  ┌──────────────┐       │
│ │ TASKS  │ │  │ Card │ │ Card │ │ Card │ │  │ Opponent 1   │       │
│ │        │ │  │  #1  │ │  #2  │ │  #3  │ │  │ [team preview]│       │
│ │ - Easy │ │  └──────┘ └──────┘ └──────┘ │  ├──────────────┤       │
│ │ - Med  │ │  ┌──────┐ ┌──────┐ ┌──────┐ │  │ Opponent 2   │       │
│ │ - Hard │ │  │ Card │ │ Card │ │ Card │ │  │ [team preview]│       │
│ │        │ │  │  #4  │ │  #5  │ │  #6  │ │  ├──────────────┤       │
│ │ X turn │ │  └──────┘ └──────┘ └──────┘ │  │ Opponent 3   │       │
│ │  left  │ │                              │  │ [team preview]│       │
│ ├────────┤ │  ┌──────────────────────────┐│  └──────────────┘       │
│ │OBJECTI-│ │  │   [→] Finish Turn        ││                          │
│ │  VES   │ │  └──────────────────────────┘│                          │
│ │        │ │                              │                          │
│ │ 🏆 ??? │ │                              │                          │
│ │ 🏆 Obj │ │                              │                          │
│ └────────┘ │                              │                          │
│  [◄ hide]  │                              │              [hide ►]    │
└────────────┴──────────────────────────────┴──────────────────────────┘
```

### 3.2 Header — Detalhamento

#### Lado Esquerdo
- **Nome do Treinador** — Badge com o nickname do jogador
- **Barra do Treinador** (TrainerBar):
  - 🕐 Turno atual (`session.turns`)
  - ⭐ Ranking Points (`player.status.ranking`)
  - 💎 Dust (quantidade) (`player.items.dust`)
  - 🪙 Daycare Tokens (`player.daycare.token`)
  - 🔮 Shiny Incense (`player.items.incense`)
  - 👑 Badges: `X / Y` (conquistadas / necessárias)

#### Centro
- **Próximo Evento** — Badge indicando o tipo do próximo evento:
  - `Walk` — Evento narrativo
  - `Challenge` — Desafio competitivo
  - `Battle` — Batalha PvP

#### Lado Direito — Toolbar de Ações

| Botão | Ícone | Ação |
|-------|-------|------|
| Pokébolas | Pokebola + contadores | Exibe quantidade de cada tipo de pokébola |
| Upgrade | Seta para cima | Abre modal de upgrade (dusts e berries) |
| Gym | Ícone de ginásio | Abre modal do ginásio (quando disponível) |
| Day Care | Coração/bola | Abre modal do Day Care |
| Bag | Mochila + badge de contagem | Abre modal do PokéBag (box) |
| Badges | Medalhas | Abre modal de coleção de insígnias |
| Augments | Ícone especial | Abre modal dos augments do jogador |
| Training Camp | Ícone de luta | Abre modal de campo de treinamento |
| Settings | Engrenagem | Configurações do jogo |

### 3.3 Left Panel — Tasks & Objectives

**Colapsável:** Sim, desliza 80% para a esquerda com botão de toggle.

#### TaskBoard
- Título "Tasks"
- Lista de tasks ativas (detalhes na Seção 7)
- Cada task mostra:
  - Badge de dificuldade (Easy 🟢 / Medium 🟡 / Hard 🔴)
  - Nome da task
  - Tooltip com descrição
  - Progresso: `current / final`
  - Recompensa: `X ⭐`
  - Ícone de check quando completa
- Rodapé: "X turn(s) left" — turnos até novas tasks

#### Objectives (Achievements)
- Lista de conquistas desbloqueáveis durante a partida
- Achievements revelados mostram: ícone 🏆, label, recompensa em Ranking Points
- Achievements ocultos mostram: "?????" em cinza
- Tooltip com mensagem descritiva ao hover

### 3.4 Team Container (Centro)

- Grid de até **6 cards de pokémon** (configurável: 3–6)
- Cada card mostra informações completas do pokémon (ver Seção 5.4)
- Botão "Finish Turn" na base — clicável para encerrar o turno
  - Hover mostra texto "Finish your turn"
  - Ícone de seta para a direita (→)

### 3.5 Right Panel — Opponents

**Colapsável:** Sim, com botão de toggle.

- Lista de cards de cada oponente na partida
- Cada card de oponente mostra:
  - Nome do treinador
  - Preview do time (sprites dos pokémons)
  - Status de turno (se já finalizou o turno atual)

---

## 4. Sistema de Turnos

### 4.1 Fluxo de um Turno

```
┌─────────────────┐
│  INÍCIO DO TURNO │
│  (turn-start)    │
├─────────────────┤
│ 1. Servidor      │
│    processa:     │
│    - Level ups   │
│    - Training    │
│    - Gym update  │
│    - Augments    │
├─────────────────┤
│ 2. Pokémons no   │
│    Training Camp │
│    sobem de nível│
├─────────────────┤
│ 3. Evento é      │  ┌──────────┐  ┌──────────┐  ┌──────────┐
│    revelado: ────┼─►│  WALK    │  │CHALLENGE │  │ BATTLE   │
│                  │  └────┬─────┘  └────┬─────┘  └────┬─────┘
│                  │       │             │              │
│                  │       ▼             ▼              ▼
│                  │  [Resolver]    [Resolver]    [Resolver]
│                  │       │             │              │
│                  │       ▼             ▼              ▼
├─────────────────┤  ┌──────────────────────────────────────┐
│ 4. ENCOUNTER    │◄─┤  Após evento resolvido               │
│    (Captura)    │  └──────────────────────────────────────┘
├─────────────────┤
│ 5. AUGMENTS     │  (se disponíveis neste turno)
│    (Escolha)    │
├─────────────────┤
│ 6. Jogador      │
│    gerencia time │
│    (livre)       │
├─────────────────┤
│ 7. FINISH TURN  │
│    (turn-end)    │
├─────────────────┤
│ 8. Aguarda todos│
│    finalizarem   │
└────────┬────────┘
         │
         ▼
   PRÓXIMO TURNO
```

### 4.2 Eventos por Turno

Cada turno traz um evento que o jogador precisa resolver. Os tipos são:

| Tipo | Frequência | Descrição |
|------|-----------|-----------|
| **Walk** | Comum | Evento narrativo com recompensa condicional |
| **Challenge** | Regular | Desafio competitivo entre todos os jogadores |
| **Battle** | Regular | Batalha PvP 1v1 entre dois jogadores |

O tipo do próximo evento é mostrado no header para que o jogador possa se preparar.

### 4.3 Turno 1 (Especial)

O primeiro turno é especial:
- **Encounter de Starter:** Mostra 3 pokémons (divisível por 3 = seleção livre, sem necessidade de dado)
- Todos os pokémons são nível 1
- Não há evento antes do encounter

### 4.4 Tasks a Cada 10 Turnos

A cada 10 turnos (turno 1, 11, 21, 31...), um modal de "New Tasks" é exibido com novas missões disponíveis. As tasks antigas permanecem se não completadas.

---

## 5. Sistemas do Jogo

### 5.1 Sistema de Captura

#### Fluxo de Captura

```
┌────────────────────┐
│   ENCOUNTER MODAL  │
│                    │
│  ┌───┐  ┌───┐     │
│  │ 🐾│  │ 🐾│     │   Pokémons selvagens disponíveis
│  │ Lv5│  │ Lv3│     │   (normalmente 2, starter = 3)
│  └───┘  └───┘     │
│                    │
│  [PB] [GB] [UB] [MB] │   Pokébolas para rolagem
│                    │
│  Resultado do dado:│
│  Roll = X          │
│                    │
│  Se roll ≥ difficulty│
│    → pode capturar  │
│  Senão              │
│    → pokémon escapa  │
│                    │
│  [Skip Turn]       │   Pode pular sem capturar
└────────────────────┘
```

#### Cálculo de Dificuldade de Captura

```
dificuldade = baseDifficulty(4)
            + (pokemonLevel / 10)
            + wildPokemonStrength - teamStrengthMean
            - elementBonus

wildPokemonStrength = gameDifficulty + (rarity × 2) + level
teamStrengthMean = média(level + rarity de cada pokémon do time)
```

- **Turno 1:** Dificuldade = 0 (captura garantida)
- **Starter (3 pokémons):** Sem necessidade de dado, seleção livre

#### Tipos de Pokébola

| Pokébola | Bônus no Dado | Quantidade |
|----------|--------------|------------|
| Poké Ball | +0 | Infinita (∞) |
| Great Ball | +3 | Limitada |
| Ultra Ball | +6 | Limitada |
| Master Ball | +10 | Muito rara |

**Mecânica:** Jogador escolhe uma pokébola → rola o dado → resultado + bônus da bola ≥ dificuldade → captura sucesso.

#### Pós-Captura

Ao capturar um pokémon:
1. **Se dual-type:** Jogador escolhe o tipo de ataque e tipo especial do pokémon
2. **Se time cheio:** Jogador escolhe qual pokémon mover para a Box ou enviar para o Day Care
3. **Pokémon é adicionado ao time** (ou box)
4. **Se há augments disponíveis:** Modal de augments abre após

### 5.2 Sistema de Eventos

#### 5.2.1 Walk (Caminhada)

**Descrição:** Evento narrativo onde o jogador encontra uma situação aleatória no caminho. A recompensa depende de uma condição ser atendida pelo time do jogador.

**Fluxo:**
1. Modal abre com título e descrição narrativa
2. Exibe a condição do evento (tipo de elemento ou natureza no time)
3. Verifica se algum pokémon do time atende a condição:
   - **Condição atendida:** Prêmio positivo (ou negativo — pode perder algo)
   - **Condição não atendida:** "Condition(s) not met. Better luck next time!"
4. Jogador confirma e recebe/perde o prêmio

**Tipos de condição:**
- `element` — ter um pokémon de determinado tipo no time
- `nature` — ter um pokémon com determinada natureza no time

**Prêmios possíveis:** Pokébolas, berries, dust, ranking points, etc.

#### 5.2.2 Challenge (Desafio)

**Descrição:** Desafio competitivo entre todos os jogadores da sala. Cada um seleciona pokémons e rola um dado. O resultado + bônus dos pokémons selecionados determina a colocação.

**Fluxo:**
1. **Fase de Seleção:** Cada jogador seleciona exatamente **3 pokémons** do time/box para o desafio
   - O bônus é calculado em tempo real conforme a seleção (baseado nos tipos vantajosos do evento)
   - Jogador clica "Ready" quando satisfeito
   - Aguarda todos os jogadores ficarem prontos
2. **Fase do Dado:** Após todos prontos, cada jogador rola um dado
   - Resultado final = dado + bônus dos pokémons
   - Resultado é emitido para todos os outros jogadores
3. **Fase de Resultado:** Após todos rolarem:
   - Colocação é calculada (1º, 2º, 3º, 4º)
   - **1º lugar:** Recebe o melhor prêmio + incrementa contagem de challenges vencidos
   - **2º lugar:** Recebe prêmio menor
   - **3º lugar:** Recebe prêmio mínimo
   - **4º lugar:** Não recebe nada
4. Após ver resultado, avança para o Encounter

**Vantagens/Desvantagens:**
- Cada challenge tem tipos de pokémon que conferem vantagem (`advantage`) ou desvantagem (`disadvantage`)
- Selecionar pokémons com tipos vantajosos aumenta o bônus

#### 5.2.3 Battle (Batalha PvP)

**Descrição:** Batalha 1v1 automática entre dois jogadores. O servidor determina os confrontos.

**Fluxo:**
1. Modal abre mostrando o oponente (nome e preview do time)
2. **Seleção de Pokémon:** Jogador escolhe qual pokémon enviar para a batalha
   - Exibe type effectiveness chart para referência
   - Cada pokémon do time é selecionável
3. **Batalha Automática:** Servidor calcula o resultado turno a turno
   - Battle log é exibido em tempo real
   - Hits podem ser: `hit`, `half`, `miss`, `crit` (com cores e mensagens narrativas)
   - Animações de dano e HP
4. **Resultado:**
   - **Vitória:** Recebe prêmio (exibido no ControlBox) + incrementa contagem de vitórias
   - **Derrota:** Incrementa contagem de derrotas
5. Após resultado, avança para o Encounter

**Elementos na tela de batalha:**
- Sprite do pokémon aliado (lado esquerdo)
- Sprite do pokémon inimigo (lado direito)
- Barras de HP
- Log de batalha com mensagens narrativas
- Lista de tipos para referência (ElementsList)

### 5.3 Sistema de Ginásio

#### Disponibilidade

- Ginásios ficam disponíveis a cada **X turnos** (configurável, padrão: 4)
- O servidor define a rota do próximo ginásio (`nextGym`) com antecedência
- Notificação toast quando a rota é decidida: "🗺️ Next Gym Route Decided!"
- Notificação toast quando o ginásio fica disponível: "🏆 Gym Challenge Available!"

#### Informações do Ginásio

Cada ginásio possui:
- **Nome do ginásio** (ex: "Boulder Badge Gym")
- **Líder** — com nome e imagem
- **Tipo do ginásio** — tipo elementar predominante
- **Badge** — insígnia obtida ao vencer
- **Turno de disponibilidade** (`turnStart`)

#### Fluxo de Batalha de Ginásio

```
┌──────────────────┐
│  GYM INFO SCREEN │  Exibe informações do ginásio, líder e badge
│                  │
│  [Challenge!]    │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  PRE-BATTLE      │  Jogador seleciona pokémons para a batalha
│  (Select Team)   │  Pode selecionar do time e box
│                  │
│  [Start Battle]  │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  BATTLE SCREEN   │  Batalha turno a turno contra o líder
│                  │
│  Player Pokémon  │  Sprites, HP bars, battle log
│       vs         │
│  Leader Pokémon  │
│                  │
│  [Next] [Choose] │  Avançar turno ou escolher novo pokémon
└────────┬─────────┘  (quando pokémon aliado é derrotado)
         │
         ▼
┌──────────────────┐
│  BATTLE RESULT   │
│                  │
│  Victory! 🏆     │  → Ganha badge + incrementa contagem
│    ou            │
│  Defeat 💀       │  → Pode tentar novamente (Retry)
│                  │
│  [Close/Retry]   │
└──────────────────┘
```

**Mecânica da batalha:**
- Servidor gerencia toda a lógica da batalha
- Jogador avança turno clicando "Next"
- Quando pokémon aliado é derrotado, jogador escolhe o próximo da lista de disponíveis
- Battle log mostra ações de cada turno
- Time do líder é progressivamente revelado conforme a batalha avança
- Ao vencer: badge é adicionada, ginásio é limpo, próximo ginásio é definido
- Ao perder: pode tentar novamente (Retry) no mesmo turno

**Restrição:** Cada ginásio só pode ser desafiado uma vez por turno (`lastGymBattleTurn`).

### 5.4 Card de Pokémon

Cada pokémon no time/box é representado por um card visual detalhado:

```
┌─────────────────────────┐
│ [Lv] [★★★]  [Name]     │  Nível, Estrelas de raridade, Nome
│                         │
│     ┌───────────┐       │
│     │  SPRITE   │       │  Imagem do pokémon (borda colorida pelo tipo)
│     │           │       │  Fundo com gradiente se Shiny
│     └───────────┘       │
│                         │
│  [🔥Fire] [✈Flying]     │  Tipos do pokémon
│                         │
│  ❤ HP  ⚔ ATK  🛡 DEF   │  Stats com ícones SVG
│  🎯 ACC  💨 EVS  💥 CRT │  Indicadores de buff/debuff por natureza
│                         │
│  [Nature: Adamant]      │  Natureza do pokémon
│  [Berries: 🍇🍓]       │  Berries aplicadas
│  [Dust: +2]             │  Chance de level up acumulada
│  [Items applied]        │  Itens aplicados
└─────────────────────────┘
```

#### Stats do Pokémon

| Stat | Sigla | Ícone | Descrição |
|------|-------|-------|-----------|
| Health | HP | ❤ | Pontos de vida |
| Attack | ATK | ⚔ | Poder de ataque |
| Defense | DEF | 🛡 | Resistência a dano |
| Accuracy | ACC | 🎯 | Precisão de acerto |
| Evasion | EVS | 💨 | Chance de esquiva |
| Critical | CRT | 💥 | Chance de acerto crítico |

**Modificadores de Stats:**
- ⭐ (estrela verde) — buff por raridade
- ⬆⬆ (seta verde) — buff por natureza
- ⬇⬇ (seta vermelha) — debuff por natureza

#### Sistema de Raridade

- Pokémons possuem raridade de **0 a 11** (representada por estrelas ⭐)
- Raridade afeta:
  - Stats base
  - Dificuldade de captura
  - Tokens de Day Care ao soltar
  - Distribuição de tipos disponíveis por tier

#### Naturezas

Cada pokémon possui uma natureza que modifica seus stats:
- **Buff (+):** Aumenta um stat
- **Debuff (-):** Diminui um stat
- Algumas naturezas são neutras (sem alterações)

Exemplos:
- **Adamant:** +ATK, -CRT
- **Bold:** +DEF, -ATK
- **Timid:** +ACC, -ATK
- **Buffed:** +HP, sem debuff
- **Ordinary:** Sem modificações

#### Shiny Pokémon

- Chance configurável (padrão: 1%)
- Aumentável por incense e augments (Shiny Charm)
- Visual: gradiente especial no card (brilho branco passando pelo sprite)
- Animação pulsante mais intensa

### 5.5 Sistema de Pokébolas

| Tipo | Bônus | Disponibilidade |
|------|-------|-----------------|
| Poké Ball | +0 | Infinita |
| Great Ball | +3 | Obtida por prêmios, Day Care shop, augments |
| Ultra Ball | +6 | Obtida por prêmios, Day Care shop, augments |
| Master Ball | +10 | Muito rara — prêmio especial |

**Display no Header:**
- ∞ Poké Ball (sempre disponível)
- Nx Great Ball
- Nx Ultra Ball
- Nx Master Ball

**Interação no Encounter:**
- Cada tipo de bola é um botão com animação de pokébola
- Ao clicar, rola o dado automaticamente
- Resultado = dado + bônus da bola
- Bola é consumida após o uso (exceto Poké Ball)

### 5.6 Sistema de Items e Upgrades

#### Dust (Pó)

- Recurso consumível que aumenta a **chance de level up** de um pokémon
- Funciona como boost acumulativo: quanto mais dust, maior a chance
- Aplicado no modal de Upgrade, selecionando o pokémon desejado
- O efeito se aplica no próximo turno

#### Berries

- Itens consumíveis que conferem efeitos temporários a um pokémon
- Cada berry tem:
  - Nome e tipo
  - Efeito (descrição)
  - Duração em turnos
- **Limite:** Máximo de 3 berries por pokémon simultaneamente
- Pokémon não pode receber a mesma berry duas vezes enquanto o efeito estiver ativo
- Aplicadas no modal de Upgrade, ao lado do Dust

#### Modal de Upgrade (PokeUpgrade)

**Fluxo:**
1. Selecionar um pokémon do time (lista horizontal)
2. Ver detalhes do pokémon selecionado (SelectedToUpgrade)
3. Escolher upgrade disponível:
   - Dust (com quantidade atual)
   - Berries disponíveis (cada uma com nome, ícone, quantidade, efeito)
4. Confirmar aplicação via modal de confirmação
5. Pokémon é atualizado em tempo real

### 5.7 Sistema de Day Care

**Propósito:** Liberar pokémons da box em troca de Daycare Tokens, que podem ser gastos na loja ou no Training Camp.

#### Liberar Pokémon

- Acessível pelo modal Day Care
- Mostra lista de pokémons na Box
- Ao selecionar, modal de confirmação: "You will receive X Daycare Tokens for him"
- Tokens recebidos = raridade + 1

#### Loja do Day Care (DayCareShop)

| Item | Custo (Tokens) |
|------|---------------|
| Great Ball | Xn tokens |
| Ultra Ball | Xn tokens |
| Dust | Xn tokens |
| Berry (aleatória) | Xn tokens |

### 5.8 Sistema de Training Camp

**Propósito:** Pokémons da box podem ser colocados em slots de treinamento para subir de nível automaticamente a cada turno.

**Mecânica:**
- **3 slots** disponíveis
- Cada slot custa **1 Daycare Token por turno** para manter ativo
- Pokémons sem token correspondente não são treinados
- Pokémons são selecionados da Box
- Level up ocorre automaticamente no início de cada turno
- Pokémons podem ser removidos a qualquer momento

**Interface:**
- 3 cards de slots lado a lado
- Cada slot mostra: ícone de moeda + pokémon selecionado (ou "Empty slot")
- Lista de pokémons da box acima para seleção
- Botão "Remove" em cada slot ocupado

### 5.9 Sistema de Augments

**Propósito:** Buffs especiais que o jogador escolhe ao longo da partida. Cada augment dura até o final do jogo.

**Quando aparecem:** Após capturar um pokémon (se houver augments disponíveis naquele turno).

**Mecânica:**
1. Modal exibe até 4 opções de augments em grid 2×2
2. Cada augment tem: nome, descrição, raridade (cor), dados específicos
3. Jogador escolhe UM augment
4. O augment é aplicado permanentemente ao jogador

**Tipos de Augment:**

| Tipo | Efeito | Dado Exibido |
|------|--------|-------------|
| `elementBonus` | Bônus de captura para um tipo | Ícone(s) do elemento |
| `balls` | Recebe pokébolas extras | Ícones das bolas + quantidade |
| `berry` | Recebe berries específicas | Ícone da berry |
| `bonusDust` | Recebe dust extra | Quantidade de dust |
| `pokeballBonus` | Bônus em jogadas de pokébola | Badge +N |
| `challengeBonus` | Bônus em challenges | Badge +N |
| `challengeRank` | Ranking extra em challenges | Badge +N |
| `battleRank` | Ranking extra em batalhas | Badge +N |
| `onDuty` | Efeito durante serviço | Badge +N |
| `shinyCharm` | Aumenta chance de shiny | Badge N% |
| `levelBonus` | Bônus de level up | Badge N% |
| `encounterRarity` | Aumenta raridade dos encontros | Badge N% |
| `encounterLevel` | Aumenta nível dos encontros | Badge N% |

**Raridades de Augment:** Indicadas por cor de fundo (sistema de cores próprio).

### 5.10 Sistema de PokéBag (Box)

**Propósito:** Armazenar pokémons extras fora do time ativo.

**Mecânica:**
- Time ativo: até 6 pokémons (configurável: 3–6)
- Box: sem limite aparente
- Pokémons podem ser movidos entre time e box livremente
- Clicar em um pokémon do time pode movê-lo para a box
- No modal PokéBag, pokémons da box podem ser movidos para o time

**Interface:**
- Badge no ícone da bag mostra quantos pokémons estão na box
- Modal lista todos os pokémons da box com seus cards
- Seleção para mover para o time

### 5.11 Sistema de Insígnias (Badges)

**Propósito:** Coleção visual das insígnias conquistadas em batalhas de ginásio.

**Há 32 badges no jogo:**
Balance, Beacon, Boulder, Cascade, Coal, Cobble, Dynamo, Earth, Feather, Fen, Fog, Forest, Glacier, Heat, Hive, Icicle, Knuckle, Marsh, Mind, Mineral, Mine, Plain, Rainbow, Rain, Relic, Rising, Soul, Stone, Storm, Thunder, Volcano, Zephyr.

**Interface do Modal:**
- Grid com todas as badges do jogo
- Badges conquistadas: ícone colorido, nome, informações do ginásio/líder
- Badges não conquistadas: ícone cinza/bloqueado
- Tooltip com detalhes ao hover
- Para cada badge conquistada, exibe também os tipos do ginásio e nome do líder

---

## 6. Pokémon — Dados e Sistemas

### 6.1 Tipos Elementais (18 tipos)

Water, Normal, Grass, Flying, Psychic, Bug, Fire, Poison, Ground, Rock, Fighting, Electric, Dragon, Dark, Fairy, Steel, Ghost, Ice.

Cada tipo possui:
- **Ataques efetivos** contra outros tipos
- **Ataques inefetivos** contra outros tipos
- **Defesa efetiva** contra outros tipos
- **Defesa inefetiva** contra outros tipos

A tabela completa de efetividade segue o sistema clássico de Pokémon e é exibida como referência durante batalhas PvP.

### 6.2 Gerações

O jogo suporta pokémons até a 8ª geração:

| Geração | Total de Pokémons |
|---------|------------------|
| 1 | 151 |
| 2 | 252 |
| 3 | 386 |
| 4 | 493 |
| 5 | 649 |
| 6 | 719 |
| 7 | 809 |
| 8+ | 897 |

Configurável ao criar a partida — gerações mais altas incluem todas as anteriores.

### 6.3 HP Base por Tier

```
Tier:    0   1   2   3   4   5   6   7   8   9  10  11
HP:      5   7   8  12  15  18  22  26  30  34  39  45
```

### 6.4 Status Effects

Pokémons podem sofrer status effects durante o jogo:

| Status | Efeito | Chance | Duração |
|--------|--------|--------|---------|
| Burn | Dano por turno + debuff ATK | 30% | 2–4 turnos |
| Confusion | Debuff ACC e EVS | 80% | 1–2 turnos |
| Poison | Dano por turno | — | — |
| Paralysis | Redução de velocidade | — | — |
| Curse | Efeitos variados | — | — |

Esses status são adquiridos através de eventos de Walk narrativos.

---

## 7. Sistema de Tasks (Missões)

### 7.1 Visão Geral

Tasks são missões que os jogadores completam durante a partida para ganhar Ranking Points.

### 7.2 Ciclo de Tasks

- Novas tasks aparecem a cada **10 turnos** (turno 1, 11, 21, etc.)
- Exibidas em modal "New Tasks" com lista completa
- Visíveis no painel esquerdo (TaskBoard)
- Contagem regressiva de turnos até próximas tasks

### 7.3 Dificuldade

| Nível | Cor | Recompensa |
|-------|-----|-----------|
| Easy | 🟢 Verde | Menor ranking |
| Medium | 🟡 Amarelo | Médio ranking |
| Hard | 🔴 Vermelho | Maior ranking |

### 7.4 Tipos de Tasks

| Task | Descrição | Condição |
|------|-----------|----------|
| `catch` | Capturar pokémons | N capturas |
| `winBattle` | Vencer batalhas PvP | N vitórias |
| `winChallenge` | Vencer challenges | N vitórias |
| `useDust` | Usar dust em pokémons | N dusts |
| `gainTokens` | Ganhar daycare tokens | N tokens |
| `useBerry` | Usar berries | N berries |
| `fairPlay` | Jogar de forma justa | Condição especial |
| `daycare` | Usar o daycare | N pokémons liberados |
| `usePokeballs` | Usar poké balls | N usos |
| `useGreatballs` | Usar great balls | N usos |
| `useUltraballs` | Usar ultra balls | N usos |
| `throwEffectiveness` | Capturas com efetividade | N capturas efetivas |

### 7.5 Estrutura de uma Task

```json
{
  "name": "Catch 3 Pokémons",
  "description": "Capture 3 wild pokémons during the game",
  "type": "easy",
  "rank": 5,
  "condition": {
    "type": "catch",
    "status": {
      "current": 1,
      "final": 3
    }
  }
}
```

---

## 8. Economia do Jogo

### 8.1 Moedas/Recursos

| Recurso | Obtenção | Uso |
|---------|----------|-----|
| **Ranking Points** ⭐ | Tasks, challenges, batalhas, achievements | Determina o vencedor |
| **Daycare Tokens** 🪙 | Liberar pokémons no Day Care | Comprar itens na loja, Training Camp |
| **Dust** 💎 | Prêmios, Day Care shop, augments | Aumentar chance de level up |
| **Shiny Incense** 🔮 | Prêmios | Aumentar chance de encontrar shiny |
| **Badges** 👑 | Derrotar ginásios | Condição de fim de jogo |

### 8.2 Ciclo Econômico

```
Capturar Pokémons ──► Pokémon no time ou box
        │
        ▼
Box cheia? ──► Liberar no Day Care ──► Ganhar Tokens
        │                                    │
        ▼                                    ▼
Training Camp ◄──── Usar tokens ────► Day Care Shop
(level up)                           (balls, dust, berries)
```

---

## 9. Fluxo Completo de uma Partida

### 9.1 Início

1. Host cria sala com configurações
2. Jogadores entram via código
3. Todos marcam "Ready"
4. Host inicia a partida

### 9.2 Turno 1 (Starter)

1. Encounter modal com 3 pokémons iniciais
2. Jogador escolhe 1 starter (seleção livre)
3. Se dual-type, escolhe tipo de ataque/especial
4. Augments (se disponíveis)
5. Finish Turn

### 9.3 Turnos Regulares (Loop Principal)

```
┌─── INÍCIO DO TURNO ──────────────────────────────────────────┐
│                                                               │
│  1. Level ups automáticos (pokémons que subiram de nível)     │
│  2. Training Camp level ups                                   │
│  3. Atualização de ginásio (disponibilidade)                  │
│                                                               │
│  4. EVENTO:                                                   │
│     ├── Walk → Resolver condição → Prêmio ou nada            │
│     ├── Challenge → Selecionar 3 pokes → Dado → Colocação    │
│     └── Battle → Selecionar 1 poke → Batalha automática      │
│                                                               │
│  5. ENCOUNTER:                                                │
│     ├── Pokémons selvagens aparecem (2 normalmente)           │
│     ├── Escolher pokébola → Rolar dado                       │
│     ├── Se roll ≥ dificuldade → Capturar                     │
│     └── Se roll < dificuldade → Não captura (pode pular)     │
│                                                               │
│  6. AUGMENTS (se disponíveis):                                │
│     └── Escolher 1 entre 4 augments                          │
│                                                               │
│  7. GERENCIAMENTO LIVRE:                                      │
│     ├── Ver/organizar time e box                              │
│     ├── Usar dust/berries (Upgrade)                           │
│     ├── Liberar pokémon no Day Care                           │
│     ├── Gerenciar Training Camp                               │
│     ├── Desafiar ginásio (se disponível)                      │
│     ├── Ver coleção de badges                                 │
│     ├── Ver augments ativos                                   │
│     └── Ver tasks e objectives                                │
│                                                               │
│  8. FINISH TURN → Aguardar outros jogadores                   │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

### 9.4 Condição de Fim

- Qualquer jogador atinge o número de badges configurado
- Servidor emite `game-end` com resultados
- Todos são redirecionados para a tela de Game End
- Ranking final é calculado

### 9.5 Resultado

- Pódio com classificação por Ranking Points
- Estatísticas detalhadas por jogador
- Coleção de badges conquistadas

---

## 10. Notificações e Feedback

### 10.1 Sistema de Toast

O jogo utiliza toasts (notificações temporárias) para feedback:

| Evento | Tipo | Posição | Exemplo |
|--------|------|---------|---------|
| Pokémon level up | Success | Bottom-left | "Pikachu has leveled up to 5!" |
| Jogador entrou | Info | Top | "Ash joined the room" |
| Jogador saiu | Info | Top | "Ash left the room" |
| Task completa | Success | Top | "You've completed a task. +5 ranking!" |
| Próximo ginásio | Info | Top-right | "🗺️ Next Gym Route Decided!" |
| Ginásio disponível | Success | Top-right | "🏆 Gym Challenge Available!" |
| Pokébolas baixas | Warning | Top | "You need more Pokeballs!" |
| Erro de conexão | Error | Top | "Connection error" |
| Item comprado | Info | Top | "A new Greatball has been added" |
| Day Care release | Info | Top | "Your Pikachu will be treated with kindness" |
| Berry já aplicada | Warning | Top | "Pikachu already ate this berry" |

### 10.2 Loading States

- "Loading..." — estado genérico
- "Capturing..." — capturando pokémon
- "Awarding..." — distribuindo prêmio
- "Starting gym battle..." — iniciando batalha de ginásio
- "Selecting pokémon..." — selecionando pokémon
- "Continuing battle..." — continuando batalha
- "Connection lost. Reconnecting..." — reconexão
- "Reconnecting... (N)" — tentativa N de reconexão

---

## 11. Aspectos Visuais e Estilo

### 11.1 Identidade Visual

- **Tema:** Retrô 8-bit / Pixel Art
- **Fonte principal:** "Press Start 2P" (Google Fonts)
- **Modo de cor:** Escuro por padrão, com toggle para claro
- **Cores:**
  - Backgrounds: gray.700 (dark) / gray.200 (light)
  - Painéis: gray.650 (dark) / gray.400 (light)
  - Destaque: Cores por tipo de pokémon (18 cores únicas)
  - Pokémons dual-type: Gradiente mesclando as duas cores dos tipos

### 11.2 Cores por Tipo

| Tipo | Cor |
|------|-----|
| Psychic | #ee5454 |
| Fire | #ee8f12 |
| Water | #228fd8 |
| Dragon | #396bd8 |
| Bug | #69ca47 |
| Dark | #4f4d50 |
| Electric | #ddda0b |
| Fairy | #e390d8 |
| Fighting | #f13b69 |
| Flying | #7277be |
| Ice | #0fddb0 |
| Ghost | #453a6b |
| Grass | #1d8b2f |
| Ground | #b46b0c |
| Poison | #b64ac0 |
| Rock | #a89c67 |
| Steel | #6e968d |
| Normal | #888888 |

### 11.3 Animações

- **Framer Motion** para transições e animações de UI
- Animação pulsante nos cards de pokémon (hover)
- Animação de pokébola ao rolar dados
- Animação de dado para challenges
- Transições de painéis colapsáveis
- Animações de batalha (sprites, dano, HP)

---

## 12. Comunicação em Tempo Real

### 12.1 Eventos Emitidos pelo Cliente

| Evento | Quando | Dados |
|--------|--------|-------|
| `turn-end` | Jogador finaliza turno | — |
| `player-capture-pokemon` | Captura pokémon | `{ capturedId }` |
| `pokemon-handle-capture` | Confirma captura | `{ attackType, specialType, removedId, dayCare }` |
| `player-use-ball` | Usa pokébola | `{ catchRoll, ballType }` |
| `player-use-dust` | Usa dust | `{ pokemon }` |
| `player-use-berry` | Usa berry | `{ berry, pokeId }` |
| `event-roll` | Rola dado no challenge | `{ roll, bonus }` |
| `event-challenge-ready` | Pronto para challenge | `{ pokemonIds }` |
| `event-challenge-check-bonus` | Preview de bônus | `{ pokemonIds }` |
| `battle-choose-pokemon` | Seleciona poke para PvP | `{ battleId, pokemonId }` |
| `gym-battle-start` | Inicia batalha de ginásio | `{ playerPokemonIds }` |
| `gym-battle-next` | Próximo turno ginásio | `{}` |
| `gym-battle-choose` | Escolhe poke no ginásio | `{ pokemonIndex }` |
| `gym-check-badges` | Consulta badges | — |
| `augment-selected` | Escolhe augment | `{ augment }` |
| `daycare-pokemon-release` | Libera poke | `{ pokeId, rarity }` |
| `daycare-buy-item` | Compra item | `{ item, price }` |
| `player-training-select` | Coloca no training | `{ pokemonId }` |
| `player-training-remove` | Remove do training | `{ pokemonId }` |
| `player-gain-berry` | Ganha berry (walk) | `{ berry }` |
| `player-win-prize` | Resgata prêmio | `{ prize }` |
| `player-update-balls` | Atualiza pokébolas | `{ [type]: amount }` |
| `player-update-status` | Atualiza status | `{ [type]: amount }` |
| `player-update-daycare` | Atualiza daycare | `{ token: amount }` |
| `session-leave` | Sai da sala | — |
| `session-resync` | Resincroniza estado | — |

### 12.2 Eventos Recebidos do Servidor

| Evento | Quando | Dados Principais |
|--------|--------|-----------------|
| `turn-start` | Novo turno inicia | Evento, encounter, tasks, augments, level ups, gym |
| `turn-end-other` | Oponente finalizou | ID do oponente |
| `game-end` | Jogo acabou | Resultados finais |
| `player-capture-pokemon` | Pokémon capturado | Dados do pokémon |
| `player-update-status` | Status atualizado | Novo status |
| `player-update-task` | Tasks atualizadas | Tasks + ranking ganho |
| `player-use-berry` | Berry usada | Berry + pokémon atualizado |
| `player-update-team` | Time atualizado | Novo time |
| `player-update-box` | Box atualizada | Nova box |
| `battle-update` | Turno de PvP | Players, log, vencedor |
| `battle-end` | PvP acabou | — |
| `gym-battle-fight-result` | Turno de ginásio | Log, estado da batalha |
| `gym-battle-result` | Ginásio acabou | Resultado final |
| `gym-victory` | Vitória no ginásio | Próximo ginásio |
| `event-roll-other` | Oponente rolou dado | Roll + bônus |
| `session-join` | Entrou na sala | Sessão, jogador, oponentes |
| `session-join-other` | Outro entrou | Dados do oponente |
| `session-leave-other` | Outro saiu | Nome + ID |
| `lobby-ready` | Status ready | Boolean |
| `lobby-start` | Jogo iniciou | Starters, tasks, achievements |
| `augment-selected` | Augment aplicado | Player atualizado |

---

## 13. Glossário

| Termo | Definição |
|-------|-----------|
| **Badge** | Insígnia de ginásio conquistada ao derrotar um líder |
| **Ranking Points** | Pontos de classificação que determinam o vencedor |
| **Dust** | Pó que aumenta a chance de level up de um pokémon |
| **Daycare Token** | Moeda obtida ao liberar pokémons, usada na loja e Training Camp |
| **Augment** | Buff permanente escolhido pelo jogador durante a partida |
| **Task** | Missão com objetivo e recompensa em Ranking Points |
| **Achievement** | Conquista desbloqueável durante a partida |
| **Encounter** | Encontro com pokémons selvagens para captura |
| **Challenge** | Desafio competitivo entre todos os jogadores |
| **Walk** | Evento narrativo com condição e recompensa |
| **Battle** | Batalha PvP 1v1 entre dois jogadores |
| **Gym** | Ginásio com líder para conquistar insígnias |
| **Box / PokéBag** | Armazenamento de pokémons fora do time ativo |
| **Day Care** | Sistema para liberar pokémons em troca de tokens |
| **Training Camp** | Slots para pokémons subirem de nível automaticamente |
| **Nature** | Característica que modifica stats do pokémon |
| **Shiny** | Variante rara com visual especial |
| **Tier / Rarity** | Nível de raridade do pokémon (0–11) |
| **Starter** | Pokémon inicial escolhido no turno 1 |

---

## 14. Resumo para o Estúdio de Design

### Telas Principais para o Figma

1. **Menu Principal** — 4 botões + info modal
2. **Criar Partida** — Formulário de configuração com 8+ campos
3. **Entrar em Partida** — Formulário simples (nick + código)
4. **Lobby** — Lista de jogadores + configs + botão start
5. **Tela de Jogo** — Layout 3 painéis + header + modais
6. **Fim de Jogo** — Pódio + stats + badges

### Modais para o Figma (14 modais)

1. **Walk Event** — Narrativa + condição + prêmio
2. **Challenge** — Seleção de 3 pokes → Dado → Resultado → Prêmios
3. **Battle PvP** — Seleção de poke → Batalha automática → Resultado
4. **Encounter** — Pokémons selvagens + pokébolas + dado
5. **Capture** — Escolha de tipo + decisão time/box
6. **Gym Battle** — Info → Seleção → Batalha → Resultado
7. **Augments** — Grid 2×2 com opções
8. **New Tasks** — Lista de novas missões
9. **Poke Upgrade** — Seleção + upgrades (dust/berries)
10. **Day Care** — Lista da box + loja de itens
11. **PokéBag** — Lista de pokémons na box
12. **Badge Collection** — Grid de todas as badges
13. **Training Camp** — 3 slots + lista da box
14. **Game Info** — Informações sobre o jogo

### Componentes Reutilizáveis

- Card de Pokémon (mini e full)
- Ícones de tipos elementais (18)
- Ícones de pokébolas (4 tipos)
- Ícones de stats (HP, ATK, DEF, ACC, EVS, CRT)
- Badge de raridade (estrelas)
- Ícones de berries
- Ícones de badges (32)
- Ícones de líderes
- Dado animado
- Pokébola animada
- Toast de notificação
- Loading overlay
- Card de augment
- Card de task
- Card de oponente
- Card de achievement
