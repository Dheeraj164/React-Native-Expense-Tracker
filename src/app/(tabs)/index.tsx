import { Platform, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { colors } from "@/src/constant/colors";
import ExpensesDetails from "@/src/components/ExpensesDetails";
import ExpensesListView from "@/src/components/ExpensesListView";
import { dummyExpenses } from "@/src/data/dummyData";
import { ExpenseContext } from "@/src/context/expensesContext";

export default function Index() {
  const expensesContext = useContext(ExpenseContext);
  let comp: React.ReactNode;
  if (expensesContext.expenses.length === 0) {
    comp = (
      <View className="flex-1 justify-center items-center">
        <Text className="text-white font-bold text-xl">No recent Expenses</Text>
      </View>
    );
  } else {
    comp = <ExpensesListView expenses={expensesContext.expenses} />;
  }
  return (
    <View style={styles.outerContainer}>
      <ExpensesDetails
        period="All Expenses"
        expenses={expensesContext.expenses}
      />
      {comp}
    </View>
  );
}
8;

const styles = StyleSheet.create({
  outerContainer: { flex: 1, backgroundColor: colors.primary700 },
});
