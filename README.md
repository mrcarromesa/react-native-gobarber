# App GoBarber Mobile

- Back-end: [Gobarber](https://github.com/mrcarromesa/gobarber)
- Aplicação Web: [Gobarber](https://github.com/mrcarromesa/react-gobarber-web)

- Iniciando o projeto utilizando o comando:

```bash
npx react-native init gobarbermobile
```

---

## ESLint, Prettierrc, editorconfig

- Mais detalhes acesse: [Preparando o ambiente](https://github.com/mrcarromesa/react-native-ambiente-conceitos)

---

## Root Import

- Mais detalhes acesse: [Aplicação Git](https://github.com/mrcarromesa/react-native-aplicacao-git)


## Prop-Types

Para  informar o tipo de propriedade que está sendo enviada para functions e components, para isso instale a dependencia:

```bash
yarn add prop-types
```

---

## Rotas utilizando o React Navigation

- Documentação [Getting started](https://reactnavigation.org/docs/getting-started)

- Instale a dependencia:

```bash
yarn add @react-navigation/native
```

- Adicione também essas dependencias:

```bash
yarn add react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
```

- Acesse a pasta `ios` e execute o comando:

```bash
pod install
```

- No arquivo principal da aplicação `.js` adicione logo no inicio:

```js
import 'react-native-gesture-handler';
```

---

## Estrutura básica

- Criar o arquivo `src/routes.js`

- Criar o arquivo `src/pages/SignUp/index.js`
- Criar o arquivo `src/pages/SignIn/index.js`


---

## Utilizar Gradiente no app

- Inicialmente instale a dependencia:

```bash
yarn add react-native-linear-gradient
```

- Após instalar acesse a pasta `ios` e execute o comando:

```bash
pod install
```

---

### Construíndo os components da aplicação

- Criar a pasta `src/components`
- Criar o arquivo `src/components/Background/index.js`


- Adicione a dependencia do `styled-components`:

```bash
yarn add styled-components
```


---

## Criar components globais

- Criar o arquivo `src/components/Input/index.js`
- Criar o arquivo `src/components/Input/styles.js`

- Criar o arquivo `src/components/Button/index.js`
- Criar o arquivo `src/components/Button/styles.js`

- Para o Input queremos passar a propriedade `ref` por uma questão de definir o focus de forma manual entre outras coisas..., para isso precisamos fazer de uma maneira um pouco diferente, precisamos importar `forwardRef`:

```js
import React, { forwardRef } from 'react';
```


- Com serão passadas props para esse componente precisamos tranformar em uma cost, e passar a propriedade ref para o component:

```js
const Input = forwardRef(({ style, icon, ...rest }, ref) => {
  return (
    <Container style={style}>
      <TInput {...rest} ref={ref} />
    </Container>
  );
});
```

- Vamos adicionar a parte de icones na aplicação, para isso instale a dependencia:

```bash
yarn add react-native-vector-icons
```

- Feito isso precisamos informar para as plataformas ios e android quais fontes de icones para isso podemos acessar a documentação [Vector Icons](https://github.com/oblador/react-native-vector-icons)

- Por fim podemos escolher quais fontes iremos utilizar, para esse projeto foi escolhida a `MaterialIcons`.

No arquivo `ios/NOME_DO_PROJETO/Info.plist` adicionamos no final do arquivo antes de `</dict>`:

```xml
<key>UIAppFonts</key>
<array>
  <string>MaterialIcons.ttf</string>
</array>
```

- Depois acessar a pasta `ios` e executar o comando:

```bash
pod install
```

- Para android, no final do arquivo `android/app/build.gradle` antes do ultimo apply adicione:

```gradle
project.ext.vectoricons = [
    iconFontNames: [ 'MaterialIcons.ttf' ] // Name of the font files you want to copy
]

apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
```


---

- Estilizando SignIn

- Algumas coisas interessate:

```js
<TextInput
  keyboardType="email-address"
  autoCorrect={false}
  autoCapitalize="none"
  placeholder="Digite seu e-mail"
/>
<TextInput
  secureTextEntry
  placeholder="Sua senha secreta"
/>
```

- as propriedades:

- `keyboardType` - Tipo de teclado
- `autoCorrect` - Se deve tentar corrigir automáticamente ou não
- `autoCapitalize` - Cada nova palavra iniciar ou não com letra maiuscula
- `secureTextEntry` - transformar em um campo de password

- No arquivo `src/pages/SignIn/styles.js` temos o seguinte:

```js
import { Platform } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
`;
```

- Utilizamos o `KeyboardAvoidingView`, pois no ios o teclado acaba ficando na frente do Input então utilizamos esse componente para ajustar isso.

- Ajustando a tela de SingUp

- Algo importante a navegação para navegar de uma tela para outra utilizamos:

```js
import { useNavigation } from '@react-navigation/native';

//...
const navigation = useNavigation();
//...
<Button
  title=""
  onPress={() => {
    navigation.navigate('SignUp');
  }}
/>
//...
```


---

## Ajustando StatusBar

Para estilizar a StatusBar altere no arquivo `src/index.js`:

```js
import { StatusBar } from 'react-native';

// ...

<StatusBar barStyle="light-content" backgroundColor="#7159c1" />

// ...

```

## Navegar de um input para outro:

- No arquivo `src/pages/SignIn` adicionamos o seguinte:

```js
import React, { useRef } from 'react';

// ...

const passwordRef = useRef(null);

// ...

<TextInput
  returnKeyType="next"
  onSubmitEditing={() => passwordRef.current.focus()}
/>
<TextInput
  ref={passwordRef}
  returnKeyType="send"
  onSubmitEditing={handleSubmit}
/>
```

- Algumas props adicionadas ao component:

- `ref` definimos a variavel de referencia para o input
- `returnKeyType` definimos o tipo de botão enter que deverá aparecer no teclado
- `onSubmitEditing` definimos a ação para quando for pressionado o `enter`


---

## Reactotron

- Instale as seguintes dependencias:

```bash
yarn add reactotron-react-native reactotron-redux reactotron-redux-saga
```

```bash
yarn add redux redux-saga react-redux
```

- Crie o arquivo `src/config/ReactotronConfig.js`

- Inicialmente adicionamos o seguinte conteúdo:

```js
import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import reactotronSaga from 'reactotron-redux-saga';

if (__DEV__) {
  const tron = Reactotron.configure()
    .useReactNative()
    .use(reactotronRedux())
    .use(reactotronSaga())
    .connect();

  tron.clear();

  console.tron = tron;
}

```

- Ajustamos no arquivo `src/index.js` é melhor adicionar antes da rota para conseguirmos adicionar o console.tron em mais lugares da aplicação

```js
import './config/ReactotronConfig';
```


---

## Redux e Redux Saga

- Podemos utilizar o mesmo store de [Go Barber Web](https://github.com/mrcarromesa/react-gobarber-web)

- Em `src/store/index.js` e em `src/store/createStore.js` ajustar a variavel de desenvolvimento:

```js
// Ajsutar isso:
// process.env.NODE_ENV === 'development'
// para isso:
__DEV__
```


- Precisamos instalar as seguintes libs:

```bash
yarn add redux-persist immer
```

- Para salvar os dados no storage instalamos a dependnecia:

```bash
yarn add @react-native-community/async-storage
```

- Para ios, acessamos a pasta `ios` e executamos o comando:

```bash
pod install
```

- O arquivo `src/store/persistReducers.js`

```js
// o storage obtem a estratégia padrão para armazenamento,
// No caso para web o localstorage, e para o native seria o asyncstorage
import AsyncStorage from '@react-native-community/async-storage';
import { persistReducer } from 'redux-persist';

export default (reducers) => {
  const persisttedReducer = persistReducer(
    {
      key: 'gobarber',
      storage: AsyncStorage,
      whitelist: ['auth', 'user'],
    },
    reducers
  );

  return persisttedReducer;
};

```

- Detalhes: [Redux Persist](https://github.com/rt2zz/redux-persist)
- E em [Quick Start for React Native](https://github.com/infinitered/reactotron/blob/master/docs/quick-start-react-native.md)


- Importe a dependencia:

```bash
yarn add axios
```

- Criar o arquivo `src/services/api.js`:

```js
import axios from 'axios';

const api = axios.create({
  // se for android emulador inserir: http://10.0.2.2:...
  // se for android genymotion inserir: http://10.0.3.2:...
  // se for dispositivo fisico inserir: http://O_IP_DA_SUA_MAQUINA:...
  baseURL: 'http://localhost:3333',
});

export default api;

```

- Nos arquivos `src/store/modules/auth/sagas.js` e `src/store/modules/user/sagas.js` remova o `history` por enquanto e no lugar do `toastfy` será utilizado o próprio `Alert` do react-native


- No arquivo `src/index.js` vamos adicionar o provider do redux

```js
import React from 'react';
import { PersistGate } from 'redux-persist/integration/react'; // <--
import { Provider } from 'react-redux'; // <--
import { StatusBar } from 'react-native';
import './config/ReactotronConfig';

import { store, persistor } from './store'; // <--
import Routes from './routes';

const App = () => {
  return (
    <Provider store={store}> // <--
      <PersistGate persistor={persistor}> // <--
        <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
        <Routes />
      </PersistGate> // <--
    </Provider> // <--
  );
};

export default App;

```

## Utilizando o Redux na aplicação

- No arquivo `src/pages/SignIn` adicione:

```js

import { useDispatch } from 'react-redux';
import { signInRequest } from '~/store/modules/auth/actions';
//...
const dispatch = useDispatch();
//...
function handleSubmit() {
  dispatch(signInRequest(email, password));
}
//...

```

- No Reactotron será possível verificar que algumas coisas aconteceram...
  - A chamada API
  - A chamada do AsyncStorage

- Também no Reactotron no botão `State` - Podemos adicionar o monitoramento do reducer `auth` e `user` e vemos que eles são preenchidos.

---

- Também podemos adicionar a utilização do redux no SignUp


- Adicionar o loading no button na página `SignIn`:

```js
import { useDispatch, useSelector } from 'react-redux';

// ...

const loading = useSelector((state) => state.auth.loading);

// ...

<SubmitButton loading={loading} onPress={handleSubmit}>
  Acessar
</SubmitButton>
```

- O mesmo pode ser feito em `SignUp`

- Uma dica, no `sagas.js` podemos utilizar um delay quando necessário, para dar um atraso:

```js
import { takeLatest, call, put, all } from 'redux-saga/effects';

// ...

yield delay(3000);
```


---

## Utilizando Navegação por abas

- Primeiro instale a dependencia:

```bash
yarn add @react-navigation/bottom-tabs
```

---

### Melhorando a estrutura de Rotas

- Primeiro vamos eliminar o arquivo `src/routes.js`
- Criar a pasta `src/routes/`
- Criar o arquivo `src/routes/index.js`
- Criar o arquivo `src/routes/auth.routes.js`
- Criar o arquivo `src/routes/app.routes.js`

- No arquivo `src/routes/auth.routes.js` adicionar:

```js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';

const Stack = createStackNavigator();

const AuthRoutes = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ title: 'SignUp' }}
      />
    </Stack.Navigator>
  );
};

export default AuthRoutes;

```

- No arquivo `src/routes/app.routes.js` adicionar:

```js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Dashboard from '~/pages/Dashboard';

const Tab = createBottomTabNavigator();

const AppRoutes = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
      />
    </Tab.Navigator>
  );
};

