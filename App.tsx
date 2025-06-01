import { StatusBar } from 'expo-status-bar';
import { Pressable, Text, View, Animated, Vibration} from 'react-native';
import './global.css';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useRef, useState, } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function App() {
  const [contador, setContador] = useState(0);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Maximo permitido para el contador
  const MAX_COUNT = 30;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.8,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, [contador, scaleAnim]);

  const sumarNumero = () => {
    if (contador < MAX_COUNT) {
      setContador((prev) => prev + 1);
      Vibration.vibrate(50);
    }
    if (contador === MAX_COUNT) {
      console.log('Limite alcanzado');
    }
  };

  const restarNumero = () => {
    if (contador > 0) {
      setContador((prev) => prev - 1);
      Vibration.vibrate(100);
    } else {
      console.log('No se puede restar');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-indigo-500">
      <StatusBar style="light" backgroundColor="indigo" />
      <View className="mt-20 flex flex-1 items-center">
        <Text className="text-4xl font-bold text-white">Contador de clicks</Text>

        <View className="mt-10 flex flex-row gap-32">
          <Pressable onPress={restarNumero}>
            <AntDesign name="minuscircle" size={60} color="white" />
          </Pressable>
          
          <Pressable onPress={sumarNumero}>
            <AntDesign name="pluscircle" size={60} color="white" />
          </Pressable>
        </View>

        <View className="mt-10 flex flex-col items-center">
          <Text className="text-4xl font-bold text-white">Contador</Text>
          <Animated.Text
            className="text-8xl font-bold text-white mt-10"
            style={{ transform: [{ scale: scaleAnim }] }}>
            {contador}
          </Animated.Text>
        </View>

        <View>
          {contador === MAX_COUNT && (
            <Text className="text-4xl font-bold text-white mt-10">
              Limite alcanzado
            </Text>
          )}
          {contador === 0 && (
            <Text className="text-4xl font-bold text-white mt-10">
              No se puede restar
            </Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
