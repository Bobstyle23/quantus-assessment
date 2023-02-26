import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { BarChart } from "react-native-chart-kit";

export default function App() {
  const [count, setCount] = useState([]);
  const deviceWidth = Dimensions.get("screen").width;
  console.log(deviceWidth);
  function get_1_or_0() {
    return Math.floor(Math.random() * 2);
  }

  function get_random(n) {
    let bitsNeeded = Math.ceil(Math.log2(n + 1));
    let randomNum = 0;
    let bitIndex = 0;
    while (bitIndex < bitsNeeded) {
      randomNum <<= 1;
      randomNum |= get_1_or_0();
      bitIndex++;
    }
    if (randomNum <= n) {
      return randomNum;
    }
    return get_random(n);
  }

  function test_get_random() {
    let counts = Array(11).fill(0);
    for (let i = 0; i < 100000; i++) {
      let rand = get_random(10);
      counts[rand]++;
    }
    setCount(counts);
  }

  let data = {
    labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    datasets: [{ data: count }],
  };

  return (
    <>
      <SafeAreaView></SafeAreaView>
      <View style={styles.container}>
        <BarChart
          data={data}
          width={350}
          height={350}
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `#000`,
            style: { borderRadius: 16 },
          }}
          style={styles.chart}
        />
        <Button title="Get Random" onPress={test_get_random} />
      </View>
      <View style={styles.counts}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {count.map((count, index) => (
            <Text style={styles.count} key={index}>
              {index + 1} : {count}
            </Text>
          ))}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  counts: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#e26a00",
    paddingVertical: 20,
  },
  count: {
    color: "white",
    fontSize: 16,
    marginVertical: 10,
  },
});
