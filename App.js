import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions, Platform,
} from "react-native";
import { BarChart } from "react-native-chart-kit";

export default function App() {
  const [count, setCount] = useState([]);



  function get_1_or_0() {
    return Math.floor(Math.random() * 2);
  }

  function get_random(n) {
    let bitsNeeded = Math.ceil(Math.log2(n + 1));
    let randomNum = 0;
    for (let i = 0; i < bitsNeeded; i++) {
      randomNum = (randomNum << 1) | get_1_or_0();
    }
    if (randomNum <= n) {
      return randomNum;
    }
    return get_random(n);
  }

  function test_get_random() {
    let counts = Array(11).fill(0);
    for (let i = 0; i < 1000; i++) {
      let rand = get_random(10);
      counts[rand]++;
    }
    setCount(counts);
  }

  let data = {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"],
    datasets: [{ data: count }],
  };

  return (
    <>
      <SafeAreaView></SafeAreaView>
      <View style={styles.container}>
        <BarChart
          data={data}
          width={Platform.OS === 'web' ? Dimensions.get('screen').width / 3 : Dimensions.get("window").width}
          height={250}
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: { borderRadius: 16 },
            barPercentage: 0.5,
          }}
          style={styles.chart}
        />

      </View>
      <View style={styles.generatorContainer}>

      <TouchableOpacity
          style={styles.randomGeneratorBtn}
          onPress={test_get_random}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Get Random</Text>
      </TouchableOpacity>
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
    fontFamily: "Arial",
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
    generatorContainer: { alignItems:'center', marginVertical:20, justifyContent:'center', marginHorizontal: Platform.OS === 'web'? 50 : 0 },
  randomGeneratorBtn: {
    padding: 15,
    backgroundColor: "#e26a00",
    borderRadius: 12,
  },
});
