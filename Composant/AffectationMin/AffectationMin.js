import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import NameInput from './NameInput';
import MatrixInput from './MatrixInput';
import ResultDisplay from './ResultDisplay';
import StepTable from './StepTable';
import { hungarianAlgorithm } from '../../utils/hungarian';

export default function AffectationMin({navigation}) {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [matrix, setMatrix] = useState(Array(3).fill().map(() => Array(3).fill(0)));
  const [rowNames, setRowNames] = useState(Array(3).fill(''));
  const [colNames, setColNames] = useState(Array(3).fill(''));
  const [result, setResult] = useState(null);
  const [mode, setMode] = useState(''); // 'min' ou 'max'

  const resetAll = () => {
    setRows(3);
    setCols(3);
    setMatrix(Array(3).fill().map(() => Array(3).fill(0)));
    setRowNames(Array(3).fill(''));
    setColNames(Array(3).fill(''));
    setResult(null);
    setMode('');
  };

  const handleDimensionChange = (val, type) => {
    const n = parseInt(val) || 0;
    if (type === 'row') {
      setRows(n);
      setRowNames(Array(n).fill(''));
      setMatrix(Array(n).fill().map(() => Array(cols).fill(0)));
    } else {
      setCols(n);
      setColNames(Array(n).fill(''));
      setMatrix(Array(rows).fill().map(() => Array(n).fill(0)));
    }
    setResult(null);
    setMode('');
  };

  const solveMin = () => {
    const { assignment, steps } = hungarianAlgorithm(matrix);
    setResult({ assignment, steps });
    setMode('min');
  };

  const solveMax = () => {
    const convertedMatrix = matrix.map(row => {
      const max = Math.max(...row);
      return row.map(val => max - val);
    });
    const { assignment, steps } = hungarianAlgorithm(convertedMatrix);
    setResult({ assignment, steps });
    setMode('max');
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <View style={styles.headerBar}>
          <TouchableOpacity style={styles.refreshButton} onPress={() => navigation.navigate('accueil')}>
            <Icon name="long-arrow-left" size={22} color="white" />
          </TouchableOpacity>
          <Text style={[styles.styleTextTop, { flex: 1, textAlign: 'center' }]}>
            Algorithme d'afféctation
          </Text>
          <TouchableOpacity style={styles.refreshButton1} onPress={resetAll}>
            <Icon name="rotate-right" size={22} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.dimensionContainer}>
          <Text style={styles.label}>Lignes :</Text>
          <View style={styles.inputLigne}>
            <Icon name="list-ol" size={20} color="black" style={{ marginLeft: '2%', padding: 5 }} />
            <TextInput
              keyboardType="numeric"
              style={styles.inputTextNombre}
              value={rows.toString()}
              onChangeText={(val) => handleDimensionChange(val, 'row')}
            />
          </View>
          <Text style={styles.label}>Colonnes :</Text>
          <View style={styles.inputLigne}>
            <Icon name="list-ol" size={20} color="black" style={{ marginLeft: '2%', padding: 5 }} />
            <TextInput
              keyboardType="numeric"
              style={styles.inputTextNombre}
              value={cols.toString()}
              onChangeText={(val) => handleDimensionChange(val, 'col')}
            />
          </View>
        </View>

        <NameInput
          rowNames={rowNames}
          setRowNames={setRowNames}
          colNames={colNames}
          setColNames={setColNames}
        />

        <MatrixInput
          matrix={matrix}
          setMatrix={setMatrix}
          rows={rows}
          cols={cols}
        />

        <View style={styles.buttonResolution}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={solveMin}>
              <Text style={styles.buttonText}>
                affectation min <Icon name="area-chart" size={18} color="white" />
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button1} onPress={solveMax}>
              <Text style={styles.buttonText}>
                affectation max <Icon name="line-chart" size={18} color="white" />
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {result && (
          <>
            <StepTable steps={result.steps} rowNames={rowNames} colNames={colNames} />
            <ResultDisplay
              assignment={result.assignment}
              rowNames={rowNames}
              colNames={colNames}
              matrix={matrix}
              mode={mode}
            />
          </>
        )}
      </ScrollView>
    </View>
  );
}

// ... les styles restent inchangés ...


const styles = StyleSheet.create({
  inputLigne: {
    flexDirection: 'row',
    width: 70,
    borderRadius: 5,
    padding: 1,
    alignItems: 'center',
    marginVertical: 2,
    borderColor: 'black',
    borderWidth: 1,
  },
  // actualiser page 
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'teal',
    paddingHorizontal: 25,
    height: 95,
    marginTop: 0,
  },
  refreshButton: {
    padding: 4,
    borderRadius: 30,
    marginRight: 15,
  },
  // boutton menu à droit 
  refreshButton1:{
    padding: 4,
    borderRadius: 30,
    marginLeft: 0,
  },
  // hedear bar 
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 28,
    width: '100%'
  },
  container: {
    padding: 10,
    backgroundColor: '#fff',
  },
  styleTextTop: {
    fontSize: 30,
    fontFamily: 'cursive',
    backgroundColor: 'teal',
    width: '100%',
    color: 'white',
    justifyContent: 'center',
  },
  dimensionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    flexWrap: 'wrap',
    gap: 10,
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginRight: 10,
    borderRadius: 10,
  },
  label: {
    marginRight: 5,
    fontWeight: 'bold',
    color: 'green'
  },
  inputTextNombre: {
    padding: 5,
    width: 200,
    justifyContent: 'center',
    height: 40,
    fontSize: 16,
    marginLeft: 4,
    marginRight: 15,
    textAlign: 'auto',
    fontFamily: 'georgia',
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'teal',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button1: {
    backgroundColor: 'green',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'georgia',
  },
  // button resolution 
  buttonResolution: {
    flexDirection: 'row',
    padding:0,
    textAlign: 'center',
    gap: 10,
    marginLeft: 5,
  }
});
