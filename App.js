import * as React from 'react';
import {
  StyleSheet,
  ScrollView,
  Dimensions,
  Animated,
  Image,
} from 'react-native';
import { Video } from 'expo-av';

const width = Dimensions.get('window').width;

const videos = [
  {
    url: 'https://assets.mixkit.co/videos/preview/mixkit-portrait-of-a-fashion-woman-with-silver-makeup-39875-large.mp4',
    poster: '/Users/vehbikaraagac/Desktop/HomeReelz/data/videoframe_1.png',
  },
  {
    url: 'https://assets.mixkit.co/videos/preview/mixkit-man-under-multicolored-lights-1237-large.mp4',
    poster: '/Users/vehbikaraagac/Desktop/HomeReelz/data/videoframe_2.png',
  },
  {
    url: 'https://assets.mixkit.co/videos/preview/mixkit-father-and-his-little-daughter-eating-marshmallows-in-nature-39765-large.mp4',
    poster: '/Users/vehbikaraagac/Desktop/HomeReelz/data/videoframe_3.png',
  },
];

const resizeMode = 'cover';

export default function App() {
  const [index, setIndex] = React.useState(0);
  const opacity = React.useRef(new Animated.Value(1)).current;
  const onMomentumScrollEnd = ({ nativeEvent }) => {
    const newIndex = nativeEvent.contentOffset.x / width;
    if (newIndex !== index && newIndex < videos.length && newIndex >= 0) {
      opacity.setValue(0);
      setIndex(newIndex);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      horizontal
      pagingEnabled
      disableIntervalMomentum
      showsHorizontalScrollIndicator={false}
      onMomentumScrollEnd={onMomentumScrollEnd}
    >
      {videos.map((i) => (
        <Image
          resizeMode={resizeMode}
          style={styles.item}
          source={{ uri: i.poster }}
        />
      ))}
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          { width, left: index * width, opacity },
        ]}
      >
        <Video
          resizeMode={resizeMode}
          style={styles.video}
          source={{ uri: videos[index].url }}
          shouldPlay
          isLooping
          isMuted
          onReadyForDisplay={() => opacity.setValue(1)}
        />
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  item: {
    height: '100%',
    width,
    overflow: 'hidden',
  },
  video: { flex: 1 },
});
