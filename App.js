import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, Vibration, TextInput } from 'react-native';

let timer;

export default function App() {
  const [workTime, setWorkTime] = useState('25:00');
  const [breakTime, setBreakTime] = useState('5:00');
  const [time, setTime] = useState(workTime);
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

  const MinutestoMillseconds = (minutesAndSeconds) =>{
        minutesAndSeconds = minutesAndSeconds.split(":");
        let minutes = minutesAndSeconds[0];
        let seconds = minutesAndSeconds[1];
        let finalTime = (((parseInt(minutes)*60)+parseInt(seconds)) * 1000);
        return finalTime;
  }

  useEffect(()=>{
    console.log(work)
    if(work)
    {
      setTime(MinutestoMillseconds(workTime));
    }
    else{
      setTime(MinutestoMillseconds(breakTime));
    }
  },[work])

  useEffect(()=>{
    if(time === 0){
      console.log(time)
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
      setTime(MinutestoMillseconds(workTime))
    }
    else
    {
      setTime(MinutestoMillseconds(breakTime))
    }
    Vibration.vibrate(600);
  }
  const timeReg = /^([0-9]{0,3}:[0-5]{0,1}[0,9]{0,1})$/;
  const handleWork = (work) => {
    if(timeReg.test(work))
    {
      setWorkTime(work);
    }

  };
  const handleBreak = (breakT) => {
    if(timeReg.test(breakT))
    {
      setBreakTime(breakT);
    }

  };

  



  return (
    <View style={styles.container}>
        <Text>Enter work time(default = 25 min)</Text>
        <TextInput keyboardType='number-pad' style={styles.input} onChangeText={handleWork} value={workTime} />
        <Text>Enter break time(default = 5 min)</Text>
        <TextInput keyboardType='number-pad' style={styles.input} onChangeText={handleBreak} value={breakTime}/>
        <Button title="Set New times" onPress={()=>setTime(MinutestoMillseconds(workTime))} />
    

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
  },
  input:{
    borderWidth: 2,
    borderColor: 'black',
    marginBottom: 20,
    padding: 5
  }
});
