import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Image } from 'react-native';
import * as Linking from 'expo-linking';
import { Audio } from 'expo-av';
import Gif from 'react-native-gif';

const AlarmApp = () => {
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [numeroTelefono, setlinkmensaje] = useState('');
  const [link, setlinkyoutube] = useState('');
  const [alarms, setAlarms] = useState([]);
  const [sound, setSound] = useState(null);
  const [isAlarmActive, setIsAlarmActive] = useState(false);
  const [mensaje, setTextomensaje] = useState('');


  useEffect(() => {//funcion para validar si hay una alarma activa
    
  
    const interval = setInterval(async () => {
      const currentTime = new Date();
      const currentHour = currentTime.getHours().toString().padStart(2, '0');
      const currentMinute = currentTime.getMinutes().toString().padStart(2, '0');

      const matchedAlarm = alarms.find(alarm => alarm.hour === currentHour && alarm.minute === currentMinute);
  
      console.log("Ciclo -"+currentTime);//para mostrar los ciclos

      if (matchedAlarm ) {

        let executionCount = 0;

        while(executionCount < 10) {
          
          playAlarmSound();
          setTextomensaje('¡Es hora de la alarma!');
          await sleep(1000)
          setTextomensaje('');
          console.log(matchedAlarm.hour, ':', matchedAlarm.minute);
          
          executionCount++;
          setIsAlarmActive(true);
          console.log('*****ejecucion :'+executionCount);

         
        
          
        }if (executionCount==10) {
          if(link){openlinkvideo(link);}
          if(numeroTelefono){openlinkmensaje(numeroTelefono)};
          clearInterval(interval);
          console.log('****************');
        }

        
      }
    },60000);//una ejecuccion por minuto
  
    return () => clearInterval(interval);
  }, [alarms]);






//funcion sleep 
  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  };



//creamos una nueva alarma
  const handleSetAlarm = async () => {
    if (hour.length === 2 && minute.length === 2 && !isNaN(hour) && !isNaN(minute)) {
      const newAlarm = {
        index: Date.now(),
        hour: hour,
        minute: minute,
      };

      setAlarms([...alarms, newAlarm]);
      
      console.log('Alarma registrada:', hour, ':', minute);
      
      setTextomensaje('***Alarma registrada***');
      await sleep(5000)
      setHour('');
      setMinute('');
      setTextomensaje('');
      

    } else {
      setTextomensaje('Ingresa dos números válidos para la hora y los minutos.');
      await sleep(5000)
      setTextomensaje('');
    }
   
  };

  //sonar
  const playAlarmSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('./path/to/alarm-sound2.mp3'),
        { shouldPlay: true }
      );
      setSound(sound);
    } catch (error) {

      setTextomensaje('Error al reproducir el sonido de la alarma:', error);
      await sleep(5000)
      setTextomensaje('');
    }
  };

  
//apagar alarma
  const handleTurnOffAlarm = () => {
    if (sound) {
      sound.stopAsync();
    }
    setIsAlarmActive(false);
  };
  



//abrir video
  const openlinkvideo = async () => {
    try {
      console.log(link);
      
      function obtenerUltimaSeccionEnlace(enlace) {
        const partesEnlace = enlace.split('/');
        const ultimaSeccion = partesEnlace[partesEnlace.length - 1];
        return ultimaSeccion;
      }

      const url = "https://www.youtube.com/embed/"+ obtenerUltimaSeccionEnlace(link) + "/";
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        setTextomensaje('error en la aplicación');
        await sleep(5000)
        setTextomensaje('');
      }
    } catch (error) {
      setTextomensaje('Error al abrir:', error);
      await sleep(5000)
      setTextomensaje('');
    }
  };
  



//preparar mensaje
  const openlinkmensaje = async () => {
    try {

     const mensaje = 'Me quedé dormido';

     const url = `whatsapp://send?phone=+54911${numeroTelefono}&text=${encodeURIComponent(mensaje)}`;
      console.log(url);
    
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        setTextomensaje('error en la aplicación');
        await sleep(5000)
        setTextomensaje('');
      }
    } catch (error) {
      setTextomensaje('Error al abrir:', error);
      await sleep(5000)
      setTextomensaje('');
    }
  };
  

  



//vista
  return (
    <View style={styles.container}>
      
      <View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Hora   -  Minuto</Text>
            
          </View>

          <View style={styles.inputContainer}>
            
            <TextInput
              style={styles.input}
              placeholder="HH"
              value={hour}
              onChangeText={setHour}
              keyboardType="numeric"
              maxLength={2}
            />
            <TextInput
              style={styles.input}
              placeholder="MM"
              value={minute}
              onChangeText={setMinute}
              keyboardType="numeric"
              maxLength={2}
            />
          </View>

 


     

          {isAlarmActive ? (//cambio en la vista si esta activa
            <View>
              <Gif source={require('./Recursos/giphy.gif')} style={styles.gif} />
              <Text style={styles.alarmActiveText}>¡La alarma está sonando!</Text>
              <Button title="Apagar Alarma" onPress={handleTurnOffAlarm} />
            </View>
              
            ) : (
              <Button title="Crear Alarma" onPress={handleSetAlarm} />
            )}



          <View>
          <Text style={styles.texto}>{mensaje}</Text>
          </View>




          <View>
         <Text style={styles.label2}>numero de aviso</Text>
         <TextInput
              style={styles.inputmensaje}
              placeholder=""
              value={numeroTelefono}
              onChangeText={setlinkmensaje}
              keyboardType="numeric"
              maxLength={15}
            />

          <Text style={styles.label34}>ingrese-sin area y sin -</Text>

          <Text style={styles.label2}>link-video</Text>
           <TextInput
              style={styles.inputmensaje}
              placeholder=""
              value={link}
              onChangeText={setlinkyoutube}
              keyboardType="default"
              maxLength={50}
            />
            <Text style={styles.label34}>si ingreso enviar mensaje no abrira el video</Text>
            </View>






      {/*ALARMAS REGISTRADAS*/}
        <View style={styles.label3}>
          <Text style={styles.alarmsTitle}>Alarmas Registradas:</Text>
          {alarms.map((alarm,index) => (
            <Text key={alarm.index} style={styles.alarmItem}>
             {alarm.hour}:{alarm.minute}
            </Text>
          ))}
          
        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({//estilos
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    //justifyContent: 'center',
    marginTop: 100,
  },
  alarmActiveText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 80,
    alignSelf:'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  inputmensaje: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    flex: 1,
    marginRight: 10,
    fontSize: 16,
  },
  label2: {
    fontSize: 10,
    marginTop: 40,
  },
  label3: {
    fontSize: 10,
    marginTop: 50,
  },
  label34: {
    fontSize: 8,
    marginTop: -15,
  },
  input: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },gif:{
    width: 200,
    marginRight : 10,
    marginTop: -50,
  },
});

export default AlarmApp;
