import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,Button} from 'react-native';
import * as Linking from 'expo-linking';


/*const openInstagram = () => {
  Linking.openURL('https://expo.io');
};*/

const openInstagram = async () => {
  try {
    const url = 'https://www.youtube.com/watch?v=lyapKJBcAlo';
    //const url = 'https://www.instagram.com/';
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.log('La aplicación de Instagram no está instalada');
    }
  } catch (error) {
    console.log('Error al abrir Instagram:', error);
  }
};

export default function App() {

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
     
     <Button title="Abrir Instagram" onPress={openInstagram} />
     </View>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
