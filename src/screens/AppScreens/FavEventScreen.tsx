import React, { use, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, I18nManager } from 'react-native';
import Font from '../../assets/fonts';
import EventCard from '../../components/EventCard';
import { GetFavEvents } from '../../services/AuthAPIs';
import { useTranslation } from 'react-i18next';

export default function FavEventScreen() {
  const { t } = useTranslation();
  const isRTL = I18nManager.isRTL;
  const [events, setEvents] = React.useState<any>({
    content: [],
  });

  const _renderEventItem = ({ item, index }: any) => (
    <EventCard event={item} index={index} />
  );

  const getEvents = async () => {
    GetFavEvents().then(favEvents => {
      setEvents({ content: favEvents });
    });
  };

  const EmptyListView = () => {
    return (
      <View style={{ alignItems: 'center', marginTop: 50 }}>
        <Text
          style={{ fontFamily: Font.AsapMedium, fontSize: 16, color: '#555' }}
        >
          {t('noFavoriteEvents')}
        </Text>
      </View>
    );
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Text
          style={[
            styles.upcomingText,
            {
              flexDirection: 'row',
            },
          ]}
        >
          {t('favoriteEvents')}
        </Text>
      </View>
      <View style={{ flex: 1, marginBottom: 16 }}>
        {/* Upcoming events list would go here */}
        <FlatList
          data={events.content}
          keyExtractor={(item, index) => index.toString()}
          renderItem={_renderEventItem}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={EmptyListView}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 48,
    paddingHorizontal: 24,
    backgroundColor: '#F8FAFC',
    flex: 1,
  },
  upcomingText: {
    fontFamily: Font.AsapBold,
    fontSize: 20,
    color: '#1A202C',
    marginTop: 32,
  },
});
