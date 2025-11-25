import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Linking,
} from 'react-native';
import { FULL_HEIGHT, FULL_WIDTH } from './../../utils/constants';
import Images from '../../utils/ImageConstants';
import MapView, { Marker } from 'react-native-maps';
import Font from '../../assets/fonts';
import moment from 'moment';
import CustomButton from '../../components/CustomButton';
import { RouteProp, useRoute } from '@react-navigation/native';
import {
  AddToFavEvents,
  IsEventInFav,
  RemoveFromFavEvents,
} from '../../services/AuthAPIs';
import { toast } from '../../utils/toast';
import { RootStackParamList } from '../../navigation';

type EventDetailRouteProp = RouteProp<RootStackParamList, 'EventDetail'>;

const EventDetailScreen: React.FC = () => {
  const event = useRoute<EventDetailRouteProp>().params.event;
  const [isFav, setIsFav] = React.useState(false);
  console.log('Event Details:', event);

  const openMapsApp = (lat: number, lng: number) => {
    const url = Platform.select({
      ios: `maps:0,0?q=${lat},${lng}`,
      android: `geo:0,0?q=${lat},${lng}`,
    });

    if (url !== undefined) {
      Linking.openURL(url);
    }
  };

  const saveEvent = () => {
    AddToFavEvents(event).then(response => {
      if (response.success) {
        setIsFav(true);
        toast.success('Event', 'Event added to favorites');
      } else {
        toast.error('Event', response.message);
      }
    });
  };

  const removeEvent = () => {
    RemoveFromFavEvents(event?.id).then(response => {
      if (response.success) {
        setIsFav(false);
        toast.success('Event', 'Event removed from favorites');
      } else {
        toast.error('Event', response.message);
      }
    });
  };

  useEffect(() => {
    IsEventInFav(event?.id)
      .then(exists => {
        setIsFav(exists);
      })
      .catch(() => toast.error('Event', 'Error checking favorite status'));
  }, []);

  return (
    <ScrollView style={{ flex: 1 }} bounces={false}>
      <View>
        <Image
          source={{ uri: event?.images?.[0]?.url }}
          style={[styles.image, { width: '100%' }]}
          resizeMode="cover"
        />

        <View style={{ padding: 16 }}>
          <Text style={styles.title}>{event.title || event.name}</Text>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 5,
              justifyContent: 'space-between',
            }}
          >
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={Images.calendar}
                  style={{
                    width: 20,
                    height: 20,
                    marginRight: 6,
                    tintColor: '#000',
                  }}
                />
                <Text style={styles.date}>
                  {moment(event.dates?.start?.dateTime).format(
                    'DD MMM YYYY | h:mm A',
                  )}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 10,
                }}
              >
                <Image
                  source={Images.location}
                  style={{
                    width: 22,
                    height: 22,
                    marginRight: 6,
                    tintColor: '#000',
                  }}
                />
                <Text style={styles.location}>
                  {event.location || event._embedded?.venues?.[0]?.name}
                  {', '}
                  {event._embedded?.venues?.[0]?.city?.name
                    ? `${event._embedded.venues[0].city.name}, ${
                        event._embedded.venues[0].state?.stateCode || ''
                      }, ${
                        event._embedded.venues[0].country?.countryCode || ''
                      }`
                    : event.location}
                </Text>
              </View>
            </View>

            <View>
              <TouchableOpacity
                onPress={isFav ? removeEvent : saveEvent}
                style={{
                  borderWidth: 2,
                  borderColor: isFav ? 'red' : '#000',
                  padding: 8,
                  borderRadius: 10,
                }}
              >
                <Image
                  source={isFav ? Images.heartFilled : Images.heartOutline}
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: isFav ? 'red' : '#000',
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>

          <Text
            style={{
              fontSize: 20,
              fontFamily: Font.AsapBold,
              marginTop: 18,
              marginBottom: 8,
              color: '#000',
            }}
          >
            Description
          </Text>
          <Text style={styles.description}>
            {event.description || event.info}
          </Text>
        </View>
        {event._embedded?.venues?.[0]?.location?.latitude &&
          event._embedded?.venues?.[0]?.location?.longitude && (
            <View
              style={{
                borderRadius: 10,
              }}
            >
              <View
                style={{
                  height: FULL_HEIGHT / 5,
                  zIndex: 1,
                }}
              >
                {/* If you have react-native-maps installed, replace this Image with MapView below */}

                <MapView
                  style={{ flex: 1, padding: 20 }}
                  initialRegion={{
                    latitude: parseFloat(
                      event._embedded.venues[0].location.latitude,
                    ),
                    longitude: parseFloat(
                      event._embedded.venues[0].location.longitude,
                    ),
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                  }}
                  scrollEnabled={false}
                  zoomEnabled={false}
                  pitchEnabled={false}
                  rotateEnabled={false}
                >
                  <Marker
                    coordinate={{
                      latitude: parseFloat(
                        event._embedded.venues[0].location.latitude,
                      ),
                      longitude: parseFloat(
                        event._embedded.venues[0].location.longitude,
                      ),
                    }}
                    title={event._embedded.venues[0].name}
                  />
                </MapView>
              </View>

              <CustomButton
                variant="outlined"
                title="SHOW DIRECTION"
                onPress={() =>
                  openMapsApp(
                    parseFloat(event._embedded.venues[0].location.latitude),
                    parseFloat(event._embedded.venues[0].location.longitude),
                  )
                }
                style={{ width: FULL_WIDTH - 40, alignSelf: 'center' }}
              />
            </View>
          )}

        <CustomButton
          title="GET MORE DETAILS"
          onPress={() => Linking.openURL(event?.url)}
          style={{
            width: FULL_WIDTH - 40,
            alignSelf: 'center',
            marginBottom: 100,
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: FULL_HEIGHT / 3,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: Font.AsapBold,
    marginBottom: 30,
  },
  date: {
    fontFamily: Font.AsapMedium,
    fontSize: 14,
    color: '#888',
  },
  location: {
    fontFamily: Font.AsapMedium,
    fontSize: 15,
    color: '#888',
    width: FULL_WIDTH / 1.7,
  },
  description: {
    fontFamily: Font.AsapMedium,
    fontSize: 16,
    textAlign: 'left',
  },
});

export default EventDetailScreen;
