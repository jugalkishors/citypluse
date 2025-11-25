import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  I18nManager,
  Keyboard,
} from 'react-native';
import Font from '../../assets/fonts';
import { FULL_WIDTH } from '../../utils/constants';
import { useSelector } from 'react-redux';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation';
import axios from 'axios';
import EventCard from '../../components/EventCard';
import { useTranslation } from 'react-i18next';
import CustomInput from '../../components/CustomInput';

export default function HomeScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const userData = useSelector((state: any) => state.user.value);
  const [isLoading, setIsLoading] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [isRTL, setIsRTL] = React.useState<boolean>(false);
  const [eventSearch, setEventSearch] = React.useState('');
  const [isSearched, setIsSearched] = React.useState(false);
  const [events, setEvents] = React.useState<any>({
    number: 0,
    size: 0,
    totalPages: 0,
    totalElements: 0,
    content: [],
  });
  const getEvents = async (pageNumber = 0, keyword = '') => {
    if (isLoading) return;

    setIsLoading(true);

    const params = {
      apikey: 'Fu3o8IVXdhSEquGQMZdj2DnMELuQePxI',
      size: 10,
      page: pageNumber,
    };

    if (keyword != '') {
      Object.assign(params, { keyword });
    }

    try {
      const response = await axios.get(
        'https://app.ticketmaster.com/discovery/v2/events.json',
        {
          params,
        },
      );

      const newEvents = response?.data?._embedded?.events ?? [];

      setEvents((prev: any) => ({
        number: response?.data?.page?.number,
        size: response?.data?.page?.size,
        totalPages: response?.data?.page?.totalPages,
        totalElements: response?.data?.page?.totalElements,
        content: pageNumber === 0 ? newEvents : [...prev.content, ...newEvents],
      }));

      setPage(pageNumber);
    } catch (error: any) {
      console.log('ERROR:', error?.response?.data || error);
    } finally {
      setIsLoading(false);
    }
  };

  // ----------------------------------------------------------------
  // LOAD MORE ON SCROLL
  // ----------------------------------------------------------------
  const loadMoreEvents = () => {
    if (isLoading) return;

    // if last page is reached → stop loading
    if (page + 1 >= events.totalPages) return;

    getEvents(page + 1, isSearched ? eventSearch : '');
  };

  useEffect(() => {
    setIsRTL(I18nManager.isRTL);
    setEventSearch('');
    setIsSearched(false);
    getEvents(0);
  }, []);

  const _renderEventItem = ({ item, index }: any) => (
    <EventCard event={item} index={index} />
  );

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return { text: t('morning'), icon: '☀️' };
    if (hour < 18) return { text: t('afternoon'), icon: '🌤️' };
    return { text: t('evening'), icon: '🌙' };
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text
            style={[
              styles.greeting,
              {
                textAlign: !isRTL ? 'right' : 'left',
              },
            ]}
          >
            {getGreeting().text}{' '}
            <Text style={styles.sun}>{getGreeting().icon}</Text>
          </Text>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{userData?.name}</Text>
            <Text style={styles.wave}>👋</Text>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Profile')}
          style={styles.avatarWrapper}
        >
          <Image
            source={{
              uri: 'https://www.shareicon.net/data/512x512/2015/09/18/103160_man_512x512.png',
            }}
            style={styles.avatar}
          />
          <View style={styles.avatarRing} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchText}>
        <CustomInput
          icon="🔍"
          placeholder={t('searchEvent')}
          value={eventSearch}
          onChangeText={txt => {
            setIsSearched(false);
            setEventSearch(txt);
          }}
          style={{ width: FULL_WIDTH / 2 }}
        />

        <TouchableOpacity
          disabled={eventSearch?.length == 0}
          onPress={() => {
            setEvents((prevState: any) => ({ ...prevState, content: [] }));
            setIsSearched(true);
            getEvents(0, eventSearch);
            Keyboard.dismiss();
          }}
          style={styles.searchButton}
        >
          <Text style={{ color: '#fff', fontSize: 20, margin: 4 }}>🔎︎</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <Text
          style={[styles.upcomingText, { textAlign: isRTL ? 'right' : 'left' }]}
        >
          {t('upcomingEvents')}
        </Text>
      </View>
      {/* <Text>{events?.content?.length}</Text> */}
      <View style={{ flex: 1, marginBottom: 16 }}>
        {/* Upcoming events list would go here */}
        <FlatList
          data={events.content}
          keyExtractor={(item, index) => index.toString()}
          renderItem={_renderEventItem}
          showsVerticalScrollIndicator={false}
          onEndReached={loadMoreEvents}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isLoading ? (
              <Text style={{ textAlign: 'center', padding: 16 }}>
                Loading more...
              </Text>
            ) : null
          }
        />
      </View>
    </View>
  );
}

const AVATAR_SIZE = 50;
const AVATAR_RING = 56;

const styles = StyleSheet.create({
  container: {
    paddingTop: 48,
    paddingHorizontal: 24,
    backgroundColor: '#F8FAFC',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  greeting: {
    color: '#7B8794',
    fontSize: 14,
    fontFamily: Font.AsapMedium,
    marginBottom: 2,
  },
  sun: {
    fontSize: 18,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontFamily: Font.AsapBold,
    color: '#1A202C',
  },
  wave: {
    fontSize: 20,
    marginLeft: 8,
  },
  avatarWrapper: {
    width: AVATAR_RING,
    height: AVATAR_RING,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
  },
  avatarRing: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: AVATAR_RING,
    height: AVATAR_RING,
    borderRadius: AVATAR_RING / 2,
    borderWidth: 2,
    borderColor: '#3B82F6',
    zIndex: -1,
  },

  upcomingText: {
    fontFamily: Font.AsapBold,
    fontSize: 20,
    color: '#1A202C',
    marginTop: 32,
    marginBottom: 10,
  },

  searchText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 4,
    marginTop: 20,
  },
  searchButton: {
    marginLeft: 10,
    backgroundColor: '#000',
    padding: 8,
    borderRadius: 10,
  },
});
