import IconButton from "@/src/components/IconButton";
import { colors } from "@/src/constant/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: { backgroundColor: colors.primary400 },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: colors.primary400 },
        tabBarActiveTintColor: colors.accent500,
        headerRight: () => (
          <IconButton
            icon={"add-outline"}
            size={25}
            color="white"
            onPress={() => {
              router.push("/manageExpenses");
            }}
          />
        ),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "All Expenses",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="recentExpenses"
        options={{
          title: "Recent Expenses",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="time" color={color} size={size} />
          ),
          tabBarLabel: "Recent",
        }}
      />
    </Tabs>
  );
}
