import React, {useEffect, useState, useCallback, useRef} from 'react';
import {
  ActivityIndicator,
  FlatList,
  View,
  StatusBar,
  StyleSheet,
  Image,
  TouchableHighlight,
  RefreshControl,
  Text,
} from 'react-native';
import {ListItem, Divider} from 'react-native-elements';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Avatar} from '@rneui/themed';
import {
  FAB,
  Button,
  Paragraph,
  Dialog,
  Portal,
  Provider,
  Searchbar,
  RadioButton,
} from 'react-native-paper';
//import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DropDownPicker from 'react-native-dropdown-picker';
import CommonActivityIndicator from './src/components/CommonActivityIndicator';
import Detailscreen from './src/screens/Detailscreen';
import {CollapsibleScrollView} from '@johankladder/react-native-collapsible-header-components';
import axios from 'axios';
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomSheet from 'react-native-gesture-bottom-sheet';

const DUMMY_URI = 'https://randomuser.me/api/portraits/med/men/75.jpg';
function Home({navigation}) {
  const bottomSheet = useRef();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [checked, setChecked] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  // const renderFooter = () => {
  //   if (isLoading) return null;
  //   return <ActivityIndicator size="large" color="#0000ff" />;
  // };

  useEffect(() => {
    getData();
  }, [checked]);

  const getData = async () => {
    try {
      axios
        .get('https://fakestoreapi.com/products/' + checked)
        .then(res => {
          const allProducts = res.data;
          setData(allProducts);
        })
        .catch(async error => {
          {
            const allProductsDB = await AsyncStorage.getItem('products');
            console.log('HI', allProductsDB);
            setData(JSON.parse(allProductsDB));
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <CollapsibleScrollView
        //ref={ref => this.CollapisbleScrollView = ref}
        collapsibleHeader={
          <View>
            <View style={styles.navBar}>
              <Ionicons
                style={{marginLeft: 10}}
                name="menu-outline"
                size={30}
              />
              <Text style={{marginLeft: 10, fontSize: 18, textAlign: 'left'}}>
                APP NAME
              </Text>
              <View style={styles.rightContainer}>
                <Ionicons style={{marginRight: 10}} name="search" size={20} />
                <Ionicons
                  style={{marginRight: 10}}
                  name="notifications"
                  size={20}
                />
                <Ionicons style={{marginRight: 10}} name="cart" size={20} />
              </View>
            </View>
            <View style={styles.navBar1}>
              <Button
                icon="sort"
                mode="Text"
                onPress={() => console.log('Pressed')}>
                Sort
              </Button>
              <Button
                icon="filter"
                mode="Text"
                onPress={() => bottomSheet.current.show()}>
                filter
              </Button>
              {/* <Searchbar
                style={{
                  backgroundColor: '#f8f8ff',
                  elevation: 0,
                  height: '80%',
                  width: '98%',
                }}
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
              /> */}
            </View>
          </View>
        }
        collapsibleHeaderHeight={100}
        statusBarHeight={40}>
        <View style={{flex: 1}}>
          {refreshing ? (
            <CommonActivityIndicator />
          ) : (
            <FlatList
              style={{}}
              data={data}
              //ListFooterComponent={renderFooter}
              renderItem={({item}) => (
                <ListItem
                  Component={TouchableHighlight}
                  containerStyle={{}}
                  disabledStyle={{opacity: 0.5}}
                  //onLongPress={() => console.log("onLongPress()")}
                  onPress={() => navigation.navigate('Details', {item1: item})}
                  pad={20}
                  bottomDivider>
                  <Avatar source={{uri: item?.image}} size={100} />
                  <ListItem.Content>
                    <ListItem.Title>
                      <Text style={{}}>{item?.title}</Text>
                    </ListItem.Title>
                    <ListItem.Subtitle>
                      <View style={{flexDirection: 'row', marginVertical: 10}}>
                      <Rating
                        type="custom"
                        readonly
                        ratingColor="green"
                        ratingBackgroundColor="#c8c7c8"
                        imageSize={14}
                        startingValue={item.rating.rate}
                        tintColor="#fff"
                      />
                      <Text style={{fontSize: 10}}> ({item.rating.count})</Text></View>
                      {'\n'}
                      <Text style={{color: 'black'}}>{item.price}$</Text>
                      {'\n'}
                      <View
                        style={{
                          borderRadius: 2,
                          backgroundColor: '#f8f8ff',
                          padding: 4,
                        }}>
                        <Text style={{fontSize: 10}}>{item.category}</Text>
                      </View>
                    </ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              )}
            />
          )}
        </View>
      </CollapsibleScrollView>
      <BottomSheet hasDraggableIcon ref={bottomSheet} height={270}>
        <View style={{marginHorizontal: 20, marginTop: 10}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 22,
              color: 'black',
              marginBottom: 5,
            }}>
            Categories
          </Text>
          <RadioButton.Group
            onValueChange={checked => setChecked(checked)}
            value={checked}>
            <RadioButton.Item
              label="Electronics"
              value="category/electronics"
            />
            <RadioButton.Item label="Jewelery" value="category/jewelery" />
            <RadioButton.Item
              label="Men's clothing"
              value="category/men's clothing"
            />
            <RadioButton.Item
              label="Women's clothing"
              value="category/Women's clothing"
            />
          </RadioButton.Group>
        </View>
      </BottomSheet>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Details" component={Detailscreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 0,
    margin: 16,
  },
  navBar: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  navBar1: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  rightIcon: {
    height: 10,
    width: 10,
    resizeMode: 'contain',
    backgroundColor: 'white',
  },
});

export default App;
