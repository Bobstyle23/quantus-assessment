import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {
  const [counts, setCounts] = useState(new Array(11).fill(0));

  const test_get_random = () => {
    const counts = new Array(11).fill(0);
    for (let i = 0; i < 1000; i++) {
      const r = get_random(10);
      counts[r]++;
    }
    setCounts(counts);
  }

  return (
      <View style={styles.container}>
        <Button title="Test get_random" onPress={test_get_random} />
        <View style={styles.counts}>
          {counts.slice(0,10).map((count, i) => (
              console.log(count),
              <Text key={i} style={styles.count}>{count}</Text>
          ))}
        </View>
      </View>
  );
}

function get_1_or_0() {
  return Math.floor(Math.random() * 2);
}

function get_random(n) {
  let result = 0;
  let count = 0;
  while (n > 0) {
    result = (result << 1) | get_1_or_0();
    n = Math.floor(n / 2);
    count++;
  }
  return result;
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
    marginTop: 20,
  },
  count: {
    marginHorizontal: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
