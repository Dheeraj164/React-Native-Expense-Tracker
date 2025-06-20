import { Alert, KeyboardAvoidingView, StyleSheet, View } from "react-native";
import React, { useContext, useLayoutEffect, useState } from "react";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { ExpenseContext } from "@/src/context/expensesContext";
import { colors } from "@/src/constant/colors";
import IconButton from "@/src/components/IconButton";
import Input from "@/src/components/Input";
import Button from "@/src/components/Button";
import { supabase } from "../_layout";
import { AuthContext } from "@/src/context/authContext";
import { Expenses } from "@/src/model/expenses";

const ManageExpenses = () => {
  const [amount, setAmount] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");

  const expenseContext = useContext(ExpenseContext);
  const { userDetails } = useContext(AuthContext);
  const navigation = useNavigation();
  const { expenseId } = useLocalSearchParams();
  const id = Array.isArray(expenseId) ? expenseId[0] : expenseId;
  const isEditing = !!id;

  useLayoutEffect(() => {
    if (isEditing) {
      const expenseDetail: Expenses | undefined = expenseContext.expenses.find(
        (expense) => expense.id.toString() === id
      );

      navigation.setOptions({
        title: "Update Expenses",
      });

      if (!expenseDetail) {
        Alert.alert("Error", "Expense not found.");
        router.canGoBack() && router.back();
        return;
      }

      const dateValue = [
        expenseDetail.date.getFullYear(),
        String(expenseDetail.date.getMonth() + 1).padStart(2, "0"),
        String(expenseDetail.date.getDate()).padStart(2, "0"),
      ].join("-");

      setAmount(expenseDetail.amount.toString());
      setDate(dateValue);
      setDescription(expenseDetail.description);
    } else {
      navigation.setOptions({
        title: "New Expenses",
      });
    }
  }, [navigation, isEditing, id, expenseContext.expenses]);

  function cancelExpenseHandler() {
    router.back();
  }

  async function updateExpenseHandler() {
    const newData = {
      id: id,
      description,
      amount: parseFloat(amount),
      date: new Date(date),
    };

    if (isEditing) {
      const { error } = await supabase
        .from("expenses")
        .update({
          amount: newData.amount,
          created_at: newData.date,
          description: newData.description,
        })
        .eq("id", newData.id);

      if (error) {
        Alert.alert(error.name, error.message);
        return;
      }

      expenseContext.updateExpenses(id, newData);
    } else {
      const { data, error } = await supabase
        .from("expenses")
        .insert({
          amount: newData.amount,
          created_at: newData.date,
          description: newData.description,
          userId: userDetails?.user.id,
        })
        .select();

      if (error) {
        Alert.alert(error.name, error.message);
        return;
      }

      if (data && data.length > 0) {
        newData.id = data[0].id.toString();
        expenseContext.addExpenses(newData);
      }
    }

    router.back();
  }

  async function deleteExpenses() {
    const { error } = await supabase.from("expenses").delete().eq("id", id);
    if (error) {
      Alert.alert(error.name, error.message);
      return;
    }

    expenseContext.removeExpenses(id);
    router.back();
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <View
        style={{ flex: 1, backgroundColor: colors.primary200 }}
        className="items-center">
        <View className="w-full items-center flex justify-center pt-5">
          <View className="flex-row justify-center items-center">
            <View style={{ flex: 1 }}>
              <Input
                label="Amount"
                inputConfig={{
                  keyboardType: "number-pad",
                  value: amount,
                  onChangeText: setAmount,
                }}
              />
            </View>
            <View className="flex-1">
              <Input
                label="Date"
                inputConfig={{
                  placeholder: "YYYY-MM-DD",
                  maxLength: 10,
                  value: date,
                  onChangeText: setDate,
                }}
              />
            </View>
          </View>
          <Input
            label="Description"
            inputConfig={{
              multiline: true,
              value: description,
              onChangeText: setDescription,
            }}
          />
        </View>

        <View className="flex-row mt-3 pt-4">
          <Button onPress={cancelExpenseHandler} mode="flat">
            Cancel
          </Button>
          <Button onPress={updateExpenseHandler}>
            {isEditing ? "Update" : "Add"}
          </Button>
        </View>

        {isEditing && (
          <View className="border-t border-t-black border-opacity-50 w-full items-center p-3 m-2">
            <IconButton
              icon="trash"
              size={30}
              color={colors.error500}
              onPress={deleteExpenses}
            />
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default ManageExpenses;

const styles = StyleSheet.create({});
