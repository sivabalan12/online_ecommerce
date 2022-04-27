import React from 'react';
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import { Avatar } from '@rneui/themed';
import { Rating } from 'react-native-elements';

const DUMMY_URI = 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg';

export const Detailscreen = ({ route, navigation }) => {
  let item;

  if (route.params) {
    item = route.params.item1;
  }

  // const { item='' } = route.params;
  return (
    <View style={{ flex: 1, backgroundColor:'white' }}>
      <View style={{ marginTop: 20, marginBottom: 10, alignSelf: 'center' }}>
        <Avatar
          size={300}
          source={{ uri: item?.image || DUMMY_URI }}
        />
      </View>
      <View style={{ flexDirection: 'column', width: '100%', marginLeft: 20 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
          {item?.title || 'Title'}
          {'\n'}
        </Text>
        <Text style={{ lineHeight: 24 }}>
          Rating: {item?.rating.rate}
          {'\n'}Rating Count: {item?.rating.count}
          {'\n'}Price: {item?.price}$
        </Text>
        <View style={styles.horizontalline} />
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
          Address
          {'\n'}
        </Text>
        {/* <Text style={{ lineHeight: 24 }}>
          Street No: {item?.location.street.number}
          {'\n'}Street Name: {item?.location.street.name}
          {'\n'}City: {item?.location.city}
          {'\n'}State: {item?.location.state}
          {'\n'}Postcode: {item?.location.postcode}
          {'\n'}Timezone: {item?.location.timezone.offset}
        </Text> */}
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
});

export default Detailscreen;