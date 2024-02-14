import * as React from 'react';
import { Text, View, StyleSheet} from 'react-native';
import Constants from 'expo-constants';
// You can import supported modules from npm
import { Card } from 'react-native-paper';
import FaceView from './components/FaceView';


import * as Font from 'expo-font';

async function loadFonts(setState) {  
  await Font.loadAsync({
    Roboto   : require("./assets/AomsinThin.ttf"),
    //Dimsum : require("./assets/Dimsum.ttf"),
  });
  setState(true);
}

export default function App() {
   const [fontLoaded, setFontLoaded] = React.useState(false);

 //React.useEffect(()=>loadFonts(setFontLoaded), [ ]);
 if(!fontLoaded){
    loadFonts(setFontLoaded);
    return <View style={{padding:50}}><Text>Loading</Text></View>
  }
  

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
       Work 5: OAT
      </Text>
      <Card>
        <FaceView />
      </Card>
      <Text style={styles.paragraph}>
       643020587-0 Suradid Khunnoi
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily : "Mali",
    textAlign: 'center',
  },
});