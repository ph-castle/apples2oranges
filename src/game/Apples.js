//Decks should come in as GET requests from the API. 
import { AnswerDeck, PromptDeck} from "./Deck";

//IMPORT INVALID_MOVES for move validation 
export const Apples = {
    name: 'Apples2Oranges',

   setup: (ctx) => ({
     
        players: Array(ctx.numPlayers).fill({hand: [], winners: []}),

        secret: {
            promptDeck: PromptDeck,
            answerDeck: AnswerDeck,
        },

        playRound: 0,
        handMax: 3,
        activePrompt: {},
        submittedAnswers:[],
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
        onEnd: (G, ctx) => {G.submittedAnswers = []},
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



    // drawPrompt(G, ctx)
  }



  function checkHands(G, ctx) {
    //pass in handmax as an argument to this function, here now for test purposes
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
    let answer = G.players[ctx.playerID].hand.splice(answerIndex, 1)

    G.submittedAnswers[ctx.playerID] = answer[0];
    G.discardPile.push(answer[0])

   if(allAnswersSumbitted(G,ctx)) {
    ctx.events.setActivePlayers({currentPlayer: 'judgement', minMoves: 1, maxMoves: 1})
   }


}

function pickWinner(G, ctx, winnerIndex) {
    let mutantPrompt = G.activePrompt.text.slice(), mutantAnswer = G.submittedAnswers[winnerIndex].text, blank = `________`

    let combo  = mutantPrompt.replace(blank, mutantAnswer);
    G.players[winnerIndex].winners.push(combo)//mutantAnswer//G.activePrompt.text + G.submittedAnswers[0].text
    ctx.events.endPhase();
    

}

function allAnswersSumbitted (G, ctx) {return G.discardPile.length % (ctx.numPlayers - 1) === 0 }