export default AppRoutes;

```

- Por fim no arquivo `src/routes/index.js` adicionar:

```js
import 'react-native-gesture-handler';
import React from 'react';
import { useSelector } from 'react-redux'; // <-- Utilizamos o useSelector para obter o state global
import { NavigationContainer } from '@react-navigation/native';
import AuthRoutes from './auth.routes'; // <-- AS rotas de autenticação
import AppRoutes from './app.routes'; // <-- As Rotas do aplicativo já autenticado

export default function Routes() {
  const { signed } = useSelector((state) => state.auth); // <-- Verificar se o usuário está logado ou não
  return (
    <NavigationContainer>
      {signed ? <AppRoutes /> : <AuthRoutes />} // <-- Caso o usuário esteja logado Exibimos as Rotas autenticadas, do contrário exibimos as rotas de autenticação.
    </NavigationContainer>
  );
}

```

- Ajuste da TabBar, No arquivo `src/routes/app.routes.js` temos o seguinte:


```js
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Dashboard from '~/pages/Dashboard';
import TabIcon from '~/components/TabIcon';

const Tab = createBottomTabNavigator();

const AppRoutes = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        keyboardHidesTabBar: true,
        activeTintColor: '#fff',
        inactiveTintColor: 'rgba(255, 255, 255, 0.6)',
        style: {
          backgroundColor: '#8d41a8',
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: (props) => <TabIcon {...props} iconName="person" />,
        }}
      />
    </Tab.Navigator>
  );
};

