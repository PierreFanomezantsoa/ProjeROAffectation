import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function StepTable({ steps }) {
  const [visibleStepCount, setVisibleStepCount] = useState(1);

  const handleNextStep = () => {
    if (visibleStepCount < steps.length) {
      setVisibleStepCount(visibleStepCount + 1);
    }
  };

  const handleShowAll = () => {
    setVisibleStepCount(steps.length);
  };

  const handleReset = () => {
    setVisibleStepCount(1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Étapes de marquage :</Text>

      {steps.slice(0, visibleStepCount).map((step, index) => {
        const isInitialMarking = step.step === "Marquage initial (étoiles)";
        const isImprovedAssignment = step.step === "Affectation améliorée";
        const isAdjustment = step.step === "Ajustement de la matrice";
        const isFinalResult = step.step === "Résultat final";

        const markedRows = step.crossedCells
          ? Array.from(new Set(step.crossedCells.map(z => z.row)))
          : [];
        const markedCols = step.crossedCells
          ? Array.from(new Set(step.crossedCells.map(z => z.col)))
          : [];

        return (
          <View key={index} style={styles.stepBox}>
            <Text style={styles.stepTitle}>{step.step}</Text>
            <View style={styles.matrixContainer}>
              {step.matrixSnapshot.map((row, i) => (
                <View key={i} style={styles.row}>
                  {row.map((cell, j) => {
                    const isMarked = step.markedZeros?.some(z => z.row === i && z.col === j);
                    const isCircled = step.circledZeros?.some(z => z.row === i && z.col === j);
                    const isCrossed = step.crossedCells?.some(z => z.row === i && z.col === j);

                    const isZeroOnMarkedLineOrColumn =
                      (isInitialMarking || isImprovedAssignment) &&
                      cell === 0 &&
                      !isMarked &&
                      (markedRows.includes(i) || markedCols.includes(j));

                    const showBackground =
                      isMarked && (isInitialMarking || isImprovedAssignment || isFinalResult);

                    let display = cell.toString();
                    if (isMarked) display = `✓ ${cell}`;
                    else if (isCircled) display = `o ${cell}`;
                    else if (isZeroOnMarkedLineOrColumn || isCrossed) display = ` ${cell}`;

                    return (
                      <View
                        key={j}
                        style={[
                          styles.cellContainer,
                          showBackground && styles.markedCell,
                          (isCrossed || isZeroOnMarkedLineOrColumn) && styles.crossedCell,
                          isAdjustment && isCrossed && styles.adjustedCell
                        ]}
                      >
                        <Text
                          style={[
                            styles.cellText,
                            isCircled && styles.circledZero,
                            (isCrossed || isZeroOnMarkedLineOrColumn) && styles.crossedText
                          ]}
                        >
                          {display}
                        </Text>
                        {!isAdjustment &&
                          cell === 0 &&
                          !isMarked &&
                          (isCrossed || isZeroOnMarkedLineOrColumn) && (
                            <View style={styles.diagonalLine} />
                          )}
                      </View>
                    );
                  })}
                </View>
              ))}
            </View>
          </View>
        );
      })}

      <View style={styles.buttonGroup}>
        {visibleStepCount < steps.length ? (
          <>
            <TouchableOpacity style={[styles.button, styles.nextButton]} onPress={handleNextStep}>
              <Text style={styles.buttonText}>Étape suivante</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.allButton]} onPress={handleShowAll}>
              <Text style={styles.buttonText}>Afficher toutes</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={handleReset}>
            <Text style={styles.buttonText}>Réinitialiser</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    backgroundColor: '#f0f0f0',
    padding: 12,
    marginRight: 10,
    borderRadius: 10
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10
  },
  stepBox: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    backgroundColor: '#fff'
  },
  stepTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#006666'
  },
  matrixContainer: {
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: '#ccc'
  },
  row: {
    flexDirection: 'row'
  },
  cellContainer: {
    width: 40,
    height: 30,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  cellText: {
    textAlign: 'center',
    fontSize: 14
  },
  markedCell: {
    backgroundColor: '#d0f5d5'
  },
  circledZero: {
    color: '#cc0000',
    fontWeight: 'bold'
  },
  crossedCell: {
    borderColor: 'black',
    borderWidth: 2
  },
  crossedText: {
    color: '#cc0000',
    fontWeight: 'bold'
  },
  diagonalLine: {
    position: 'absolute',
    width: 40,
    height: 1.5,
    backgroundColor: 'black',
    transform: [{ rotate: '45deg' }]
  },
  adjustedCell: {
    backgroundColor: '#fff9c4'
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    gap: 10,
    flexWrap: 'wrap'
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 6,
    marginHorizontal: 5
  },
  nextButton: {
    backgroundColor: '#007bff'
  },
  allButton: {
    backgroundColor: '#28a745'
  },
  resetButton: {
    backgroundColor: 'teal'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  }
});
