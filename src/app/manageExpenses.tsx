import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useContext, useLayoutEffect, useState } from "react";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { colors } from "../constant/colors";
import Button from "../components/Button";
import IconButton from "../components/IconButton";
import { ExpenseContext } from "../context/expensesContext";
import Input from "../components/Input";

const manageExpenses = () => {
  const [amount, setAmount] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const expenseContext = useContext(ExpenseContext);
  const navigation = useNavigation();
  const { expenseId } = useLocalSearchParams();
  const isEditing = !!expenseId;
  const id = Array.isArray(expenseId) ? expenseId[0] : expenseId;
  useLayoutEffect(() => {
    if (isEditing) {
      const expenseDetail = expenseContext.expenses.filter(
        (expense) => expense.id === id
      );
      navigation.setOptions({
        title: isEditing ? `Update Expenses` : "New Expenses",
      });

      const dateValue =
        expenseDetail[0].date.getFullYear() +
        "-" +
        (expenseDetail[0].date.getMonth() + 1) +
        "-" +
        expenseDetail[0].date.getDate();

      console.log(dateValue);

      setAmount(expenseDetail[0].amount.toLocaleString());
      setDate(dateValue);
      setDescription(expenseDetail[0].description);
    }
  }, [navigation, isEditing]);

  function cancleExpenseHandler() {
    router.back();
  }

  function updateExpenseHandler() {
    let data = {
      description: description,
      amount: parseFloat(amount),
      date: new Date(date),
    };
    if (isEditing) {
      expenseContext.updateExpenses(id, data);
    } else {
      expenseContext.addExpenses(data);
    }
    router.back();
  }
  function deleteExpenses() {
    console.log(id);
    expenseContext.removeExpenses(id);
    router.back();
  }
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <View
        style={{ flex: 1, backgroundColor: colors.primary200 }}
        className=" items-center">
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
          <Button onPress={cancleExpenseHandler} mode="flat">
            Cancle
          </Button>
          <Button onPress={updateExpenseHandler}>
            {isEditing ? "Update" : "Add"}
          </Button>
        </View>
        {isEditing ? (
          <View className="border-t border-t-black border-opacity-50 w-full items-center p-3 m-2">
            <IconButton
              icon={"trash"}
              size={30}
              color={colors.error500}
              onPress={deleteExpenses}
            />
          </View>
        ) : (
          <></>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default manageExpenses;

const styles = StyleSheet.create({});
