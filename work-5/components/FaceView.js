import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';

async function askForCamera(setState){
   const {status} = await Camera.requestCameraPermissionsAsync();
   setState(status==="granted");
}

export default function FaceView() {

  const [hasCamera, setHasCamera] = React.useState(false);
  const [type, setType] = React.useState(Camera.Constants.Type.front);
  const [faces, setFaces] = React.useState(null);
  
  React.useEffect(()=>askForCamera(setHasCamera),[]);
  if(!hasCamera){
     //askForCamera(setHasCamera);
     return (
     <View style={styles.container}><Text>ไม่มีกล้อง</Text></View>
     );
  }
  
   var faceText = "";
   var img=[];

  if(faces!=null && faces.faces.length >0){
     var f = faces.faces[0]; 
     faceText = JSON.stringify(f);
     var pos={x:0, y:0}
     /*if(f.leftEyePosition != null){
        pos=f.leftEyePosition;
     }*/
     //ถ้าเป็น android ให้ใช้ 
      if(f.LEFT_EYE != null){
        pos=f.LEFT_EYE;
     }
    
     faceText = JSON.stringify(pos);
     img[0] = (
     <Image 
     source={require("../assets/Oat.jpg")} 
     style={{
       position:"absolute", 
       width:30,
       height:30,
       left:pos.x,
       top:pos.y
       }}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Camera 
      type={type} 
      style={{height: "100%", width:"100%"}}
        onFacesDetected = {setFaces} 
        faceDetectorSettings={{
        mode: FaceDetector.FaceDetectorMode.fast,
        detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
        runClassifications: FaceDetector.FaceDetectorClassifications.all,
        minDetectionInterval: 100,
        tracking: true,
        }}
      />
        <Text style={{ position: 'absolute', top:0,left:100,fontSize:24, }}>OATkub </Text>
      {img}
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    justifyContent: 'center',
    padding: 5,
    height : 400,
  }
});