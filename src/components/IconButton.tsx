import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const IconButton = ({
  icon,
  size,
  color,
  onPress,
}: {
  icon: any;
  size: number;
  color: string;
  onPress: () => any;
}) => {
  return (
    <Pressable onPress={onPress}>
      <Ionicons
        style={{ marginHorizontal: 15 }}
        name={icon}
        size={size}
        color={color}
      />
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({});
