import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 40, // Espaço extra para não sobrepor a StatusBar
    paddingBottom: 10,
    paddingHorizontal: 10,
    flexDirection: 'row', // Coloca itens lado a lado
    justifyContent: 'space-between', // Espaça os itens nas extremidades
    alignItems: 'center',
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  headerTime: {
    fontSize: 14,
    color: '#777',
  },
  editProfileButton: {
    margin: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    alignItems: 'center',
    paddingVertical: 8,
  },
  editProfileButtonText: {
    fontWeight: 'bold',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Permite quebrar linha e formar o grid
  },
});
