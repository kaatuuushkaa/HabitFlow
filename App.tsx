import React, { useEffect } from 'react';
import { AppNavigator } from './src/navigation/AppNavigator';
import { configureNotifications } from './src/services/notifications';

export default function App() {
  useEffect(() => {
    configureNotifications().catch(console.error);
  }, []);

  return <AppNavigator />;
}