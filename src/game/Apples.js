//Decks should come in as GET requests from the API. 
import { AnswerDeck, PromptDeck} from "./Deck";

//IMPORT INVALID_MOVES for move validation 
export const Apples = {
    name: 'Apples2Oranges',

   setup: (ctx) => ({
     
        players: Array(ctx.numPlayers).fill({hand: [], score: 0}),

        secret: {
            promptDeck: PromptDeck,
            answerDeck: AnswerDeck,
        },
        judgeId: 0,
        playRound: 0,
        handMax: 3,
        activePrompt: {},
        submittedAnswers:[],
        pingas: 0

    }),

    phases: {
        dealing:  {
            onBegin: startDealPhase,
            start: true, 
            endIf: checkHands,
            next: 'play'
        },

        // Increment Judge, don't randomly select
        //Prompt Card is selected
        //Non-Judge Players all play an answer

        
        play: {
            onBegin: newJudge,
            moves: {drawPrompt } 

        },
       
    },

    
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
    //pass in handmax as an argument to this function, here now for test purposes
   let total = 0;

    G.players.forEach((player, index)=> {
        total += player.hand.length; 
    })

    return (total === (G.handMax * ctx.numPlayers))
  }

  function newJudge (G, ctx) {
    let newJudgeId = ctx.random.Die(ctx.numPlayers);
    G.judgeId = newJudgeId;


  }

  function drawPrompt(G, ctx) {
    G.activePrompt = G.secret.promptDeck.pop();
    G.pingas++;
  }

