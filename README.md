# App GoBarber Mobile

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
