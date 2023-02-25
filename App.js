import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {
  const [counts, setCounts] = useState(new Array(11).fill(0));



  function get_1_or_0() {
    return Math.floor(Math.random() * 2);
  }

function test_get_random () {
    const counts = new Array(11).fill(0);
    for (let i = 0; i < 1000; i++) {
      const r = get_random(10);
      counts[r]++;
    }
    setCounts(counts);
  }
  //
  // function test_get_random() {
  //   let frequency = {};
  //   for (let i = 0; i < 100000; i++) {
  //     let randomNumber = get_random(10);
  //     if (frequency[randomNumber] === undefined) {
  //       frequency[randomNumber] = 0;
  //     }
  //     frequency[randomNumber]++;
  //   }
  //   console.log(frequency);
  //   // setCounts(frequency);
  // }

  console.log(counts)

  function get_random(n) {
    if (n === 0) {
      return 0;
    }
    let bitCount = Math.floor(Math.log2(n)) + 1;
    let randomNumber = 0;
    for (let i = 0; i < bitCount; i++) {
      let bit = get_1_or_0();
      randomNumber |= (bit << i);
    }
    if (randomNumber > n) {
      randomNumber = get_random(n);
    }
    return randomNumber;
  }
  return (
      <View style={styles.container}>
        <Button title="Test get_random" onPress={test_get_random} />
        <View style={styles.counts}>
          {counts.map((count, i) => (
              <Text key={i} style={styles.count}>{count}</Text>
          ))}
        </View>
      </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems:'center',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  count: {
    marginHorizontal: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
