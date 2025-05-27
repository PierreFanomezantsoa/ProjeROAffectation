import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
export default function Acceuil({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.styleTextTop}>
          <Text style={styles.styleTextPrem}>Afféctation</Text>
      </View>
      <View>
        <LottieView
          source={require('../assets/hello.json')}
          autoPlay
          loop
          style={{ width:400, height: 400,
            color: 'teal',
           }}
        />
      </View>
      <View style={styles.bouttomBar}>
        <TouchableOpacity onPress={() => navigation.navigate('affectMin')}>
            <Text style={styles.bouttonStyle}> Commencer   <Icon name="arrow-right" size={15} color="white" style={{ marginRight: 8 }} /></Text>
        </TouchableOpacity>
      <Text style={styles.title}>Projet  en RO</Text>
      <View>
        <Text style={styles.text_digital}>
          Digital 2025 
        </Text>
      </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    //styles pour boutton
    bouttonStyle:{
        color: 'white',
        padding:10,
        width: 200,
        textAlign: 'center',
        margin: 10,
        fontSize: 20,
        borderWidth: 1,
        borderColor: 'white',
        fontFamily:'cursive',
        borderRadius: 20,
    },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title:{
    margin:15,
    color: 'white',
    fontWeight: 'bold',
    padding :7,
    fontSize:30,
    fontFamily:'cursive',
  },
  text_digital:{
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    fontFamily:'cursive',
  },
  bouttomBar: {
    width: '100%',
    padding:3,
    height: 300,
    borderRadius:25,
    backgroundColor: 'teal',
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  styleTextTop: {
    fontSize: 25,
    fontWeight: 'bold',
    top: 0,
    color: 'teal',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  
  styleTextPrem: {
    fontSize: 35,
    fontWeight: 'bold',
    top: 0,
    color: 'teal',
    textAlign: 'center',
    fontFamily: 'cursive',
    fontWeight: 'bold',
  },
});
