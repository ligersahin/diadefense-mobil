import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '../../src/config/theme';

const TAB_BAR_BASE = {
  backgroundColor: Theme.surface,
  borderTopWidth: 1,
  borderTopColor: Theme.border,
  elevation: 0,
  shadowOpacity: 0,
  height: 54,
  paddingTop: 2,
  paddingBottom: 2,
  paddingLeft: 7,
  paddingRight: 7,
};

export default function TabLayout() {
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={({ route }) => {
        const hidden = (route?.params as { tabHidden?: string } | undefined)?.tabHidden === '1';
        return {
          tabBarActiveTintColor: Theme.primary,
          tabBarInactiveTintColor: "#94A3B8",
          tabBarStyle: hidden
            ? { ...TAB_BAR_BASE, height: 0, paddingBottom: 0, opacity: 0, transform: [{ translateY: 80 }], overflow: 'hidden' as const }
            : { ...TAB_BAR_BASE },
        tabBarLabelStyle: {
          fontSize: 9,
          fontWeight: '600',
          marginTop: -2
        },
        tabBarIconStyle: {
          marginTop: -2
        },
        tabBarItemStyle: {
          paddingHorizontal: 2,
          paddingTop: 2,
          paddingBottom: 1,
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        },
        headerStyle: {
          backgroundColor: Theme.primary
        },
        headerTintColor: Theme.surface,
        headerTitleStyle: {
          fontWeight: 'bold'
        },
        headerShown: false
        };
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Bugün',
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={21} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="program"
        options={{
          title: 'Program',
          tabBarIcon: ({ color }) => (
            <Ionicons name="clipboard-outline" size={21} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="defense"
        options={{
          title: 'Savunma',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="shield-checkmark-outline" size={21} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="tracking"
        options={{
          title: 'Verilerim',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="pulse-outline" size={21} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="info"
        options={{
          title: 'Eğitim',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="book-outline" size={21} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="menus"
        options={{ href: null }}
      />
      <Tabs.Screen
        name="supplements"
        options={{ href: null }}
      />
      <Tabs.Screen
        name="smartplate"
        options={{ href: null }}
      />
      <Tabs.Screen
        name="shopping"
        options={{ href: null }}
      />
      <Tabs.Screen
        name="water"
        options={{ href: null }}
      />
      <Tabs.Screen
        name="settings"
        options={{ href: null }}
      />
      <Tabs.Screen
        name="recipes"
        options={{ href: null }}
      />
    </Tabs>
  );
}
