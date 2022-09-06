import { Text, Image, Pressable, View, StyleSheet, FlatList } from 'react-native';
import { Auth } from 'aws-amplify';
import ChatRoomItem from '../components/ChatRoomItem/ChatRoomItem';
import ChatRoomsData from '../assets/dummy-data/ChatRooms';

export default function TabOneScreen() {

  const logOut = () => {
    Auth.signOut();
  }

  return (
    <View style={styles.page}>
    <FlatList 
     data={ChatRoomsData}
     renderItem={({ item }) => <ChatRoomItem chatRoom={item} />}
     showsVerticalScrollIndicator={false}
   />

   <Pressable onPress={logOut} style={{backgroundColor: '#3777f0', height: 50, margin: 10, borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{fontWeight: 'bold', color:'white'}}>Logout</Text>
      </Pressable>
 </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    flex:1,
  }
});
