import React, { useState, useEffect } from "react";
import { Audio } from "expo-av";
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import play from "../assets/images/play.png";
import pause from "../assets/images/pause.png";
import next from "../assets/images/next.png";
import previous from "../assets/images/previous.png";
import Music from "../assets/data/Musicdata";
import Svg from "react-native-svg";
const soundObject = new Audio.Sound();
var val;
function MusicAlbum() {
  const [music, setMusic] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [isplay, setIsplay] = useState(false);
  const route = useRoute();
  let index;
  useEffect(() => {
    index = route.params.musicid;
    setMusic(Music[index].Music);
  }, []);

  const playmusic = async (data) => {
    val = data.id;
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS,
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });

      setToggle(false);
      setIsplay(true);
      await soundObject.unloadAsync();
      await soundObject.loadAsync({ uri: data.MusicUrl });
      await soundObject.playAsync();
      soundObject.setVolumeAsync(1);
    } catch (error) {
      console.log(error);
    }
  };

  const playpause = async () => {
    if (isplay) {
      toggle ? await soundObject.playAsync() : await soundObject.pauseAsync();
      setToggle(!toggle);
    } else {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS,
          playsInSilentModeIOS: true,
          staysActiveInBackground: true,
          interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
        });
        await soundObject.unloadAsync();
        await soundObject.loadAsync({ uri: music[0].MusicUrl });
        await soundObject.playAsync();
        soundObject.setVolumeAsync(1);
        setToggle(false);
        setIsplay(true);
        val = 1;
      } catch (error) {
        console.log(error);
      }
    }
  };

  const nextmusic = async () => {
    if (val < 5) {
      val = val + 1;
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS,
          playsInSilentModeIOS: true,
          staysActiveInBackground: true,
          interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
        });
        setToggle(false);
        await soundObject.unloadAsync();
        await soundObject.loadAsync({ uri: music[val].MusicUrl });
        await soundObject.playAsync();
        soundObject.setVolumeAsync(1);
        setIsplay(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const previousmusic = async () => {
    if (val > 0) {
      val = val - 1;
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS,
          playsInSilentModeIOS: true,
          staysActiveInBackground: true,
          interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
        });
        setToggle(false);
        await soundObject.unloadAsync();
        await soundObject.loadAsync({ uri: music[val].MusicUrl });
        await soundObject.playAsync();
        soundObject.setVolumeAsync(1);
        setIsplay(true);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <View style={{ display: "flex", height: "100%" }}>
      <View style={{ flex: 9 }}>
        <ScrollView>
          {music.map((data, key) => (
            <TouchableOpacity
              key={key}
              style={style.maindiv}
              onPress={() => {
                playmusic(data);
              }}
            >
              <Image source={{ uri: data.Musicimage }} style={style.image} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={{ flex: 1 }}>
        <View style={style.icons}>
          <TouchableOpacity onPress={previousmusic}>
            <Image source={previous} style={style.iconsimage} />
          </TouchableOpacity>
          {toggle ? (
            <TouchableOpacity onPress={playpause}>
              <Image source={play} style={style.iconsimage} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={playpause}>
              <Image source={pause} style={style.iconsimage} />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={nextmusic}>
            <Image source={next} style={style.iconsimage} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const style = StyleSheet.create({
  maincontainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  innercontainer: {
    flex: 7.5,
    height: 500,
  },
  container: {
    top: "7%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    paddingTop: 0,
    paddingBottom: 50,
    justifyContent: "space-evenly",
    height: "50%",
  },
  image: {
    position: "relative",
    alignSelf: "center",
    width: 350,
    height: 210,
    flex: 1,
    borderRadius: 15,
  },
  maindiv: {
    margin: 9,
    borderRadius: 15,
  },
  icons: {
    flex: 2.5,
    height: 100,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  iconsimage: {
    width: 65,
    height: 65,
    margin: 7,
  },
});

export default MusicAlbum;
