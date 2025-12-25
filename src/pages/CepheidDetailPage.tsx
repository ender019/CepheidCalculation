import { type FC, useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  ActivityIndicator, 
  StyleSheet,
  Platform
} from 'react-native';
import { useParams, useNavigate } from 'react-router-dom';
import type { Cepheid } from '../types/index';
import { cepheidService } from '../services/api';
import { useImageWithFallback } from '../hooks/useImageWithFallback';
import Breadcrumbs from '../components/Breadcrumbs';

const CepheidDetailPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [cepheid, setCepheid] = useState<Cepheid | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const image = useImageWithFallback(cepheid?.img || '');

  useEffect(() => {
    if (id) {
      loadCepheid(id);
    } else {
      setError('ID цефеиды не указан');
      setLoading(false);
    }
  }, [id]);

  const loadCepheid = async (cepheidId: string) => {
    setLoading(true);
    try {
      const data = await cepheidService.getCepheidById(cepheidId);
      setCepheid(data);
    } catch (err) {
      setError('Не удалось загрузить данные цефеиды');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#003247" />
        <Text style={styles.alertText}>Загрузка...</Text>
      </View>
    );
  }

  if (error || !cepheid) {
    return (
      <View style={styles.container}>
        <View style={[styles.alert, styles.alertDanger]}>
          <Text style={styles.alertDangerText}>{error || 'Цефеида не найдена'}</Text>
        </View>
        <TouchableOpacity onPress={() => navigate(-1)}>
          <Text style={styles.backLink}>Вернуться к каталогу</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.scrollContent}>
      <View style={styles.container}>

        {/* ХЛЕБНЫЕ КРОШКИ */}
        <Breadcrumbs crumbs={[
          { label: cepheid.title }
        ]} />

        {/* Кнопка назад (.back-link) */}
        <TouchableOpacity onPress={() => navigate(-1)} style={styles.backLinkContainer}>
          <Text style={styles.backLink}>← Назад к каталогу</Text>
        </TouchableOpacity>

        {/* Карточка (.cepheid-detail) */}
        <View style={styles.cepheidDetail}>
          {/* Изображение (.cepheid-image-detail) */}
          <Image 
            source={{ uri: image.src }} 
            style={styles.cepheidImageDetail}
            onLoad={image.onLoad}
            onError={image.onError}
            resizeMode="cover"
          />

          {/* Контент (.cepheid-content-detail) */}
          <View style={styles.cepheidContentDetail}>
            <Text style={styles.cepheidTitleDetail}>{cepheid.title}</Text>

            {/* Параметры (.cepheid-meta) */}
            <View style={styles.cepheidMeta}>
              <View style={styles.metaItem}>
                <Text style={styles.metaTitle}>Период:</Text>
                <Text style={styles.metaContent}>{cepheid.period}</Text>
              </View>
              <View style={styles.metaItem}>
                <Text style={styles.metaTitle}>Источник данных:</Text>
                <Text style={styles.metaContent}>{cepheid.source}</Text>
              </View>
            </View>

            {/* Описание (.cepheid-description-detail) */}
            <Text style={styles.cepheidDescriptionDetail}>
              {cepheid.description}
            </Text>

            {/* Коэффициенты (.cepheid-coeffs) */}
            <View style={styles.cepheidCoeffs}>
              <Text style={styles.coeffsText}>
                Примерные коэффициенты: a = -2.81, b = -1.43
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#F5F5F5', // --background-light
    margin: 5,
  },
  scrollContent: {
    alignItems: 'center', // Центрируем контейнер
    paddingBottom: 40,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  container: {
    width: '85%',
    maxWidth: 1640, // .container max-width
    paddingTop: 20,
  },
  backLinkContainer: {
    marginBottom: 25,
    alignSelf: 'flex-start',
  },
  backLink: {
    fontFamily: 'Lato,sans-serif',
    color: '#003247', // --primary-blue
    fontWeight: 700,
    fontSize: 16,
  },
  // .cepheid-detail
  cepheidDetail: {
    backgroundColor: '#FFFFFF', // --card-background
    borderRadius: 8,
    overflow: 'hidden',
    width: '100%',
    ...Platform.select({
      web: { boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
      android: { elevation: 3 },
      ios: { shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 8, shadowOffset: { width: 0, height: 2 } }
    }),
  },
  // .cepheid-image-detail
  cepheidImageDetail: {
    width: '100%',
    height: 300, // В CSS: height: 300px
    backgroundColor: '#E8E8E4', // Плейсхолдер
  },
  // .cepheid-content-detail
  cepheidContentDetail: {
    padding: 25, // В CSS: padding: 25px
  },
  // .cepheid-title-detail
  cepheidTitleDetail: {
    fontFamily: 'Orbitron, sans-serif',
    fontSize: 28, // 1.8rem
    color: '#003247', // --primary-blue
    marginBottom: 15,
  },
  // .cepheid-meta
  cepheidMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    marginBottom: 25,
  },
  // .meta-item
  metaItem: {
    flex: 1,
    minWidth: 250, // Из CSS: minmax(250px, 1fr)
    padding: 15,
    backgroundColor: '#F5F5F5', // --background-light
    borderRadius: 4,
  },
  metaTitle: {
    fontSize: 16,
    fontFamily: 'Lato,sans-serif',
    fontWeight: 700,
    color: '#003247', // --primary-blue
    marginBottom: 10,
  },
  metaContent: {
    fontSize: 16,
    fontFamily: 'Lato,sans-serif',
    color: '#333333', // --text-dark
  },
  // .cepheid-description-detail
  cepheidDescriptionDetail: {
    fontFamily: 'Lato,sans-serif',
    fontSize: 16,
    lineHeight: 28, // 1.8 * 16px
    color: '#333333',
    marginBottom: 20,
  },
  // .cepheid-coeffs
  cepheidCoeffs: {
    backgroundColor: '#F5F5F5', // --background-light
    marginTop: 20,
    marginBottom: 25,
    padding: 10,
    borderRadius: 4,
    alignSelf: 'flex-start', // display: inline-block
  },
  coeffsText: {
    fontFamily: 'Lato,sans-serif',
    color: '#666666', // --text-muted
    fontSize: 17,
  },
  alert: {
    padding: 15,
    borderRadius: 4,
    width: '100%',
  },
  alertDanger: {
    backgroundColor: '#f8d7da',
    borderWidth: 1,
    borderColor: '#f5c6cb',
  },
  alertDangerText: {
    color: '#721c24',
    textAlign: 'center',
  },
  alertText: {
    fontFamily: 'Lato',
    color: '#055160',
  }
});

export default CepheidDetailPage;