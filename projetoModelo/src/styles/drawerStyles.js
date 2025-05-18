import { StyleSheet } from 'react-native'

export const COLORS = {
  darkBlue:  '#00557f',  // fundo itens não selecionados
  lightBlue: '#006bb3',  // cabeçalhos & drawer toggle
  yellow:    '#fecd02',  // ativo
  white:     '#ffffff',
};

export default StyleSheet.create({
  drawerStyle: {
    backgroundColor: COLORS.darkBlue,
    width: 260,
  },
  drawerContentOptions: {
    activeTintColor: COLORS.darkBlue,
    inactiveTintColor: COLORS.white,
    activeBackgroundColor: COLORS.yellow,
    inactiveBackgroundColor: 'transparent',
    labelStyle: {
      fontSize: 16,
      fontWeight: '600',
    },
    itemStyle: {
      marginVertical: 6,
      borderRadius: 4,
    },
  },
  drawerScroll: {
    backgroundColor: 'rgb(0, 107, 179)',
    flex: 1,
  },
  logo: {
    width: 160,
    height: 60,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginVertical: 20,
  },
  drawerContentOptions: {
    activeTintColor: '#00557f',
    inactiveTintColor: '#ffffff',
    activeBackgroundColor: '#fecd02',
    inactiveBackgroundColor: 'transparent',
    labelStyle: {
      fontSize: 16,
      fontWeight: '600',
    },
    itemStyle: {
      marginVertical: 6,
      borderRadius: 4,
    },
  },
   scroll: {
    backgroundColor: COLORS.darkBlue,
  },
  logoWrapper: {
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.lightBlue,
    marginBottom: 8,
  },
  itemsWrapper: {
    backgroundColor: 'rgb(0, 107, 179)',
  },
});

