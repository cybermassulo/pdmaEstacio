// ProfileContentStyles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  profileSection: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
  },
  profileImageContainer: {
    marginRight: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50, // Torna a imagem circular
  },
  profileStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  statLabel: {
    color: '#888',
    fontSize: 12,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginHorizontal: 15,
  },
  userBio: {
    marginHorizontal: 15,
    color: '#555',
  },
});
