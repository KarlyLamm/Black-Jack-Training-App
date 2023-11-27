import React from 'react';
import { Button, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';
import { ExternalLink } from './ExternalLink';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';


export default function PlayGame({ path }: { path: string }) {
  let dealerSum: number = 0;
  let playersSum: any;
  let deck: any[];
  let hidden;
  let dealerAceCount: any;
  let dealersCards: any[];
  let playersCards: any[];

  let startGame = () => {
    shuffleDeck();
    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerAceCount += checkAce(hidden);

    while (dealerSum < 17){
      let cardImg;
      let card = deck.pop();
      console.log(card)
      dealersCards.push(`../assets/cards/${card}.png`);
      dealerSum += getValue(card);
      dealerAceCount;
    }
    for(let i = 0; i < 2 ; i++){
      let cardImg;
      let card = deck.pop();
      playersCards.push(`../assets/cards/${card}.png`);
      playersSum += getValue(card);
    }

    console.log(hidden);
    console.log({dealerSum})
    console.log(deck.length)
    console.log({playersSum})
  }
  let checkAce = (card: any) => {
    if(card[0] == "A"){
      return 1;
    }
    return 0;
  }
  let getValue = (card: any) => {
    let data = card.split("-"); // "4-c" -> ["4", "C"]
    let value = data[0];

    if(isNaN(value)){
      if(value == "A"){
        return 11;
      }
      return 10;
    }

    return parseInt(value);
  }
  let hit = () => {
    console.log("hit")
  }

  let stay = () => {
    console.log("stay")
  }

  let split = () => {
    console.log("split")
  }

  let double = () => {
    console.log("double")
  }
  let cantHit = () => {
    return false;
  }

  let buildDeck = () => {
    let values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    let types = ["C", "D", "H", "S"];

    deck = [];

    for(let i=0; i < types.length; i++){
      for(let j = 0; j < values.length; j++){
        deck.push(values[j]+"-"+ types[i]); //A-C -> K-C, A-D -> K-D
      }
    }
    return deck;
  }
  let shuffleDeck = () => {
    buildDeck();
    for (let i = 0; i < deck.length; i++){
      let j = Math.floor(Math.random() * deck.length); // (0-1) * 52 => (0-51.9999)
      let temp = deck[i];
      deck[i]= deck[j];
      deck[j] = temp;
    };
    console.log(deck, deck.length);
  }

  return (
    <View>
      <View style={styles.getStartedContainer}>
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Dealer has: {dealerSum}
        </Text>
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          You have: {playersSum}
        </Text>
        <View style={{flexDirection:'row'}}>
        <Button disabled={cantHit()} onPress={() => hit()} title='Hit'></Button>
        <Button disabled={cantHit()} onPress={() => stay()} title='Stay'></Button>
        <Button disabled={cantHit()} onPress={() => split()} title='Split'></Button>
        <Button disabled={cantHit()} onPress={() => double()} title='Double'></Button>
        </View>
        <Button disabled={cantHit()} onPress={() => startGame()} title='Start Game'></Button>
        <Button disabled={cantHit()} onPress={() => shuffleDeck()} title='Shuffle Deck'></Button>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: 'center',
  },
});
