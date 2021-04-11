import {useNavigation, useRoute} from '@react-navigation/core';
import React from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Entypo from 'react-native-vector-icons/Entypo';
import themes from '../../constants/themes';
import TextCmp from '../../components/TextCmp';
import ListItem from './components/ListItem';
import Icon from 'react-native-vector-icons/Fontisto';

const {width, height} = Dimensions.get('screen');

const DetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const param = route.params;
  const data = param?.data || {};
  const {
    avatarUrl,
    categoriesCollection,
    skillsCollection,
    servicesCollection,
    displayName,
    email,
    phone,
  } = data;
  const onBack = () => {
    navigation.goBack()
  } 
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.view}>
        <Pressable style={styles.header} onPress={onBack}>
          <Entypo name="chevron-thin-left" size={20} />
        </Pressable>

        <ScrollView style={styles.wrapper}>
          <View style={styles.container}>
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
            </View>
          </View>
          <ListItem title="Categories" data={categoriesCollection.items} />
          <ListItem title="Skills" data={skillsCollection.items} />
          <ListItem title="Services" data={servicesCollection.items} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default DetailScreen;

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
  wrapper: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  view: {
    backgroundColor: '#FFF',
    flex: 1,
  },
  header: {
    padding: 12,
  },
});
