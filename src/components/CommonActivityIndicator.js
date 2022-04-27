import React from 'react';
import { ActivityIndicator } from 'react-native';
 const CommonActivityIndicator = () => {

  return (
    <ActivityIndicator size="large" color="#0000ff"
      style={{
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      }}
    />
  );
};

export default CommonActivityIndicator;