import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, Vibration } from 'react-native';

let timer;

export default function App() {
  const [time, setTime] = useState(1500000);
  const [work,setWork] = useState(true);

  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return (
      seconds == 60 ?
      (minutes+1) + ":00" :
      minutes + ":" + (seconds < 10 ? "0" : "") + seconds
    );
  }
  useEffect(()=>{
    console.log(work)
    if(work)
    {
      setTime(1500000);
    }
    else{
      setTime(300000);
    }
  },[work])

  useEffect(()=>{
    if(time === 0){
      setWork(!work);
      Vibration.vibrate(1000);
    }
  },[time])


  const countingDown = () => {

    setTime(prevState => prevState - 1000 );
  }

  const handleStart = () => {
    if(timer === undefined || timer === null)
    {
      timer = setInterval(countingDown, 1000);
    }

  }
  const handleStop = () => {

    clearInterval(timer);
    timer = null;
    
    Vibration.vibrate(600);
  }
  const handleRestart = () => {
    if(work)
    {
      setTime(1500000)
    }
    else
    {
      setTime(300000)
    }
    Vibration.vibrate(600);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.time}>{millisToMinutesAndSeconds(time)}</Text>
      <View style={styles.button}>
        <Button title='Start' onPress={handleStart}/>
      </View>
      <View style={styles.button}>
        <Button title='Stop' onPress={handleStop} />
      </View>
      <View style={styles.button}>
        <Button title='Reset' onPress={handleRestart} />
      </View>
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
  time: {
    fontSize: 48,
  },
  button: {
    marginTop: 20,
  }
});
