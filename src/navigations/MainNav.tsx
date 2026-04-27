import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Text, View, StyleSheet } from 'react-native';

import Home from '../screens/HomeScreen';
import Shop from '../screens/ShopScreen';
import Cart from '../screens/CartScreen';
import Profile from '../screens/ProfileScreen';
import { ROUTES } from '../utils';

export type MainStackParamList = {
  [ROUTES.HOME]: undefined;
  [ROUTES.SHOP]: undefined;
  [ROUTES.CART]: undefined;
  [ROUTES.PROFILE]: undefined;
};

export type MainNavigationProp = BottomTabNavigationProp<MainStackParamList>;

const Tab = createBottomTabNavigator<MainStackParamList>();

const DEEP     = '#2E073F';
const VIOLET   = '#A976D1';
const LAVENDER = '#F0E8F7';
const MUTED    = '#9B7BAE';
const BORDER   = '#E0CCE9';

const TAB_ICONS: Record<string, { active: string; inactive: string }> = {
  [ROUTES.HOME]:    { active: '⌂',  inactive: '⌂'  },
  [ROUTES.SHOP]:    { active: '✦',  inactive: '✦'  },
  [ROUTES.CART]:    { active: '◻',  inactive: '◻'  },
  [ROUTES.PROFILE]: { active: '◈',  inactive: '◈'  },
};

interface TabIconProps {
  name: string;
  focused: boolean;
}

const TabIcon = ({ name, focused }: TabIconProps) => {
  const icon = TAB_ICONS[name];
  return (
    <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
      <Text style={[styles.icon, focused && styles.iconActive]}>
        {focused ? icon.active : icon.inactive}
      </Text>
    </View>
  );
};

const MainNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => (
          <TabIcon name={route.name} focused={focused} />
        ),
        tabBarActiveTintColor: DEEP,
        tabBarInactiveTintColor: MUTED,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: BORDER,
          height: 72,
          paddingBottom: 10,
          paddingTop: 8,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name={ROUTES.HOME} 
        component={Home}
        options={{ title: 'Home' }}
      />
      <Tab.Screen 
        name={ROUTES.SHOP} 
        component={Shop}
        options={{ title: 'Shop' }}
      />
      <Tab.Screen 
        name={ROUTES.CART} 
        component={Cart}
        options={{ title: 'Cart' }}
      />
      <Tab.Screen 
        name={ROUTES.PROFILE} 
        component={Profile}
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  iconWrapActive: {
    backgroundColor: LAVENDER,
  },
  icon: {
    fontSize: 18,
    color: MUTED,
  },
  iconActive: {
    color: DEEP,
  },
});

export default MainNavigation;
