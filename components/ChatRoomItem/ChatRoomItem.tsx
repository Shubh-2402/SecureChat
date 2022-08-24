import React from 'react';
import { Text, Image, View, StyleSheet } from 'react-native';
import styles from './styles';


export default function ChatRoomItem(){

  return (
    <View style={styles.container}>
      <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGAIJiEpYMyblBs_my8fj7hzKkFkstgoCPVQ&usqp=CAU'}} style={styles.image} />
      <View style={styles.badgeContainer}>
        <Text style={styles.badgeText}>4</Text>
      </View>
      <View style={styles.rightContainer}>
        <View style={styles.row}>
          <Text style={styles.name}>Modi</Text>
          <Text style={styles.text}>11.50</Text>
        </View>
        <Text numberOfLines={1} style={styles.text}>Mitron</Text>
      </View>
    </View>
  );
}

