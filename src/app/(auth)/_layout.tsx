import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Login Page", headerTitleAlign: "center" }}
      />
      <Stack.Screen name="signup" options={{ title: "Signup Page" }} />
    </Stack>
  );
}

const styles = StyleSheet.create({});
