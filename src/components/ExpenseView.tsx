import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../constant/colors";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { Expenses } from "../model/expenses";

const ExpenseView = ({ item }: { item: Expenses }) => {
  return (
    <View className="m-1 px-4 overflow-hidden">
      <Pressable
        style={({ pressed }) =>
          pressed && { opacity: 0.75, overflow: "hidden" }
        }
        onPress={() => {
          router.push({
            pathname: "/manageExpenses",
            params: { expenseId: item.id },
          });
        }}
        android_ripple={{ color: colors.primary200 }}>
        <View
          style={{
            backgroundColor: colors.primary200,
            alignItems: "center",
          }}
          className="flex-row justify-between rounded-xl p-2 ">
          <View className="pl-3">
            <Text>{item.description}</Text>
            <Text>{item.date.toDateString()}</Text>
          </View>
          <View
            style={{
              backgroundColor: "white",
              height: 50,
              width: 75,
              alignItems: "center",
              justifyContent: "center",
            }}
            className="rounded-xl ">
            <Text className="font-bold">{item.amount}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default ExpenseView;

const styles = StyleSheet.create({});
