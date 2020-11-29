import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Music from "../assets/data/Musicdata";
function MainScreen() {
  const navigation = useNavigation();

  const musicalbum = (data) => {
    navigation.navigate("Music Album", { musicid: data });
  };

  return (
    <>
      <ScrollView style={{ backgroundColor: "white" }}>
        <View style={style.container}>
          {Music.map((data, key) => (
            <TouchableOpacity
              key={key}
              style={style.maindiv}
              onPress={() => {
                musicalbum(data.id);
              }}
            >
              <Image source={{ uri: data.image }} style={style.image} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </>
  );
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    top: "7%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    paddingTop: 1,
    paddingBottom: 50,
    justifyContent: "space-evenly",
    backgroundColor: "white",
  },
  image: {
    width: 350,
    height: 210,
    flex: 1,
    borderRadius: 15,
  },
  maindiv: {
    elevation: 20,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    margin: 9,
    borderRadius: 15,
  },
});

export default MainScreen;
