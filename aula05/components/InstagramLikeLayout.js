import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions
} from 'react-native';

// Importa os estilos específicos deste arquivo
import styles from './InstagramLikeLayoutStyles';

// Importa os componentes separados
import ProfileContent from './ProfileContent/ProfileContent';
import HighlightsContent from './HighlightsContent/HighlightsContent';
import TabContent from './TabContent/TabContent';

// Obtém a largura do dispositivo para calcular o tamanho das imagens no grid
const deviceWidth = Dimensions.get('window').width;
const imageSize = deviceWidth / 3; // Divide a tela em 3 colunas

const InstagramLikeLayout = () => {
  // Exemplo de dados para os "highlights" (stories em destaque)
  const highlights = [
    { imageUrl: 'https://via.placeholder.com/60', label: 'Highlight 1' },
    { imageUrl: 'https://via.placeholder.com/60', label: 'Highlight 2' },
    { imageUrl: 'https://via.placeholder.com/60', label: 'Highlight 3' },
    { imageUrl: 'https://via.placeholder.com/60', label: 'Highlight 4' },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Company</Text>
        <Text style={styles.headerTime}>11:11 PM</Text>
      </View>

      {/* Seção de perfil (foto, contadores e dados do usuário) */}
      <ProfileContent
        profileImageUrl="https://via.placeholder.com/100"
        postCount={222}
        followerCount={513}
        followingCount={558}
        userName="Username"
        bio1="Lorem ipsum dolor sit"
        bio2="Lorem ipsum"
      />

      {/* Botão "Edit Profile" */}
      <TouchableOpacity style={styles.editProfileButton}>
        <Text style={styles.editProfileButtonText}>Edit Profile</Text>
      </TouchableOpacity>

      {/* Destaques (stories) */}
      <HighlightsContent highlights={highlights} />

      {/* Abas (Grid / Reels / Tagged) */}
      <TabContent />

      {/* Grid de imagens (3 colunas) */}
      <View style={styles.grid}>
        {[...Array(9)].map((_, index) => (
          <Image
            key={index}
            style={{ width: imageSize, height: imageSize }}
            source={{ uri: 'https://via.placeholder.com/150' }}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default InstagramLikeLayout;