export default AppRoutes;
```

- Adicionamos para `Tab.Navigator` a prop `tabBarOptions` que recebe um objeto com as seguintes opções:

- `keyboardHidesTabBar` Informar se deve ser ocultado ou não ao exibir o teclado, true é igual a ocultar ,
- `activeTintColor` Cor do icone e do label quando ativo,
- `inactiveTintColor` Cor do icone e do label quando inativo,
- `style` estilização css.

- No caso do Tab Navigator a parte do icone é necessário inserir direto no Tab Screen, pois todos eles serão carregados antes da tela ser reenderizada, porém se inserir apenas nas opções na tela ele só será exibido apenas quando a tal tela for acessada.

---

- Foi criado também o componente : `src/components/TabIcon/index.js` para adicionar o icone na aba como componente, Dessa forma conseguimos informar os propTypes.

- E na tela `src/pages/Dashboard/index.js` adicionamos o seguinte:

```js
// ...
import { useNavigation } from '@react-navigation/native';

import TabIcon from '~/components/TabIcon';
// ...

const Dashboard = () => {
  const navigation = useNavigation();

  // Abaixo informamos as opção do tabBar
  navigation.setOptions({
    tabBarLabel: 'Agendamentos',
    tabBarIcon: TabIcon, // <-- Aqui recebe o icone importado acima
  });
  return <View />;
};

