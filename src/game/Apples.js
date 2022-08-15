//Decks should come in as GET requests from the API.
import { AnswerDeck, PromptDeck} from "./Deck";
import { INVALID_MOVE } from 'boardgame.io/core'
//TODOS

//END GAME
//INTEGRATE BACKEND DECKS
//IMPORT INVALID_MOVES for move validation
// TURN ORDER / RANDOM JUDGE SELECTION *Low Priority *
export const Apples = {
    name: 'Apples2Oranges',

   setup: (ctx) => ({
        players: Array(ctx.numPlayers).fill({hand: [], winningCards: []}),

        secret: {
            promptDeck: PromptDeck,
            answerDeck: AnswerDeck,
        },
        //Maxiumum Cards per hand.
        handMax: 3,

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
            onBegin: startDealPhase,
            start: true,
            endIf: checkHands,
            next: 'play'
        },
        play: {
            moves: { drawPrompt },
            turn: {
                stages: {
                    playAnswer: { moves: { playAnswer },  next:'judgement'  },
                    judgement: {moves: {pickWinner}}
            },
                },
        onEnd: cleanUp,
        next:'dealing'
        },
    }
}

function startDealPhase(G, ctx) {
    G.secret.answerDeck = ctx.random.Shuffle(G.secret.answerDeck);
    G.players.forEach((player) => {
        while(player.hand.length < G.handMax) {
            player.hand.push(G.secret.answerDeck.pop())
        }
    })
  }



function checkHands(G, ctx) {
   let total = 0;

   G.players.forEach((player, index)=> {
        total += player.hand.length;
    })

    return (total === (G.handMax * ctx.numPlayers))
  }



function drawPrompt(G, ctx) {
    G.secret.promptDeck =  ctx.random.Shuffle(G.secret.promptDeck);
    G.activePrompt =  G.secret.promptDeck.pop();
    ctx.events.setActivePlayers({others: 'playAnswer', minMoves: 1, maxMoves: 1 });
  }

function playAnswer(G, ctx, answerIndex) {
    if(G.players[ctx.playerID].hand[answerIndex] === undefined) {
        return INVALID_MOVE;
    }
    //splicing the selected card out this way works,for now but could probably be reworked into something nicer, and could cause problems for how player hands render on the board
    let answer = G.players[ctx.playerID].hand.splice(answerIndex, 1)

    G.submittedAnswers[ctx.playerID] = answer[0];
    G.discardPile.push(answer[0])

   if(allAnswersSumbitted(G,ctx)) {
    ctx.events.setActivePlayers({currentPlayer: 'judgement', minMoves: 1, maxMoves: 1})
   }
}

function pickWinner(G, ctx, winnerIndex) {
    if(G.submittedAnswers[winnerIndex] === undefined) {

        return INVALID_MOVE
    }

    let mutantPrompt = G.activePrompt.text.slice(), mutantAnswer = G.submittedAnswers[winnerIndex].text, blank = `________`

    let combo  = mutantPrompt.replace(blank, mutantAnswer);
    G.players[winnerIndex].winningCards.push(combo)//mutantAnswer//G.activePrompt.text + G.submittedAnswers[0].text
    ctx.events.endPhase();
}

function allAnswersSumbitted (G, ctx) {return G.discardPile.length % (ctx.numPlayers - 1) === 0 }



function cleanUp (G, ctx) {
    //let currentPlayer = (ctx.currentPlayer + 1);
    if(ctx.turn % ctx.numPlayers === 0) {
        G.playRound++;
    }
    G.submittedAnswers = {};
    G.activePrompt = {};
}