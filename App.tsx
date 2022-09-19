import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import Amplify, { DataStore, Hub } from 'aws-amplify';
// @ts-ignore
import { withAuthenticator } from 'aws-amplify-react-native';
import config from './src/aws-exports';
import { Message } from "./src/models";
import { useEffect } from 'react';

Amplify.configure(config);

function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  useEffect(() => {
    // Create listener
    console.log("registeriong listener");
    const listener = Hub.listen("datastore", async (hubData) => {
      const { event, data } = hubData.payload;
      if (event === "outboxMutationProcessed" 
          && data.model === Message 
          && !(["DELIVERED", "READ"].includes(data.element.status))) {
        // set the message status to delivered
        DataStore.save(
          Message.copyOf(data.element, (updated) => {
            updated.status = "DELIVERED";
          })
        );
      }
    });

    // Remove listener
    return () => listener();
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

export default withAuthenticator(App);
