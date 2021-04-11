import React from 'react';
import {StyleSheet, FlatList, View, Image, Dimensions} from 'react-native';
import ItemHorizontal from './ItemHorizontal';
const {width, height} = Dimensions.get('screen');

const ListAdvisorsHorz = ({data, onPressItem}) => {
  const renderItem = ({item}) => <ItemHorizontal onPress={() => onPressItem(item)} {...item} />;
  const ItemSeparatorComponent = () => <View style={styles.separator} />;
  const keyExtractor = item => item.sys.id.toString();
  return (
    <View>
      <FlatList
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={ItemSeparatorComponent}
        data={data}
        horizontal
        snapToAlignment={'start'}
        snapToInterval={width / 1.7 + 10} // Adjust to your content width
        decelerationRate={'fast'}
        pagingEnabled
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </View>
  );
};

export default ListAdvisorsHorz;

const styles = StyleSheet.create({
  separator: {
    width: 10,
  },
  avatar: {
    width: width / 2,
    height: 300,
    borderRadius: 8,
  },
  list: {
    paddingHorizontal: 10,
  },
});
