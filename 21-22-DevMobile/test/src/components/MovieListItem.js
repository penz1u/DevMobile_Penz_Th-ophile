import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';

import Assets from '../definitions/Assets';
import Colors from '../definitions/Colors';

const MovieListItem = ({ onClick, movieData }) => {
    
    // Later
  const getThumbnail = () => {
    if (movieData.backdrop_path) {
      return (
        <Image style={styles.thumbnail} source={{ uri: movieData.backdrop_path }} />
      );
    };
    return (
      <View style={styles.noThumbnailContainer}>
        <Image source={Assets.icons.missingIMG} />
      </View>
    );
  };

  // List des éléments
  return (
    <TouchableOpacity style={styles.container}
      onPress={() => { onClick(movieData.id) }}>
      {getThumbnail()}
      <View style={styles.informationContainer}>
        <Text>
            {movieData.title}
        </Text>
        <Text>
            {movieData.vote_average}
        </Text>
        <Text>
            {movieData.release_date}
        </Text>
        <Text>
            {movieData.overview}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default MovieListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  informationContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: 12,
  },
  statContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  noThumbnailContainer: {
    width: 128,
    height: 128,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnail: {
    width: 128,
    height: 128,
    borderRadius: 12,
    backgroundColor: Colors.mainGreen,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  data: {
    fontSize: 16,
  },
  cuisine: {
    fontStyle: 'italic',
  },
  icon: {
    tintColor: Colors.mainGreen,
  },
  stat: {
    marginLeft: 4,
  },
});