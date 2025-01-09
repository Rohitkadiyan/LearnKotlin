import {Image, StyleSheet} from 'react-native';
import React, {FC} from 'react';

const UserAvtar: FC<{uri: string}> = ({uri}) => {
  return <Image source={{uri}} style={styles.avatar} />;
};
const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    // borderColor: 'white',
  },
});

export default UserAvtar;
