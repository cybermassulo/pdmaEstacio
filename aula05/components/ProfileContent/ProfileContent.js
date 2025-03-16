// ProfileContent.js
import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './ProfileContentStyles';

const ProfileContent = ({
  profileImageUrl,
  postCount,
  followerCount,
  followingCount,
  userName,
  bio1,
  bio2,
}) => {
  return (
    <View>
      {/* Foto e estatísticas */}
      <View style={styles.profileSection}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: profileImageUrl }}
            style={styles.profileImage}
          />
        </View>
        <View style={styles.profileStats}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{postCount}</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{followerCount}</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{followingCount}</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>
      </View>

      {/* Nome do usuário e bio */}
      <Text style={styles.userName}>{userName}</Text>
      <Text style={styles.userBio}>{bio1}</Text>
      <Text style={styles.userBio}>{bio2}</Text>
    </View>
  );
};

export default ProfileContent;
