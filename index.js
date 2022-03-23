import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';

import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
const sourceRender = Text.render;
Text.render = function render(props, ref) {
  return sourceRender.apply(this, [{ ...props, style: [{ fontFamily: 'Clancy' }, props.style] }, ref]);
};

registerRootComponent(App);

//Clancy, sans-serif