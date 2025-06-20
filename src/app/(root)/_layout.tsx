import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  ExpenseContext,
  ExpenseContextProvider,
} from "@/src/context/expensesContext";
import { colors } from "@/src/constant/colors";
import { useContext, useLayoutEffect } from "react";
import { supabase } from "../_layout";
import { AuthContext } from "@/src/context/authContext";
import { Alert } from "react-native";
import { Expenses } from "@/src/model/expenses";

function Main() {
  const { setExpenseData } = useContext(ExpenseContext);

  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: colors.primary400 },
          contentStyle: { backgroundColor: "#f9f9f9" },
          headerTintColor: "white",
        }}>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="manageExpenses"
          options={{
            title: "Manage Expenses",
            presentation: "modal",
          }}
        />
      </Stack>
    </>
  );
}

export default function Layout() {
  return (
    <ExpenseContextProvider>
      <Main />
    </ExpenseContextProvider>
  );
}
