import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import Background from '~/components/Background';

import { Container, ProviderList, Provider, Avatar, Name } from './styles';

import api from '~/services/api';

const SelectProvider = () => {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    async function loadProviders() {
      const { data } = await api.get('providers');
      setProviders(data);
    }

    loadProviders();
  }, []);

  const navigation = useNavigation();
  navigation.setOptions({
    headerLeft: () => (
      <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
        <Icon name="chevron-left" size={20} color="#fff" />
      </TouchableOpacity>
    ),
  });
  return (
    <Background>
      <Container>
        <ProviderList
          data={providers}
          keyExtractor={(provider) => String(provider.id)}
          renderItem={({ item: provider }) => (
            <Provider
              onPress={() =>
                navigation.navigate('SelectDateTime', { provider })
              }
            >
              <Avatar
                source={{
                  uri: provider.avatar
                    ? provider.avatar.url
                    : 'https://api.adorable.io/avatars/50/abott@adorable.png',
                }}
              />
              <Name>{provider.name}</Name>
            </Provider>
          )}
        />
      </Container>
    </Background>
  );
};

export default SelectProvider;
