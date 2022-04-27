import React from 'react';
import {ActivityIndicator, View, Text, StyleSheet} from 'react-native';
import {Avatar} from '@rneui/themed';
//import {Rating} from 'react-native-elements';
import {Rating} from 'react-native-ratings';
import {Button} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

const DUMMY_URI = 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg';

export const Detailscreen = ({route, navigation}) => {
  let item;

  if (route.params) {
    item = route.params.item1;
  }

  // const { item='' } = route.params;
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{marginTop: 20, marginBottom: 10, alignSelf: 'center'}}>
        <Avatar size={300} source={{uri: item?.image || DUMMY_URI}} />
      </View>
      <View style={{marginHorizontal: 20}}>
        <Text style={{fontSize: 20, color: 'black', fontWeight: 'bold'}}>
          {item?.title || 'Title'}
        </Text>
        <View style={{flexDirection: 'row', marginVertical: 10}}>
          <Rating
            type="custom"
            readonly
            ratingColor="green"
            ratingBackgroundColor="#c8c7c8"
            imageSize={18}
            startingValue={item?.rating.rate}
            tintColor="#fff"
          />
          <Text style={{fontSize: 12}}> {item?.rating.count || 0} Ratings</Text>
        </View>
        <Text style={{fontSize: 20, color: 'black', fontWeight: 'bold'}}>
          {item?.price || 100}$
        </Text>
        <View style={styles.horizontalline} />
        <Text style={{fontWeight: 'bold', fontSize: 16, marginBottom: 8}}>
          Description
        </Text>
        <Text style={{fontSize: 14}}> {item?.description || 0}</Text>
        {/* <Text style={{ lineHeight: 24 }}>
          Street No: {item?.location.street.number}
          {'\n'}Street Name: {item?.location.street.name}
          {'\n'}City: {item?.location.city}
          {'\n'}State: {item?.location.state}
          {'\n'}Postcode: {item?.location.postcode}
          {'\n'}Timezone: {item?.location.timezone.offset}
        </Text> */}
      </View>
      <View style={styles.btmbtn}>
        <Button icon="cart-plus" mode="outlined"
          onPress={() => console.log('Pressed')}>
          add to cart
        </Button>
        <Button icon="check" mode="contained" onPress={() => console.log('Pressed')}>
          buy now
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  horizontalline: {
    backgroundColor: 'lightgrey',
    width: '90%',
    height: 1,
    marginVertical: 10,
  },
  btmbtn: {
    height: 60,
    width: '100%',
    position: 'absolute',
    justifyContent: 'space-around',
    alignItems:'center',
    bottom: 0,
    //backgroundColor: 'black',
    flexDirection: 'row',
  },
});

export default Detailscreen;
