import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { colors } from "@/src/constant/colors";

export default function _layout() {
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: { backgroundColor: colors.primary400 },
        headerTintColor: "white",
      }}>
      <Stack.Screen
        name="index"
        options={{ title: "Login Page", headerTitleAlign: "center" }}
      />
      <Stack.Screen name="signup" options={{ title: "Signup Page" }} />
    </Stack>
  );
}

const styles = StyleSheet.create({});
