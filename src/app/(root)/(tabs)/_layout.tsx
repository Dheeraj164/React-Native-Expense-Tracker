import IconButton from "@/src/components/IconButton";
import { colors } from "@/src/constant/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, Tabs } from "expo-router";
import { Pressable, Text } from "react-native";
import { supabase } from "../../_layout";

export default function Layout() {
  return (
    <>
      <Pressable
        style={{
          position: "absolute",
          bottom: 60,
          right: 10,
          backgroundColor: colors.accent500,
          zIndex: 60,
          borderRadius: 100,
        }}
        onHoverIn={() => console.log("hover")}
        onPress={() => {
          router.push("/manageExpenses");
        }}>
        <Ionicons
          style={{ padding: 15 }}
          name={"add-outline"}
          size={25}
          color="white"
        />
      </Pressable>
      <Tabs
        screenOptions={{
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: colors.primary400 },
          headerTintColor: "white",
          tabBarStyle: { backgroundColor: colors.primary400 },
          tabBarActiveTintColor: colors.accent500,
          headerRight: () => (
            <>
              <Pressable
                onPress={async () => {
                  console.log("pressed logout");
                  await supabase.auth.signOut();
                }}>
                <Ionicons
                  style={{ padding: 15 }}
                  name={"log-out-outline"}
                  size={25}
                  color="white"
                />
              </Pressable>
            </>
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
    </>
  );
}
