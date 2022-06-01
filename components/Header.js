import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HeaderComponent = ({
  title,
  iconName,
  showIcon,
  goBack,
  endMenu,
  isConnected,
}) => {
  return (
    <>
      <Header
        centerComponent={
          <Title title={title} iconName={iconName} showIcon={showIcon} />
        }
        barStyle="light-content"
        statusBarProps={{backgroundColor: '#2B2D42'}}
        containerStyle={styles.headerContainerStyle}
        leftComponent={
          goBack !== undefined ? (
            <Icon name="chevron-left" size={25} color="#fff" onPress={goBack} />
          ) : null
        }
        rightComponent={
          endMenu !== undefined && isConnected ? (
            <Icon name="delete" size={25} color="#fff" onPress={endMenu} />
          ) : null
        }
      />
      {isConnected ? null : (
        <View style={styles.offlineStatusBar}>
          <Text style={styles.statusBarText}>Oops, Lost Connection</Text>
        </View>
      )}
    </>
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
  statusBarText: {
    color: '#1e1e1e',
    fontSize: 13,
    textAlign: 'center',
  },
  offlineStatusBar: {
    paddingVertical: 5,
    backgroundColor: 'rgba(239, 35, 60, 0.65)',
  },
});

export default HeaderComponent;
