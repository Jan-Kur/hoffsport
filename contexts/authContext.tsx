import { AuthError, User } from "@supabase/supabase-js";
import { makeRedirectUri } from 'expo-auth-session';
import { createContext, useEffect, useState } from "react";
import { supabase } from "../supabase";

type AuthContextType = {
  user: User | null
  loading: boolean
  sendMagicLink: (email: string, name: string, grade: string) => Promise<{error: AuthError | null}>
  signOut: () => Promise<{ error: AuthError }>
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  sendMagicLink: async (_email: string, _name: string, _grade: string) => ({ error: null}),
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

  const sendMagicLink = async (email: string, name: string, grade: string) => {
    const redirectTo = makeRedirectUri({
      path: "(auth)/callback"
    })

    const { error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: redirectTo,
        data: {name, grade},
      },
    })

    return { error }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()

    return { error }
  }

  return (
    <AuthContext.Provider value={{user, loading, sendMagicLink, signOut}}>
      {children}
    </AuthContext.Provider>
  )
}