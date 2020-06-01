import React, { useState } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
// import AsyncStorage from '@react-native-community/async-storage';
// import TabIcon from '~/components/TabIcon';
import Background from '~/components/Background';
import Appointment from '~/components/Appointment';
import { Container, Title, List } from './styles';

import api from '~/services/api';

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);

  useFocusEffect(() => {
    // AsyncStorage.clear().then(() => {});
    async function loadAppointments() {
      const { data } = await api.get('appointments');

      setAppointments(data);
    }
    loadAppointments();
  }, []);

  async function handleCancel(id) {
    const { data } = await api.delete(`appointments/${id}`);

    setAppointments(
      appointments.map((appointment) =>
        appointment.id === id
          ? { ...appointment, canceled_at: data.canceled_at }
          : appointment
      )
    );
  }

  const navigation = useNavigation();
  navigation.setOptions({
    tabBarLabel: 'Agendamentos',
    // tabBarIcon: (props) => <TabIcon {...props} iconName="event" />,
  });
  return (
    <Background>
      <Container>
        <Title>Agendamentos</Title>
        <List
          data={appointments}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Appointment onCancel={() => handleCancel(item.id)} data={item} />
          )}
        />
      </Container>
    </Background>
  );
};

export default Dashboard;
