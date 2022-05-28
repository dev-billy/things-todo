import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button, Overlay} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default () => {
  const [visible, setVisible] = useState(false);
  return (
    <View>
      <Button
        buttonStyle={styles.button}
        raised
        containerStyle={styles.button}
        onPress={() => setVisible(true)}
        icon={<Icon name="add" style={styles.iconStyles} />}
      />
      <Overlay
        height={100}
        isVisible={visible}
        overlayStyle={styles.modalStyle}
        onBackdropPress={() => setVisible(false)}>
        <Text>Add List Form here!</Text>
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    backgroundColor: '#EE6C4D',
  },
  iconStyles: {
    color: '#fff',
    fontSize: 24,
  },
  modalStyle: {
    height: '80%',
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
