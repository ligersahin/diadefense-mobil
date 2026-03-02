import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '../../src/config/theme';

export default function TabLayout() {
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        tabBarActiveTintColor: Theme.primary,
        tabBarInactiveTintColor: "#94A3B8",
        tabBarStyle: {
          backgroundColor: Theme.surface,
          borderTopWidth: 1,
          borderTopColor: Theme.border,
          height: 92,
          paddingTop: 12,
          paddingBottom: 20,
          elevation: 0,
          shadowOpacity: 0
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600'
        },
        tabBarItemStyle: {
          paddingHorizontal: 4,
          flex: 1
        },
        headerStyle: {
          backgroundColor: Theme.primary
        },
        headerTintColor: Theme.surface,
        headerTitleStyle: {
          fontWeight: 'bold'
        },
        headerShown: false
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Bugün',
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={24} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="program"
        options={{
          title: 'Program',
          tabBarIcon: ({ color }) => (
            <Ionicons name="clipboard-outline" size={24} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="defense"
        options={{
          title: 'Savunma',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="shield-checkmark-outline" size={24} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="tracking"
        options={{
          title: 'Verilerim',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="pulse-outline" size={24} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="info"
        options={{
          title: 'Eğitim',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="book-outline" size={24} color={color} />
          )
        }}
      />
    </Tabs>
  );
}
