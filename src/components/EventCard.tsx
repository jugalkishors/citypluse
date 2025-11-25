import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Images from '../utils/ImageConstants';
import moment from 'moment';
import { FULL_WIDTH, getHeight } from '../utils/constants';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation';
import Font from '../assets/fonts';

interface IEventCard {
  event: any;
  index?: number;
}

const EventCard = ({ event, index = 0 }: IEventCard) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <TouchableOpacity
      key={index}
      activeOpacity={0.9}
      onPress={() => navigation.navigate('EventDetail', { event: event })}
    >
      <ImageBackground
        source={{
          uri: event?.images
            ? event?.images[0]?.url
            : 'https://via.placeholder.com/300x200',
        }}
        style={styles.eventImageBackground}
        imageStyle={styles.eventImage}
      >
        <ImageBackground
          source={Images.cardBg}
          style={styles.cardBg}
          imageStyle={styles.cardBgImage}
        >
          <Text numberOfLines={2} style={styles.eventTitle}>
            {event?.name}
          </Text>
          <View
            style={[styles.eventInfoRow, { justifyContent: 'space-between' }]}
          >
            <View style={styles.eventInfoRow}>
              <Image
                source={Images.calendar}
                style={styles.eventIcon}
                resizeMode="contain"
              />
              <Text style={styles.eventInfoText}>
                {moment(event?.dates?.start?.dateTime).format(
                  'DD MMM YYYY | h:mm a',
                )}
              </Text>
            </View>

            <View style={[styles.eventInfoRow]}>
              <Image
                source={Images.location}
                style={styles.eventLocationIcon}
                resizeMode="contain"
              />
              <Text
                numberOfLines={2}
                style={[styles.eventInfoText, { width: FULL_WIDTH / 3 }]}
              >
                {`${event?._embedded?.venues?.[0]?.city?.name}, ${
                  event?._embedded?.venues?.[0].state?.stateCode || ''
                }, ${
                  event?._embedded?.venues?.[0]?.country?.countryCode || ''
                }`}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  eventImageBackground: {
    height: getHeight(190),
    borderRadius: 16,
    marginTop: 16,
    marginBottom: 8,
    justifyContent: 'flex-end',
  },
  eventImage: {
    borderRadius: 16,
  },
  cardBg: {
    padding: 5,
    paddingHorizontal: 10,
    minHeight: getHeight(80),
  },
  cardBgImage: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  eventTitle: {
    fontFamily: Font.AsapBold,
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
  },
  eventInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventIcon: {
    width: 18,
    height: 18,
    marginRight: 6,
  },
  eventLocationIcon: {
    width: 18,
    height: 18,
    // marginLeft: 16,
    // marginRight: 6,
  },
  eventInfoText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: Font.AsapMedium,
    // marginRight: 8,
  },
});

export default EventCard;
