import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import ExpenseView from "./ExpenseView";
import { Expenses } from "../model/expenses";
// interface ExpensesListView {

//     expenses: {
//       id: string;
//       description: string;
//       amount: number;
//       date: Date;
//     }[];
//   }
const ExpensesListView = ({ expenses }: { expenses: Expenses[] }) => {
  return (
    <View className="mt-3 flex-1 ">
      <FlatList
        data={expenses}
        keyExtractor={(key) => key.id}
        renderItem={({ item }) => <ExpenseView item={item} />}
      />
    </View>
  );
};

export default ExpensesListView;

const styles = StyleSheet.create({});
