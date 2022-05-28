import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HeaderComponent = ({title, iconName, showIcon}) => {
  return (
    <Header
      centerComponent={
        <Title title={title} iconName={iconName} showIcon={showIcon} />
      }
      barStyle="light-content"
      statusBarProps={{backgroundColor: '#2B2D42'}}
      containerStyle={styles.headerContainerStyle}
    />
  );
};

const Title = ({title, iconName, showIcon}) => (
  <View style={styles.headerCenterComponentStyle}>
    {showIcon ? <Icon name={iconName} style={styles.iconStyle} /> : null}
    <Text style={styles.title}>{title}</Text>
  </View>
);

HeaderComponent.defaultProps = {
  title: 'Things Todo',
  iconName: 'rule',
  showIcon: true,
};

const styles = StyleSheet.create({
  headerContainerStyle: {
    backgroundColor: '#2B2D42',
    paddingTop: 10,
  },
  headerCenterComponentStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    fontSize: 32,
    color: '#EE6C4D',
    marginEnd: 15,
  },
  title: {
    color: '#fff',
    fontSize: 19,
    fontWeight: 'bold',
  },
});

export default HeaderComponent;
