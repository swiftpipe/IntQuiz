import React from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';
import {useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import TextCmp from '../../../components/TextCmp';

const SearchBar = ({listCategories, onFilter, filter}) => {
  const [isShowFilter, setShowFilter] = useState(false);
  const onPressOnFilter = () => {
    setShowFilter(true);
  };
  const onClose = () => {
    setShowFilter(false);
  };
  const onDone = category => {
    setShowFilter(false);
    onFilter && onFilter({category});
  };
  const onChangeText = text => {
    onFilter && onFilter({text});
  };
  const onClear = () => {
    setShowFilter(false);
    onFilter && onFilter({text: '', category: null});
  };
  const insets = useSafeAreaInsets();
  return (
    <>
      <View style={styles.container}>
        <Icon name="search1" size={18} />
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          placeholder="Tìm kiếm"
        />
        <Pressable onPress={onPressOnFilter} style={styles.btnFilter}>
          <Icon name="filter" size={18} />
        </Pressable>
      </View>
      {isShowFilter && (
        <Modal
          isVisible={isShowFilter}
          style={[styles.modal]}
          onBackdropPress={onClose}>
          <View style={[styles.modalContent, {paddingBottom: insets.bottom}]}>
            <TextCmp fontSize={16} bold style={styles.header}>
              Category
            </TextCmp>
            <ScrollView>
              {listCategories?.map(e => {
                return (
                  <Pressable
                    key={e.sys.id}
                    style={styles.items}
                    onPress={() => onDone(e)}>
                    {e.sys.id == filter?.category?.sys.id && (
                      <>
                        <Icon name="check" size={18} color="blue" />
                        <TextCmp> </TextCmp>
                      </>
                    )}
                    <TextCmp fontSize={16} color={'blue'}>
                      {e.displayName}
                    </TextCmp>
                  </Pressable>
                );
              })}
            </ScrollView>
            <View style={styles.listButton}>
              <Pressable
                onPress={onClear}
                style={[
                  styles.buttonFilter,
                  {
                    backgroundColor: 'rgba(47, 54, 64,0.2)',
                    borderColor: 'rgba(47, 54, 64,1.0)',
                  },
                ]}>
                <TextCmp bold color={'rgba(47, 54, 64,1.0)'} fontSize={14}>
                  Clear
                </TextCmp>
              </Pressable>
              <Pressable onPress={onClose} style={[styles.buttonFilter]}>
                <TextCmp bold color={'rgba(232, 65, 24,1.0)'} fontSize={14}>
                  Close
                </TextCmp>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}
    </>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#dcdde1',
    borderRadius: 100,
    margin: 10,
  },
  input: {
    padding: 0,
    paddingLeft: 10,

    flex: 1,
  },
  btnFilter: {
    paddingLeft: 10,
  },
  modalContent: {
    backgroundColor: '#FFF',
    height: 500,
  },
  modal: {
    padding: 0,
    margin: 0,
    justifyContent: 'flex-end',
  },
  items: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  header: {
    textAlign: 'center',
    paddingTop: 20,
    paddingBottom: 10,
  },
  listButton: {
    flexDirection: 'row',
    marginHorizontal: 5,
  },
  buttonFilter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    padding: 14,
    marginHorizontal: 5,
    borderRadius: 8,
    backgroundColor: 'rgba(232, 65, 24,0.2)',
    borderColor: 'rgba(232, 65, 24,1.0)',
  },
});
