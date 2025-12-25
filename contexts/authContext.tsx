import { AuthError, User } from "@supabase/supabase-js";
import { makeRedirectUri } from 'expo-auth-session';
import * as QueryParams from "expo-auth-session/build/QueryParams";
import { createContext, useEffect, useState } from "react";
import { supabase } from "../supabase";

type AuthContextType = {
  user: User | null
  loading: boolean
  createSessionFromUrl: (url: string) => Promise<any | AuthError | null>
  sendMagicLink: (email: string) => Promise<{error: AuthError | null}>
  signOut: () => Promise<{ error: AuthError }>
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  createSessionFromUrl: async (_url: string) => ({ error: null}),
  sendMagicLink: async (_email: string) => ({ error: null}),
  signOut: async () => ({error: null}),
})

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(response => {
      setUser(response.data.session?.user ?? null)
      setLoading(false)
    })

    const {data: {subscription}} = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const createSessionFromUrl = async (url: string) => {
    const { params, errorCode } = QueryParams.getQueryParams(url);

    if (errorCode) throw new Error(errorCode);
    const { access_token, refresh_token } = params;

    if (!access_token) return;
    const { data, error } = await supabase.auth.setSession({
      access_token,
      refresh_token,
    });

    if (error) throw error;
    return data.session;
  };

  const sendMagicLink = async (email: string) => {
    const redirectTo = makeRedirectUri()

    const { error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: redirectTo,
      },
    })

    return { error }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()

    return { error }
  }

  return (
    <AuthContext.Provider value={{user, loading, createSessionFromUrl, sendMagicLink, signOut}}>
      {children}
    </AuthContext.Provider>
  )
}