import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, StyleSheet } from 'react-native';

import Home from '../screens/HomeScreen';
import Shop from '../screens/ShopScreen';
import Cart from '../screens/CartScreen';
import Profile from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const DEEP     = '#2E073F';
const VIOLET   = '#A976D1';
const LAVENDER = '#F0E8F7';
const MUTED    = '#9B7BAE';
const BORDER   = '#E0CCE9';

const TAB_ICONS = {
  Home:    { active: '⌂',  inactive: '⌂'  },
  Shop:    { active: '✦',  inactive: '✦'  },
  Cart:    { active: '◻',  inactive: '◻'  },
  Profile: { active: '◈',  inactive: '◈'  },
};

const TabIcon = ({ name, focused }) => {
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
          shadowColor: DEEP,
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.06,
          shadowRadius: 12,
          elevation: 12,
        },
        tabBarLabelStyle: {
          fontFamily: 'Roboto',
          fontSize: 10,
          fontWeight: '700',
          letterSpacing: 0.8,
          textTransform: 'uppercase',
          marginTop: 2,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home"    component={Home} />
      <Tab.Screen name="Shop"    component={Shop} />
      <Tab.Screen name="Cart"    component={Cart} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapActive: {
    backgroundColor: LAVENDER,
    borderWidth: 1,
    borderColor: BORDER,
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