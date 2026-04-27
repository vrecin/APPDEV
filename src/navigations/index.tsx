import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { useEffect } from 'react';
import { Platform, StatusBar, useColorScheme } from 'react-native';
import { useSelector } from 'react-redux';

import AuthNav from './AuthNav';
import MainNav from './MainNav';

interface RootState {
  auth: {
    data: { token?: string } | null;
  };
}

const RootNavigation = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const { data } = useSelector((state: RootState) => state.auth);
  const isLoggedIn = !!(data?.token);

  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('#fff5f9', true);
    }
    StatusBar.setBarStyle('dark-content', true);
  }, [isDarkMode]);

  console.log('[Navigation] auth.data:', data ? { hasToken: !!data.token } : null, '| isLoggedIn:', isLoggedIn);

  return (
    <NavigationContainer>
      {isLoggedIn ? <MainNav /> : <AuthNav />}
    </NavigationContainer>
  );
};

export default RootNavigation;