export default Dashboard;

```

---

- Criamos outra tela `src/pages/Profile/index.js` e importamos na rota autenticada.


---

## Estilizando a tela Dashboard

- no arquivo `src/pages/Dashboard/styles.js` utilizamos o seguinte para o `Container` ao invés de utilizar o `View` utilizamos o `SafeAreaView` pois ele adiciona o tamanho do corte da statusbar, que há no iPhone X


---

- Para trabalhar com datas no component `src/components/Appointment/index.js` utilizamos o `data-fns`:

```bash
yarn add date-fns@next
```

- E então para formatar uma data determinando quando tempo já se passou relativo a outra data utilizamos a seguinte forma:

```js
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

// ...
return formatRelative(parseISO(data.date), new Date(), {
  locale: pt,
  addSuffix: true,
});
// ...
```

- Cancelando um agendamento...:

- No arquivo Dashboard adicionamos o seguinte:


```js

//...
async function handleCancel(id) {
  const { data } = await api.delete(`appointments/${id}`);

  setAppointments(
    // Pecorre todo o array
    appointments.map((appointment) =>
      appointment.id === id
      // caso encontre o id
        ?
        // reecria o objeto com a prop canceled_at
        { ...appointment, canceled_at: data.canceled_at }
        :
        // Do contrario retorna ele mesmo
        appointment
    )
  );
}

//...
<List
  data={appointments}
  keyExtractor={(item) => String(item.id)}
  renderItem={({ item }) => (
    <Appointment onCancel={() =>
      // envia a function para o conponent
      handleCancel(item.id)} data={item} />
  )}
/>
//...
//...

```

- No arquivo `src/components/Appointment/index.js` adicionamos o seguinte:

```js

