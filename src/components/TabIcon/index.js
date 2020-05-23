import React from 'react';
import PropTypes from 'prop-types';
import Icons from 'react-native-vector-icons/MaterialIcons';

const TabIcon = ({ color, iconName }) => {
  return <Icons name={iconName} size={20} color={color} />;
};

TabIcon.propTypes = {
  iconName: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default TabIcon;
