//Decks should come in as GET requests from the API. 
import { Deck } from "./Deck";

export const Apples = {
    name: 'Apples2Oranges',

   setup: (ctx) => ({
     
        players: Array(ctx.numPlayers).fill({hand: [], score: 0}),

        secret: {
            promptDeck: Deck,
            answerDeck: []
        },
        judgeId: 0,
        playRound: 0,
    }),

    phases: {
        deal:  {
            start: true, 
            moves: { Deal, Shuffle },
            endIf: checkHands,
        
            next: 'play'
        },

        play: {
            moves: { Shuffle } 

        }
    },
}


function Deal(G, ctx) {
    G.discardPile = [];
    G.players.forEach((player) => {
        player.hand.push(G.secret.promptDeck.pop())
        //hand.push(G.secret.promptDeck.pop())
    })
    G.playRound = 1;
  
    //  G.deck.deal(6, [G.players.0]);
    //setPlayOrder(G, G.dealerID + 1);
    //ctx.events.endPhase();
  }

  function Shuffle(G, ctx ) { G.secret.promptDeck = ctx.random.Shuffle(G.secret.promptDeck)   }

  function checkHands(G, ctx) {
    G.players.forEach((player, index)=> {
        console.log(`Player: ${index} Hand: ${player.hand} Length: ${player.hand.length}`)
        return player.hand.length > 1; 
    })
  }