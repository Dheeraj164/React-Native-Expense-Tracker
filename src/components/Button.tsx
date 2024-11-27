import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { colors } from "../constant/colors";

interface ButtonType {
  children: React.ReactNode;
  mode?: string;
  onPress: () => any;
  style?: StyleProp<ViewStyle>;
}

const Button = ({ children, mode, onPress, style }: ButtonType) => {
  return (
    <View style={style}>
      <Pressable onPress={onPress}>
        <View
          style={mode != "flat" ? { backgroundColor: colors.primary800 } : {}}
          className={" rounded-full py-2 px-6 m-2"}>
          <Text className="text-gray-200">{children}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({});
