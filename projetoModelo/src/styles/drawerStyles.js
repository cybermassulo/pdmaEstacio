export const COLORS = {
  darkBlue:  '#00557f',  // fundo itens não selecionados
  lightBlue: '#006bb3',  // cabeçalhos & drawer toggle
  yellow:    '#fecd02',  // ativo
  white:     '#ffffff',
};

export const drawerNavigatorStyle = {
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
};
