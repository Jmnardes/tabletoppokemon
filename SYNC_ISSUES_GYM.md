# Correções de Sincronização - Gym Battle

## Problemas Identificados

### 1. Player 1 ficava preso ao selecionar segundo pokémon
**Causa**: Ao emitir `gym-battle-choose`, o loading não era ativado no frontend e não havia tratamento de timeout caso o servidor não respondesse.

**Solução Frontend**: 
- Adicionado `setLoading` ao selecionar pokémon
- Implementado timeout de 15 segundos
- Loading é removido automaticamente se não houver resposta

### 2. Player 2 ficava preso no loading ao iniciar batalha
**Causa**: `handleStartBattle` ativava loading mas dependia 100% da resposta do servidor (`gym-battle-fight-result`). Se houvesse erro ou delay no servidor, o player ficava travado indefinidamente.

**Solução Frontend**:
- Implementado timeout de 15 segundos em `handleStartBattle`
- Se não receber resposta, volta ao estado 'info' automaticamente
- Loading é removido para destravar o player

### 3. Falta de tratamento de erros
**Causa**: Não havia listener para `gym-battle-error` e nenhum fallback caso algo desse errado.

**Solução Frontend**:
- Adicionado listener `gym-battle-error`
- Limpeza de timeouts em todos os listeners
- Reset de estado em caso de erro

## Mudanças Implementadas

### Estados Adicionados
```javascript
const [loadingTimeout, setLoadingTimeout] = useState(null)
```

### Melhorias no useEffect
- Limpeza de timeout ao receber `gym-battle-fight-result`
- Limpeza de timeout ao receber `gym-battle-result`
- Novo listener para `gym-battle-error`
- Cleanup adequado no unmount do componente

### Timeouts de Segurança
Ambas as ações agora têm timeout de 15 segundos:
1. `handleStartBattle` - Ao iniciar batalha
2. `handleChoosePokemon` - Ao escolher próximo pokémon

## Possíveis Problemas no Servidor

Mesmo com as correções no frontend, verifique no servidor:

### 1. Emissão de Eventos
```javascript
// Certifique-se que o servidor sempre responde:
socket.on('gym-battle-start', async (data) => {
  try {
    // ... lógica da batalha
    
    // IMPORTANTE: Sempre emitir resposta
    socket.emit('gym-battle-fight-result', result)
  } catch (error) {
    console.error('Gym battle start error:', error)
    // Emitir erro para o cliente
    socket.emit('gym-battle-error', { message: error.message })
  }
})
```

### 2. Sincronização Entre Jogadores
Se for um jogo multiplayer, pode haver problema de sincronização:

```javascript
// Verificar se ambos os jogadores recebem os eventos
io.to(roomId).emit('gym-battle-fight-result', result) // Para todos
// vs
socket.emit('gym-battle-fight-result', result) // Só para um
```

### 3. Estado da Batalha
Verificar se o servidor mantém corretamente o estado:
- `needsChoice` sendo calculado corretamente?
- `availablePokemons` sendo enviado com os dados corretos?
- Index dos pokémons está correto?

### 4. Condições de Corrida
Se dois eventos chegarem muito rápidos:
```javascript
// Adicionar debounce ou fila no servidor
const battleQueue = new Map()

socket.on('gym-battle-choose', async (data) => {
  const playerId = socket.id
  
  // Evitar múltiplas escolhas simultâneas
  if (battleQueue.has(playerId)) {
    return socket.emit('gym-battle-error', { 
      message: 'Wait for previous action to complete' 
    })
  }
  
  battleQueue.set(playerId, true)
  try {
    // ... processar escolha
  } finally {
    battleQueue.delete(playerId)
  }
})
```

### 5. Timeout no Servidor
O servidor também deve ter timeout para operações:
```javascript
const BATTLE_TIMEOUT = 10000 // 10 segundos

const battlePromise = processBattle(data)
const timeoutPromise = new Promise((_, reject) => 
  setTimeout(() => reject(new Error('Battle timeout')), BATTLE_TIMEOUT)
)

try {
  const result = await Promise.race([battlePromise, timeoutPromise])
  socket.emit('gym-battle-fight-result', result)
} catch (error) {
  socket.emit('gym-battle-error', { message: error.message })
}
```

## Testes Recomendados

1. **Teste de Timeout**: Simular servidor lento/sem resposta
2. **Teste de Erro**: Forçar erro no servidor e verificar se cliente recupera
3. **Teste de Sincronização**: Dois jogadores escolhendo pokémons simultaneamente
4. **Teste de Reconexão**: Perder conexão durante batalha e reconectar

## Logs para Debug

Adicionar logs no servidor para rastrear:
```javascript
console.log('[GYM] Battle started:', { 
  playerId, 
  gymId, 
  pokemonIds, 
  timestamp: Date.now() 
})

console.log('[GYM] Choice received:', { 
  playerId, 
  pokemonIndex, 
  timestamp: Date.now() 
})

console.log('[GYM] Result sent:', { 
  playerId, 
  needsChoice, 
  timestamp: Date.now() 
})
```

E verificar:
- Se `gym-battle-start` está sendo recebido
- Se `gym-battle-fight-result` está sendo enviado
- Se há algum erro silencioso no servidor
- Se o tempo entre eventos está dentro do esperado (< 15s)