//...
const Appointment = ({ data, onCancel }) => {
  //...
    {data.cancelable && !data.canceled_at && (
      <TouchableOpacity onPress={onCancel}>
        <Icon name="event-busy" size={20} color="#f64c75" />
      </TouchableOpacity>
    )}
  //...
}

```


---


## Sair da aplicação:

- No arquivo `src/pages/Profile/index.js` temos o seguinte:

```js
//...
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '~/store/modules/auth/actions';
//...
function handleLogout() {
  dispatch(signOut());
}
//...
```

- E quando clicamos nesse botão ele já redireciona para página de login automáticamente.
- Como isso acontece?

- O arquivo `src/store/modules/auth/actions.js` lança a action:

```js
export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}
```

- Que por sua vez é "ouvida" pelo `src/store/modules/auth/reducer.js`:

```js
case '@auth/SIGN_OUT': {
  draft.token = null;
  draft.signed = false;
  break;
}
```

- E Que por sua vez é "ouvida" pelo `src/store/modules/user/reducer.js`:

```js
case '@auth/SIGN_OUT': {
  draft.profile = null;
  break;
}
```

- O qual seta o `token`, o `signed` e o `profile` como `null`, e para completar, no arquivo `src/routes/index.js` acompanha a alteração desse objeto e toma ação quando ele é alterado especificamente o objeto `profile`:

```js
export default function Routes() {
  const { signed } = useSelector((state) => state.auth);
  return (
    <NavigationContainer>
      {signed ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}

```

- Como podemos verificar quando há alteração no `signed` a rota também muda.


---

## Rotas para agendamento


- Criar a pasta `src/pages/New`
- Criar o arquivo `src/pages/New/SelectProvider/index.js`
- Criar o arquivo `src/pages/New/SelectDateTime/index.js`
- Criar o arquivo `src/pages/New/Confirm/index.js`

- Ajustar as rotas `src/routes/app.routes.js`:

```js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'; // <- Adicionado
import TabIcon from '~/components/TabIcon';

import SelectProvider from '~/pages/New/SelectProvider'; // <- Adicionado
import SelectDateTime from '~/pages/New/SelectDateTime'; // <- Adicionado
import Confirm from '~/pages/New/Confirm'; // <- Adicionado

import Dashboard from '~/pages/Dashboard';
import Profile from '~/pages/Profile';

const Tab = createBottomTabNavigator();

const New = createStackNavigator(); // <- Adicionado


// Adicionado essa function
const NavNew = () => {
  return (
    <New.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTintColor: '#fff',
        headerLeftContainerStyle: {
          marginLeft: 20,
        },
      }}
    >
      <New.Screen
        name="SelectProvider"
        options={{
          title: 'Selecione o prestador',
        }}
        component={SelectProvider}
      />
      <New.Screen name="SelectDateTime" component={SelectDateTime} />
      <New.Screen name="Confirm" component={Confirm} />
    </New.Navigator>
  );
};

const AppRoutes = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        keyboardHidesTabBar: true, //Permitir o teclado a ser exibido ocultar a barra do tabbar
        activeTintColor: '#fff',
        inactiveTintColor: 'rgba(255, 255, 255, 0.6)',
        style: {
          backgroundColor: '#8d41a8',
        },
      }}
      initialRouteName="Dashboard"
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: (props) => <TabIcon {...props} iconName="event" />,
        }}
      />
      {/* Adicionado essa Tab screnn */}
      <Tab.Screen
        name="New"
        component={NavNew}
        options={{
          tabBarVisible: false, // <- Removida a visualizacao do tabbar para quando estiver em alguma dessas telas não ter a posibilidade de navegar entre as demais abas.
          tabBarLabel: 'Agendar',
          tabBarIcon: (props) => (
            <TabIcon {...props} iconName="add-circle-outline" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: (props) => <TabIcon {...props} iconName="person" />,
        }}
      />
    </Tab.Navigator>
  );
};

export default AppRoutes;

```

---

- Adicionar um Button Left no header do Navigation

- No arquivo `src/pages/New/SelectProvider/index.js` adicionar o seguinte:

```js
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // <- Adicionar
import Icon from 'react-native-vector-icons/MaterialIcons'; // <- Adicionar
// ...

