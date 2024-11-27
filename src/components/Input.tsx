import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import React from "react";
import { colors } from "../constant/colors";
interface inputProps {
  label: string;
  inputConfig?: TextInputProps;
}
const Input = ({ label, inputConfig }: inputProps) => {
  return (
    <View className="w-full px-[10%] my-2">
      <Text className="ml-5">{label}</Text>
      <View
        style={{ backgroundColor: colors.primary100 }}
        className="border border-black  rounded-2xl px-3 py-1">
        <TextInput
          className="font-bold text-md py-2"
          style={
            inputConfig?.multiline
              ? {
                  minHeight: 150,
                  textAlignVertical: "top",
                  color: colors.primary700,
                }
              : [{ color: colors.primary700 }]
          }
          {...inputConfig}
        />
      </View>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({});
