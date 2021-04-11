import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import TextCmp from '../../../components/TextCmp';

const ListItem = ({data, title}) => {
  if (!data || data.length == 0) return null;
  return (
    <View>
      <TextCmp style={styles.header} fontSize={16} bold>
        {title}
      </TextCmp>

      <ScrollView horizontal contentContainerStyle={styles.scroll}>
        {data?.map((e, index) => {
          return (
            <View key={index} style={styles.item}>
              <Image
                style={styles.avatar}
                source={{
                  uri: e?.avatarUrl?.url,
                }}
              />
              <TextCmp style={styles.text}>{e.displayName || e.name}</TextCmp>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 1000,
    backgroundColor: 'gray',
  },
  header: {
    padding: 10,
  },
  item: {
    marginRight: 10,
    width: 120,
  },
  scroll: {
    paddingHorizontal: 10,
  },
  text: {
    marginTop: 5,
    textAlign: 'center',
  },
});
