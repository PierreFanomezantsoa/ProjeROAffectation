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
      extraScrollHeight={100}
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
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
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
    width: 520,
    flexWrap: 'wrap',
    marginLeft: 10,
  },
  cell: {
    borderWidth: 1,
    width: 40,
    height: 40,
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
