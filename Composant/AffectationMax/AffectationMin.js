import { StyleSheet,View } from 'react-native';

export default function AffectationMin() {
  return (
    <View style={styles.container}>
      <Text style={styles.PremierText}>Bienvenuie sur page d'affectation min</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  PremierText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
});
