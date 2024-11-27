import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import ExpensesDetails from "@/src/components/ExpensesDetails";
import { colors } from "@/src/constant/colors";
import { dummyExpenses } from "@/src/data/dummyData";
import { ExpenseContext } from "@/src/context/expensesContext";
import ExpensesListView from "@/src/components/ExpensesListView";

const recentExpenses = () => {
  const expensesContext = useContext(ExpenseContext);

  const recentExpenses = expensesContext.expenses.filter((expense) => {
    const today = new Date();
    const recentDate = new Date();
    recentDate.setDate(today.getDate() - 7);
    return expense.date >= recentDate && expense.date <= today;
  });
  let comp: React.ReactNode;
  if (recentExpenses.length === 0) {
    comp = (
      <View className="flex-1 justify-center items-center">
        <Text className="text-white font-bold text-xl">No recent Expenses</Text>
      </View>
    );
  } else {
    comp = <ExpensesListView expenses={recentExpenses} />;
  }
  return (
    <View style={{ backgroundColor: colors.primary700 }} className=" h-full">
      <ExpensesDetails period="Last 7-days" expenses={recentExpenses} />
      {comp}
    </View>
  );
};

export default recentExpenses;

const styles = StyleSheet.create({});
