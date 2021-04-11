import React from 'react';
import {Dimensions, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import TextCmp from '../../../components/TextCmp';
const {width, height} = Dimensions.get('screen');
import Icon from 'react-native-vector-icons/Fontisto';
import themes from '../../../constants/themes';
const ItemHorizontal = ({
  avatarUrl,
  displayName,
  email,
  phone,
  onPress
}) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Image
        style={styles.avatar}
        source={{
          uri: avatarUrl?.url,
        }}
      />
      <View style={styles.body}>
        <View style={styles.bodyText}>
          <TextCmp bold style={styles.text} fontSize={16}>
            {displayName}
          </TextCmp>
          <TextCmp style={styles.text} color={themes.colors.gray}>
            <Icon name="email" /> {email}
          </TextCmp>
          <TextCmp style={styles.text} color={themes.colors.gray}>
            <Icon name="phone" /> {phone}
          </TextCmp>
        </View>
      </View>
    </Pressable>
  );
};

export default ItemHorizontal;

const styles = StyleSheet.create({
  avatar: {
    width: width / 1.7,
    height: 300,
    borderRadius: 8,
    backgroundColor: themes.colors.gray,
  },
  container: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  body: {
    paddingHorizontal: 10,
    position: 'absolute',
    bottom: 0.1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 10,
    width: '100%',
  },
  text: {
    marginVertical: 5,
    color: '#FFF',
  },
});
