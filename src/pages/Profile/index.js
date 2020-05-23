import React from 'react';
import { useNavigation } from '@react-navigation/native';
import TabIcon from '~/components/TabIcon';
import Background from '~/components/Background';
// import { Container } from './styles';

const Profile = () => {
  const navigation = useNavigation();
  navigation.setOptions({
    tabBarLabel: 'Meu perfil',
    tabBarIcon: (props) => <TabIcon {...props} iconName="person" />,
  });
  return <Background />;
};

export default Profile;
