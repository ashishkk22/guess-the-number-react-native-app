import { useState } from "react";
import {
  StyleSheet,
  Text,
  ImageBackground,
  View,
  SafeAreaView,
} from "react-native";

import StartGameScreen from "./screens/StartGameScreen";
import { LinearGradient } from "expo-linear-gradient";
import GameScreen from "./screens/GameScreen";
import Colors from "./constants/colors";
export default function App() {
  const [userNumber, setUserNumber] = useState();
  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber);
  }

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;

  if (userNumber) {
    screen = <GameScreen />;
  }
  return (
    <LinearGradient
      colors={[Colors.primary700, Colors.accent500]}
      style={st.rootScreen}
    >
      <ImageBackground
        source={require("./assets/images/background_img.jpg")}
        resizeMode="cover"
        style={{ width: "100%", height: "100%" }}
        imageStyle={{ opacity: 0.15 }}
      >
        {screen}
      </ImageBackground>
    </LinearGradient>
  );
}

const st = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
});

const styles = StyleSheet.create({});
