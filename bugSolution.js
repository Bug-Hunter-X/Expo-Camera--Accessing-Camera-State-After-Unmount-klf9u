import * as React from 'react';
import { Camera, useCameraDevices } from 'expo-camera';

export default function CameraComponent() {
  const [hasPermission, setHasPermission] = React.useState(null);
  const [type, setType] = React.useState(Camera.Constants.Type.back);
  const [isRecording, setIsRecording] = React.useState(false);
  const devices = useCameraDevices();
  const device = devices?.[type];

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

    return () => {
      // Cleanup function to stop recording before unmount
      if (isRecording) {
        stopRecording();
      }
    };
  }, []);

  const startRecording = async () => {
    // ... (recording logic)
    setIsRecording(true);
  };

  const stopRecording = async () => {
    // ... (stop recording logic)
    setIsRecording(false);
  };

  if (hasPermission === null) {
    return <View />; 
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <Camera style={{ flex: 1 }} type={type} ratio={'16:9'} camera={device}>
      <Button title="Record" onPress={startRecording} disabled={isRecording} />
      {isRecording && <Button title="Stop" onPress={stopRecording} />}
    </Camera>
  );
}