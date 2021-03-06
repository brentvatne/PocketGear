/* @flow */

import React, { PropTypes, Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AppbarShell from './AppbarShell';

const styles = StyleSheet.create({
  icon: {
    color: '#222',
  },

  button: {
    height: AppbarShell.HEIGHT,
    width: AppbarShell.HEIGHT - 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    color: '#222',
    fontFamily: 'Montserrat',
    fontSize: Platform.OS === 'ios' ? 16 : 18,
  },

  content: {
    flex: 1,
    alignItems: Platform.OS === 'ios' ? 'center' : 'flex-start',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
});

type Props = {
  style?: any;
  children?: any;
  onNavigate: Function;
}

export default class Appbar extends Component<void, Props, void> {

  static propTypes = {
    onNavigate: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    style: View.propTypes.style,
  };

  _handleGoBack = () => {
    this.props.onNavigate({ type: 'pop' });
  };

  render() {
    return (
      <AppbarShell {...this.props}>
        <TouchableOpacity style={styles.button} onPress={this._handleGoBack}>
          {Platform.OS === 'ios' ?
            <EvilIcons
              name='chevron-left'
              size={36}
              style={styles.icon}
            /> :
            <MaterialIcons
              name='arrow-back'
              size={24}
              style={styles.icon}
            />
          }
        </TouchableOpacity>
        <View style={styles.content}>
          {typeof this.props.children === 'string' ?
            <Text numberOfLines={1} style={styles.title}>
              {this.props.children}
            </Text> :
            this.props.children
          }
        </View>
        <View style={styles.button} />
      </AppbarShell>
    );
  }
}
