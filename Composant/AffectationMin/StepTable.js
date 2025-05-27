import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function StepTable({ steps }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Étapes de marquage :</Text>
      {steps.map((step, index) => (
        <View key={index} style={styles.stepBox}>
          <Text style={styles.stepTitle}>{step.step}</Text>
          <View style={styles.matrixContainer}>
            {step.matrixSnapshot.map((row, i) => (
              <View key={i} style={styles.row}>
                {row.map((cell, j) => {
                  const isMarked = step.markedZeros?.some(z => z.row === i && z.col === j);
                  const isCircled = step.circledZeros?.some(z => z.row === i && z.col === j);
                  const isCrossed = step.crossedCells?.some(z => z.row === i && z.col === j);

                  return (
                    <View key={j} style={[
                      styles.cellContainer,
                      isMarked && styles.markedCell,
                      isCrossed && styles.crossedCell
                    ]}>
                      <Text style={[
                        styles.cellText,
                        isCircled && styles.circledZero
                      ]}>
                        {cell}
                      </Text>
                    </View>
                  );
                })}
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    backgroundColor:'#f0f0f0',
    padding: 12,
    marginRight: 10,
    borderRadius: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  stepBox: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
  },
  stepTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'teal',
  },
  matrixContainer: {
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: '#ccc',
  },
  row: {
    flexDirection: 'row',
  },
  cellContainer: {
    width: 40,
    height: 30,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    margin: 0,
  },
  cellText: {
    textAlign: 'center',
    fontSize: 14,
  },
  markedCell: {
    backgroundColor: 'green',
  },
  circledZero: {
    color: 'red',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  crossedCell: {
    backgroundColor: '#eee',
    borderWidth: 1,
    borderColor: '#666',
    transform: [{ rotateZ: '-45deg' }],
  }
});