const SelectProvider = () => {
  const navigation = useNavigation(); // <- Adicionar

  // Adicionamos buttons no header dessa forma
  navigation.setOptions({
    headerLeft: () => (
      <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
        <Icon name="chevron-left" size={20} color="#fff" />
      </TouchableOpacity>
    ),
  });
  // ...
};

export default SelectProvider;

```


---

## Seleção do prestador de serviço

- Um dos componentes dessa tela é uma `FlatList` e iremos utilizar com colunas.

- No arquivo `src/pages/New/SelectProvider/styles.js` temos:

```js
export const ProviderList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  numColumns: 2,
})`
  margin-top: 60px;
  padding: 0 20px;
`;
```

---

## Tela diferenciada para IOS e Android

- Para tela de escolha de Data iremos utilizar componentes diferente para Android e IOS

- Crie a pasta `src/components/DateInput`

- Crie o arquivo `src/components/DateInput/index.js` deixar vazio

- Crie o arquivo `src/components/DateInput/index.android.js`
- Crie o arquivo `src/components/DateInput/index.ios.js`

- O React Native irá se encarregar de utilizar o arquivo certo

- No arquivo `src/pages/New/SelectDateTime/index.js` vamos adicionar o component dessa forma:

```js
//...
import DateInput from '~/components/DateInput';
//...

<DateInput date={date} onChange={setDate} />
//...
```

- Mais detalhes: [React Native DateTimePicker](https://github.com/react-native-community/datetimepicker)

- Para utilizar o DataPicker agora é necessario instalar o componet do community:

```bash
yarn add @react-native-community/datetimepicker
```

- Para ios, acesse a pasta `ios` e execute o comando:

```bash
pod install
```


---

- Na tela de SelectDateTime, utilizamos o `RectButton` pois diferente do `TouchableOpacity` ele possuí a propriedade `enabled` que não permite o click do botão caso esteja como false.


---

- Algo que foi utilizado na parte da tela de Confirmação foi receber paramentros de outra rota...

- Da página `src/pages/New/SelectDateTime/index.js` passamos os parametros:

```js
function handleSelectHour(time) {
  navigation.navigate('Confirm', {
    provider,
    time,
  });
}
```

- E recebemos essa info na outra página `src/pages/New/Confirm/index.js` dessa forma:

```js
//...
import { useNavigation, useRoute } from '@react-navigation/native';
//...
const route = useRoute();
const { provider, time } = route.params;
//...
```


---

## Resolvendo um problema para realizar um reload quando recarregar o dashboard

- Quando acessamos a primeira vez uma rota ela é criada na memória e podemos utilizar normalmente o `useEffect` porém quando precisamos executar uma functio para quando voltamos para determinada rota, ela não é recriada, pois ela já está na memória, dessa forma não conseguimos utilizar o `useEffect` para tal utilizamos o `useFocusEffect` o qual identifica se retornamos para determinada rota e executa uma ação quando voltamos para ela, e o uso dela é igual ao `useEffect`, conforme é possível notar na página `src/pages/Dashboard/index.js`


```js
import { useNavigation, useFocusEffect } from '@react-navigation/native';
```

---

## Resolver problemas com as abas

- Quando realizamos uma navegação direta de uma aba para outra utilizando a function `navigation.navigate()` dentro de uma navegação Stack para uma navegação `Pai` que é com abas, ao tentar retornar para o fluxo normal dessa aba, é possível que ele retorne para última tela acessada ao invés da primeira, para contornar isso utilizamos a prop: `unmountOnBlur: true`, conforme utilizado em `src/routes/app.routes.js`:

```js
<Tab.Screen
  name="New"
  component={NavNew}
  options={{
    unmountOnBlur: true, // <- Utilizado aqui
    tabBarVisible: false,
    tabBarLabel: 'Agendar',
    tabBarIcon: (props) => (
      <TabIcon {...props} iconName="add-circle-outline" />
    ),
  }}
/>
```
