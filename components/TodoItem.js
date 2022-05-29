import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {CheckBox} from 'react-native-elements';

export default ({item, handleDelete, showCheck, handleComplete}) => {
  const checked = item.completed;
  const checkedStyles = {
    text: {
      textDecorationLine: checked ? 'line-through' : 'none',
    },
  };
  return (
    <View style={styles.container}>
      <View style={styles.titleView}>
        {showCheck ? (
          <View>
            <CheckBox
              iconType="material"
              checkedIcon="check-box"
              uncheckedIcon="check-box-outline-blank"
              checked={checked}
              onPress={() => handleComplete({...item, completed: !checked})}
              size={18}
            />
          </View>
        ) : null}
        <Text style={{...styles.title, ...checkedStyles.text}}>
          {item.text}
        </Text>
      </View>
      <TouchableOpacity onPress={() => handleDelete(item.id)}>
        <Icon style={styles.iconStyle} name="delete-outline" size={20} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10,
    paddingVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 5,
  },
  titleView: {
    flexDirection: 'row',
    alignItems: 'center',
    flexBasis: '70%',
  },
  title: {
    fontSize: 16,
  },
  iconStyle: {
    marginRight: 5,
    color: '#D90429',
  },
});
