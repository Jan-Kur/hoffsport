import * as QueryParams from "expo-auth-session/build/QueryParams"
import * as Linking from "expo-linking"
import { useRouter } from "expo-router"
import { useEffect } from "react"
import { supabase } from "../../supabase"

export default function AuthCallback() {
  const router = useRouter()
  const url = Linking.useLinkingURL()

  useEffect(() => {
    const run = async () => {
      if (!url) return
      
      const { params, errorCode } = QueryParams.getQueryParams(url)
      if (errorCode) return
      
      const { access_token, refresh_token } = params
      if (!access_token || !refresh_token) return
      
      await supabase.auth.setSession({
        access_token,
        refresh_token,
      })
      
      router.replace("/")
    }
    run()
  }, [])

  return null
}
