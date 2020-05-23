import React from 'react';
import { useNavigation } from '@react-navigation/native';
import TabIcon from '~/components/TabIcon';
import Background from '~/components/Background';
// import { Container } from './styles';

const Dashboard = () => {
  const navigation = useNavigation();
  navigation.setOptions({
    tabBarLabel: 'Agendamentos',
    tabBarIcon: (props) => <TabIcon {...props} iconName="event" />,
  });
  return <Background />;
};

export default Dashboard;
