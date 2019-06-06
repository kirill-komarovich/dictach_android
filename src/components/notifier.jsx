import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { StyleSheet, Text } from 'react-native';
import { Banner, Title, Paragraph } from 'react-native-paper';
import { closeBanner } from '@src/actions/NotificationsActions';

const Notifier = ({ notifications, actions: { closeBanner } }) => {
  const visible = notifications.length > 0;

  return (
    <Banner
      style={styles.banner}
      visible={visible}
      actions={[
        {
          label: 'Hide',
          onPress: closeBanner,
          color: 'white',
        }
      ]}
    >
      <Text style={styles.container} numberOfLines={notifications.length + 1}>
        <Text
          style={[styles.text, styles.title]}
          textBreakStrategy="simple"
        >
          Some errors have occured:{"\n"}
        </Text>
        {
          notifications.map((notification, index) => (
            <Text style={styles.text} key={index}>{index + 1}. {notification}{"\n"}</Text>
          ))
        }
      </Text>
    </Banner>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: 'red',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  title: {
    flex: 1,
    fontSize: 16,
  },
  text: {
    flex: 0,
    color: 'white',
  },
});

Notifier.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.string),
  actions: PropTypes.shape({
    closeBanner: PropTypes.func.isRequired,
  }),
};

function mapStateToProps({ notifications }) {
  return { notifications };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ closeBanner }, dispatch),
  };
}

export default connect( mapStateToProps, mapDispatchToProps)(Notifier);
