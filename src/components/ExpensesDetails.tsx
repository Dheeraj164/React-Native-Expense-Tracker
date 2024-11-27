import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../constant/colors";
import { Expenses } from "../model/expenses";
interface ExpensesDetailstype {
  period: string;
  expenses: Expenses[];
}
const ExpensesDetails = (props: ExpensesDetailstype) => {
  const expenseSum = props.expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  return (
    <View className="flex-row mt-8 mx-6 justify-between bg-white p-2 rounded-xl ">
      <Text
        style={{ color: colors.primary500 }}
        className="text-sm opacity-60 pt-1">
        {props.period}
      </Text>
      <Text className="font-bold text-lg"> ${expenseSum.toFixed(2)}</Text>
    </View>
  );
};

export default ExpensesDetails;

const styles = StyleSheet.create({});
