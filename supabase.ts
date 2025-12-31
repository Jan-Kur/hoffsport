import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from '@supabase/supabase-js';
import Constants from "expo-constants";
import 'react-native-url-polyfill/auto';
import { Database } from "./database.types";

const {supabaseUrl, supabaseKey} = Constants.expoConfig.extra

export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  }
})