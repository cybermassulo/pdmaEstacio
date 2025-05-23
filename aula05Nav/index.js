import { registerRootComponent } from 'expo';

import AppStack from './AppStack';
import AppDrawer from './AppDrawer';
import AppTabs from './AppTabs';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(AppTabs);
