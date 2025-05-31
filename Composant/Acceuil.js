import { TouchableOpacity, StyleSheet, Text, View, Image } from 'react-native';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Accueil({navigation}) {
  return (
    <View style={styles.container}>
      {/* Cercle jaune d'arrière-plan */}
      <View style={styles.backgroundCircle} />
      
      {/* Contenu principal */}
      <View style={styles.mainContent}>
        {/* Animation ou illustration */}
        <View style={styles.illustrationContainer}>
          <LottieView
            source={require('../assets/animation_Json.json')} // Remplacez par votre animation
            autoPlay
            loop
            style={styles.animation}
          />
          {/* Si vous n'avez pas d'animation appropriée, vous pouvez utiliser une image */}
          {/* <Image 
            source={require('../assets/learning-illustration.png')} 
            style={styles.illustration}
            resizeMode="contain"
          /> */}
        </View>

        {/* Texte principal */}
        <View style={styles.textContainer}>
          <Text style={styles.mainText}>
            Optimisez Partout,{'\n'}
            <Text style={styles.highlightText}>N'importe quand. Accélérez{'\n'}</Text>
            <Text style={styles.underlineText}>Votre Affectation</Text> et au-delà.
          </Text>
        </View>
      </View>

      {/* Barre du bas */}
      <View style={styles.bottomBar}>
        <TouchableOpacity 
          style={styles.startButton}
          onPress={() => navigation.navigate('affectMin')}
        >
          <Text style={styles.startButtonText}>Commencer</Text>
          <View style={styles.arrowContainer}>
            <Icon name="long-arrow-right" size={18} color="white" />
          </View>
        </TouchableOpacity>
        
        <Text style={styles.projectTitle}>Projet en Recherche Opérationnelle</Text>
        <Text style={styles.digitalText}>Digital 2025</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    position: 'relative',
  },
  
  backgroundCircle: {
    position: 'absolute',
    width: 350,
    height: 350,
    borderRadius: 175,
    backgroundColor: '#FFF4E6',
    top: 80,
    left: '50%',
    transform: [{ translateX: -175 }],
    zIndex: 0,
  },
  
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    zIndex: 1,
  },
  
  illustrationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  
  animation: {
    width: 280,
    height: 280,
  },
  
  illustration: {
    width: 280,
    height: 280,
  },
  
  textContainer: {
    alignItems: 'center',
    fontFamily:'georgia',
    paddingHorizontal: 20,
  },
  
  mainText: {
    fontSize: 20,
    color: '#333333',
    textAlign: 'center',
    lineHeight: 36,
    fontWeight: '800',
  },
  
  highlightText: {
    fontWeight: '300',
    color: '#333333',
  },
  
  underlineText: {
    fontWeight: '700',
    color: 'teal',
    fontWeight:'bold',
    textDecorationColor: '#FFA500',
    textDecorationStyle: 'solid',
  },
  
  bottomBar: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 30,
    paddingVertical: 25,
    alignItems: 'center',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'teal',
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 20,
    minWidth: 250,
  },
  
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    fontFamily:'georgia',
    textAlign: 'center',
  },
  
  arrowContainer: {
    backgroundColor: '#FFA500',
    width: 35,
    height: 35,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  
  projectTitle: {
    fontSize: 16,
    color: '#666666',
    fontWeight: '800',
    marginBottom: 5,
    textAlign: 'center',
  },
  
  digitalText: {
    fontSize: 14,
    color: '#999999',
    fontWeight: '400',
    textAlign: 'center',
  },
});