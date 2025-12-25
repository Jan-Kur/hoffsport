import { Redirect } from 'expo-router';
import { useContext } from 'react';
import { AuthContext } from '../contexts/authContext';

export default function Index() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return null; 
  }

  if (user) {
    return <Redirect href="/(tabs)/schedule" />;
  }

  return <Redirect href="/(auth)/signIn" />;
}