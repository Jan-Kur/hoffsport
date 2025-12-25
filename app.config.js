export default ({ config }) => {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_KEY

  return {
    ...config,
    expo: {
      ...config.expo,
      name: "hoffsport",
      slug: "hoffsport",
      version: "1.0.0",
      orientation: "portrait",
      scheme: "hoffsport",
      userInterfaceStyle: "automatic",
      newArchEnabled: true,
      ios: {
        supportsTablet: true
      },
      android: {
        package: "com.xjaku.hoffsport",
        edgeToEdgeEnabled: true,
        predictiveBackGestureEnabled: false
      },
      web: {
        output: "static",
        bundler: "metro",
      },
      plugins: [
        "expo-font",
        "expo-web-browser",
        "expo-router",
      ],
      experiments: {
        typedRoutes: true,
        reactCompiler: true
      },
      extra: {
        supabaseUrl,
        supabaseKey,
        eas: {
          projectId: "5c8dfdad-8df0-4a09-9300-93e579ea5cb8"
        }
      }
    }
  }
}

