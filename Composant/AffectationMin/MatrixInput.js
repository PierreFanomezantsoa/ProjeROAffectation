import React, { useRef } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function MatrixInput({ matrix, setMatrix, rows, cols }) {
  const scrollRef = useRef(null); // ScrollView ref
  const inputRefs = useRef([]);  // Refs for each TextInput

  const updateValue = (r, c, val) => {
    const updated = matrix.map((row, i) =>
      row.map((cell, j) => (i === r && j === c ? Number(val) || 0 : cell))
    );
    setMatrix(updated);
  };

  return (
    <KeyboardAwareScrollView
      ref={scrollRef}
      style={{ flex: 1 }}
      contentContainerStyle={styles.scrollContainer}
      keyboardShouldPersistTaps="handled"
      extraScrollHeight={90}
    >
      <View style={styles.CoutMatrice}>
        <Text style={styles.title}>Matrice de coûts :</Text>
        {matrix.map((row, i) => (
          <View key={i} style={styles.row}>
            {row.map((val, j) => {
              const refIndex = i * cols + j;
              return (
                <TextInput
                  key={j}
                  ref={(ref) => (inputRefs.current[refIndex] = ref)}
                  style={styles.cell}
                  keyboardType="numeric"
                  value={val.toString()}
                  onChangeText={(text) => updateValue(i, j, text)}
                  onFocus={() => {
                    scrollRef.current?.scrollToFocusedInput(inputRefs.current[refIndex]);
                  }}
                />
              );
            })}
          </View>
        ))}
      </View>
      <View style={styles.bottomText}>
        <Text style={styles.textResoudre}>
          Faire la resoulition des problémes .
        </Text>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  bottomText:{
    marginBottom:0,
    bottom:0,
    padding:25,
    flex:1,
    flexDirection:'row',
    alignContent:'center',
  },
  textResoudre:{
    color:'teal',
    fontFamily:'georgia',
    fontSize:20,
  },
  scrollContainer: {
    padding: 0,
    paddingBottom: 130,
  },
  title: {
    fontWeight: 'bold',
    marginVertical: 10,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
    width: 400,
    flexWrap: 'wrap',
    marginLeft: -3, // Adjust to fit the screen
    justifyContent: 'flex-start',
  },
  cell: {
    borderWidth: 1,
    width: 35,
    height: 35,
    textAlign: 'center',
    marginRight: 5,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  CoutMatrice: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
    marginRight: 5,
  },
});
