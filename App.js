import { useState } from "react";
import { StyleSheet, Text, ImageBackground, StatusBar } from "react-native";
import { useFonts } from "expo-font";
import StartGameScreen from "./screens/StartGameScreen";
import { LinearGradient } from "expo-linear-gradient";
import GameScreen from "./screens/GameScreen";
import Colors from "./constants/colors";
import GameOverScreen from "./screens/GameOverScreen";
import AppLoading from "expo-app-loading";
export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(true);
  const [guessRounds, setGuessRounds] = useState(0);

  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  }

  function gameOverHandler(numberOfRounds) {
    setGameIsOver(true);
    setGuessRounds(numberOfRounds);
  }

  function startNewGameHandler() {
    setUserNumber(null);
    setGuessRounds(0);
  }

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;

  if (userNumber) {
    screen = (
      <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
    );
  }
  if (gameIsOver && userNumber) {
    screen = (
      <GameOverScreen
        userNumber={userNumber}
        roundsNumber={guessRounds}
        onStartNewGame={startNewGameHandler}
      />
    );
  }

  return (
    // <ScrollView style={styles.rootScreen}>
    <>
      <StatusBar style="dark" />
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
    </>
  );
}

const st = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
});

const styles = StyleSheet.create({});
