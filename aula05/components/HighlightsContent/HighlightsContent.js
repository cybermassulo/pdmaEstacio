// HighlightsContent.js
import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './HighlightsContentStyles';

const HighlightsContent = ({ highlights }) => {
  return (
    <View style={styles.highlightsRow}>
      {highlights.map((item, index) => (
        <View key={index} style={styles.highlightContainer}>
          <Image
            style={styles.highlightImage}
            source={{ uri: item.imageUrl }}
          />
          <Text style={styles.highlightLabel}>{item.label}</Text>
        </View>
      ))}
    </View>
  );
};

export default HighlightsContent;
