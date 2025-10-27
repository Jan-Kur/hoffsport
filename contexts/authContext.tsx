import { User } from "@supabase/supabase-js";
import { createContext, useEffect, useState } from "react";
import { supabase } from "../supabase";

type AuthContextType = {
  user: User | null
  loading: boolean
  signUp: (email: string, password: string) => Promise<{data: object, error: any}>
  signInWithEmail: (email: string, password: string) => Promise<{ error: any }>
  signOut: () => Promise<{ error: any }>
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  signUp: async () => ({data: null, error: null}),
  signInWithEmail: async () => ({error: null}),
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

  const signUp = async (email: string, password: string) => {
    let { data, error } = await supabase.auth.signUp({email, password})

    if (!error && data.user) {
      const {error: profileError} = await supabase
      .from('profiles')
      .insert({ id: data.user.id, email: email})

      if (profileError) {
        return { data, error: profileError }
      }
    }
    
    return { data, error }
  }

  const signInWithEmail = async (email: string, password: string) => {
    let { data, error } = await supabase.auth.signInWithPassword({email, password})

    return { error }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()

    return { error }
  }

  return (
    <AuthContext.Provider value={{user, loading, signUp, signInWithEmail, signOut}}>
      {children}
    </AuthContext.Provider>
  )
}