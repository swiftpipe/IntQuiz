import NetInfo, {useNetInfo} from '@react-native-community/netinfo';
import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import TextCmp from '../../components/TextCmp';
import {getSession, removeUtf8, saveSession} from '../../utils/utils';
import Item from './components/Item';
import ListAdvisorsHorz from './components/ListAdvisorsHorz';
import SearchBar from './components/SearchBar';
import {useNavigation} from '@react-navigation/native';
import AppName from '../../constants/AppName';
import {useRef} from 'react';

const MainScreen = () => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [dataProvider, setDataProvider] = useState([]);
  const [category, setCategory] = useState([]);
  const [isSearch, setSearch] = useState(false);
  const [filter, setFilter] = useState({});
  const navigation = useNavigation();
  const isOnline = useRef(true);
  const renderItem = ({item}) => (
    <Item onPress={() => onPressItem(item)} {...item} />
  );
  const ItemSeparatorComponent = () => <View style={styles.separator} />;
  const keyExtractor = item => item.sys.id.toString();
  const netInfo = useNetInfo();

  const onPressItem = item => {
    navigation.navigate(AppName.DetailScreen, {data: item});
  };

  const ListHeaderComponent = () => {
    if (isSearch) return null;
    return <ListAdvisorsHorz data={data} onPressItem={onPressItem} />;
  };
  const ListEmptyComponent = () => {
    if (data.length == 0 && isSearch) {
      return (
        <View style={styles.notfound}>
          <TextCmp bold fontSize={16} color="gray">
            Không có kết quả
          </TextCmp>
        </View>
      );
    }

    return null;
  };
  const fetchData = async () => {
    setLoading(true);

    try {
      const internet = await NetInfo.fetch();
      if (!internet.isConnected) {
        const backupdate = await getSession();
        
        setDataProvider(backupdate || []);
        return;
      }
      const res = await fetch(
        'https://raw.githubusercontent.com/Unitz-Co/int-quiz/main/data.json',
      );
      const resJson = await res.json();

      setDataProvider(resJson.data?.advisorProfileCollection?.items || []);
      await saveSession(resJson.data?.advisorProfileCollection?.items || []);
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setData(dataProvider);
    const listCategories = dataProvider
      .map(item => item.categoriesCollection.items)
      .flat()
      .reduce((list, ele) => {
        const isExist = list.find(x => x.sys.id == ele.sys.id);
        if (!isExist) {
          list.push(ele);
        }
        return list;
      }, []);
    setCategory(listCategories);
  }, [dataProvider]);

  useEffect(() => {
    fetchData();
    const unsubscribe = NetInfo.addEventListener(state => {
      if (!isOnline.current && state.isConnected) {
        fetchData();
      }
      isOnline.current = state.isConnected;
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const onFilter = ({text, category}) => {
    if (!text) text = '';
    setFilter({text, category});
    if (text?.length > 0 || category) {
      setSearch(true);
      if (text?.length > 0 && category) {
        setData(
          dataProvider.filter(
            x =>
              removeUtf8(x.displayName.toLowerCase()).indexOf(
                removeUtf8(text.toLowerCase()),
              ) >= 0 &&
              x.categoriesCollection.items.find(
                x => x.sys.id == category.sys.id,
              ),
          ),
        );
      } else if (text?.length > 0) {
        setData(
          dataProvider.filter(
            x =>
              removeUtf8(x.displayName.toLowerCase()).indexOf(
                removeUtf8(text.toLowerCase()),
              ) >= 0,
          ),
        );
      } else if (category) {
        setData(
          dataProvider.filter(x =>
            x.categoriesCollection.items.find(x => x.sys.id == category.sys.id),
          ),
        );
      }
    } else {
      setSearch(false);
      setData(dataProvider);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.networkStatus}>
        <TextCmp>{netInfo.isConnected ? 'Online' : 'Offline'}</TextCmp>
        {isLoading && (
          <View style={styles.loading}>
            <ActivityIndicator />
            <TextCmp> Loading data</TextCmp>
          </View>
        )}
      </View>
      <SearchBar
        listCategories={category}
        onFilter={onFilter}
        filter={filter}
      />
      <View style={styles.container}>
        <FlatList
          ItemSeparatorComponent={ItemSeparatorComponent}
          data={data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ListHeaderComponent={ListHeaderComponent()}
          ListEmptyComponent={ListEmptyComponent}
        />
      </View>
    </SafeAreaView>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#F2F3F5',
  },
  notfound: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
  },
  networkStatus: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    flexDirection: 'row',
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    flexDirection: 'row',
  },
});
