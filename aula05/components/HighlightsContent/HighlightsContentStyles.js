// HighlightsContentStyles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  highlightsRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
    justifyContent: 'space-around',
  },
  highlightContainer: {
    alignItems: 'center',
  },
  highlightImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 5,
  },
  highlightLabel: {
    fontSize: 12,
  },
});
