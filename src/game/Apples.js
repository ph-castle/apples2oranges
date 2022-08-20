//Decks should come in as GET requests from the API.
import { INVALID_MOVE } from 'boardgame.io/core'

export const Apples = {
    name: 'Apples2Oranges',

   setup: (ctx, setupData) => ({
        data: setupData,

        players: Array(ctx.numPlayers).fill({hand: [], winningCards: []}),

        //Maxiumum Cards per hand.
        handMax: 7,

        //Rounds are incremented once each player has had a 'turn' as the judge.

        playRound: 1,

        //Prompt and answers for the current turn
        activePrompt: {},
        submittedAnswers:{},
        //Currently activePrompt and submittedAnswers are cleared at the end of each turn. Discard pile is unnecessary, but could be useful later.
        discardPile: []
    }),

    phases: {

        dealing:  {
            onBegin: RemoteDealPhase,
            start: true,
            endIf: checkHands,
            next: 'play'
        },
        play: {
            moves: { drawRemotePrompt },
            turn: {
                stages: {
                    playAnswer: { moves: { playAnswer },  next:'judgement'  },
                    judgement: {moves: {pickWinner}}
            },
                },
        onEnd: cleanUp,
        next:'dealing'
        },
    },
    endIf: endCondition
}

function checkHands(G, ctx) {
   let total = 0;

   G.players.forEach((player, index)=> {
        total += player.hand.length;
    })

    return (total === (G.handMax * ctx.numPlayers))
  }

function playAnswer(G, ctx, answerIndex) {
    if(G.players[ctx.playerID].hand[answerIndex] === undefined) {
        return INVALID_MOVE;
    }
    //splicing the selected card out this way works,for now but could probably be reworked into something nicer, and could cause problems for how player hands render on the board
    let answer = G.players[ctx.playerID].hand.splice(answerIndex, 1)

    G.submittedAnswers[ctx.playerID] = answer[0];
    G.discardPile.push(answer[0])

   if(allAnswersSubmitted(G,ctx)) {
    ctx.events.setActivePlayers({currentPlayer: 'judgement', minMoves: 1, maxMoves: 1})
   }
}

function pickWinner(G, ctx, winnerIndex) {
    if(G.submittedAnswers[winnerIndex] === undefined) {

        return INVALID_MOVE
    }

    let mutantPrompt = G.activePrompt.body.slice(), mutantAnswer = G.submittedAnswers[winnerIndex].body , blank = `________`
    G.players[winnerIndex].winningCards.push({mutantPrompt, mutantAnswer})//mutantAnswer//G.activePrompt.text + G.submittedAnswers[0].text
    ctx.events.endPhase();
}

function allAnswersSubmitted (G, ctx) {return G.discardPile.length % (ctx.numPlayers - 1) === 0 }



function cleanUp (G, ctx) {
    //let currentPlayer = (ctx.currentPlayer + 1);
    if(ctx.turn % ctx.numPlayers === 0) {
        G.playRound++;
    }
    G.submittedAnswers = {};
    G.activePrompt = {};
}

function drawRemotePrompt(G, ctx) {
    G.data.remotePromptDeck =  ctx.random.Shuffle(G.data.remotePromptDeck);
    G.activePrompt =  G.data.remotePromptDeck.pop();
    ctx.events.setActivePlayers({others: 'playAnswer', minMoves: 1, maxMoves: 1 });
  }


  function RemoteDealPhase(G, ctx) {
    if(G.data) {
        G.data.remoteAnswerDeck = ctx.random.Shuffle(G.data.remoteAnswerDeck);
        G.players.forEach((player) => {
            while(player.hand.length < G.handMax) {
                player.hand.push(G.data.remoteAnswerDeck.pop())
            }
        })

    }
  }

  function endCondition (G, ctx) {
    if(G.data) {
        if (G.data.rounds + 1 === G.playRound) {
            let winnerId = 0
            for(let i = 1; i < ctx.numPlayers; i++) {
                if(G.players[i].winningCards.length > G.players[winnerId].winningCards.length) {
                    winnerId = i;
                }
            }
            return {winner: winnerId};
        }
    }
}