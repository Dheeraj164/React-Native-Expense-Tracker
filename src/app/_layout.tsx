import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, Slot, useSegments } from "expo-router";
import { AuthContext, AuthContextProvider } from "../context/authContext";

export const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL as string,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY as string,
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);
export function Main() {
  const { setUserDetails, userDetails } = useContext(AuthContext);
  const segment = useSegments();
  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        setUserDetails(session);
      }
      if (event === "INITIAL_SESSION" && session != null) {
        setUserDetails(session);
      }
      if (event === "SIGNED_OUT") {
        console.log(event);
        setUserDetails(null);
      }
    });
  }, []);

  useEffect(() => {
    if (userDetails && segment[0] === "(auth)") {
      // router.replace("/(root)");
      router.replace("/(root)");
    } else if (userDetails && segment[0] !== "(auth)") {
      router.replace("/(auth)");
    }
  }, [userDetails]);
  return <Slot />;
}

// Enclosing main with context Provider
export default function Layout() {
  return <AuthContextProvider children={<Main />} />;
}

const styles = StyleSheet.create({});
