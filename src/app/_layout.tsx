import { Stack } from "expo-router";
import { colors } from "../constant/colors";
import { ExpenseContextProvider } from "../context/expensesContext";
import { StatusBar } from "expo-status-bar";

export default function Layout() {
  return (
    <>
      <StatusBar style="light" />
      <ExpenseContextProvider>
        <Stack
          screenOptions={{
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: colors.primary400 },
            contentStyle: { backgroundColor: "" },
            headerTintColor: "white",
          }}>
          <Stack.Screen
            name="(tabs)"
            options={{
              headerTitleAlign: "center",
              title: "Tab",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="manageExpenses"
            options={{
              headerTitleAlign: "center",
              title: "ManageExpenses",
              presentation: "modal",
              // headerShown: false,
            }}
          />
        </Stack>
      </ExpenseContextProvider>
    </>
  );
}
