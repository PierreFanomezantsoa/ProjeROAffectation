import { StyleSheet } from 'react-native';
import Acceuil from './Composant/Acceuil';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AffectationMin from './Composant/AffectationMin/AffectationMin';
// variable constante pour la navigation
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='accueil'
        screenOptions={{
          headerShown: false}}>
        <Stack.Screen name="accueil" component={Acceuil} />
        <Stack.Screen name="affectMin" component={AffectationMin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
