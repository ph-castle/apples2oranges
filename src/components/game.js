// export const apples2Oranges = {
  //setup game logic
function DrawCard(G, ctx) {
  G.deck--;
  G.hand[ctx.currentPlayer]++;
}

function PlayCard(G, ctx) {
  G.deck++;
  G.hand[ctx.currentPlayer]--;
}

export const Game = {
  setup: ctx => ({ deck: 6, hand: Array(ctx.numPlayers).fill(0) }),
  moves: { DrawCard, PlayCard },
  turn: { minMoves: 1, maxMoves: 1 }
};
// }