import React from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import TextCmp from '../../../components/TextCmp';
const {width, height} = Dimensions.get('screen');
import Icon from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import themes from '../../../constants/themes';
const Item = ({
  avatarUrl,
  categoriesCollection: {items},
  displayName,
  email,
  phone,
  onPress,
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
          <TextCmp bold fontSize={16}>
            {displayName}
          </TextCmp>
          <TextCmp style={styles.text} color={themes.colors.gray}>
            <Icon name="email" /> {email}
          </TextCmp>
          <TextCmp color={themes.colors.gray}>
            <Icon name="phone" /> {phone}
          </TextCmp>
        </View>
        <View style={styles.bodyCategory}>
          <TextCmp color={'#222'} semibold>
            Categories:
          </TextCmp>
          {items?.map((e, index) => {
            return (
              <TextCmp
                key={e.sys.id + '-' + index}
                color={'#222'}
                style={styles.textListItem}>
                <Entypo name="dot-single" size={15} /> {e.displayName}
              </TextCmp>
            );
          })}
        </View>
      </View>
    </Pressable>
  );
};

export default Item;

const styles = StyleSheet.create({
  avatar: {
    width: width / 3,
    height: width / 2.5,
    borderRadius: 8,
    backgroundColor: themes.colors.gray,
  },
  container: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#FFF',
  },
  body: {
    paddingHorizontal: 10,
  },
  text: {
    marginVertical: 5,
  },
  bodyCategory: {
    marginTop: 5,
  },
  textListItem: {
    marginTop: 5,
  },
});
