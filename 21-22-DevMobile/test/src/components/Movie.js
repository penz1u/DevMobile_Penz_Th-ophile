import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, ScrollView, Image, Button } from 'react-native';
import { connect } from 'react-redux';

import DisplayError from '../components/DisplayError';

import { getMovieDetails } from '../api/zomato';

import Colors from '../definitions/Colors';
import Assets from '../definitions/Assets';

const Movie = ({route}) => {

  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    requestMovie();
  }, []); // Uniquement à l'initialisation

  // Pourrait être directement déclarée dans useEffect
  const requestMovie = async () => {
    try {
      const zomatoMovieResult = await getMovieDetails(route.params.MovieID);
      setMovie(zomatoMovieResult);
      console.log("film est");
      console.log(Movie);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
    }
  }


  return (
    <View style={styles.container}>
      {isError ?
        (<DisplayError message='Impossible de récupérer les données du film' />) :
        (isLoading ?
          (<View style={styles.containerLoading}>
            <ActivityIndicator size="large" />
          </View>) :
          (<ScrollView style={styles.containerScroll}>
            <View style={styles.containerCardTop}>
              <Text>title {movie.title}</Text>
            </View>
            <View style={styles.containerCardTop}>
              <Text>Release {movie.release_date}</Text>
            </View>
            <View style={styles.containerCardTop}>
              <Text>Genre   {movie.genre_ids} </Text>
            </View>
            <View style={styles.containerCardTop}>
              <Text>Runtime {movie.genre_ids}</Text>
            </View>
            <View style={styles.containerCardTop}>
              <Text>Cast</Text>
            </View>
            <View style={styles.containerCardTop}>
              <Text>Overview  {movie.overview}</Text>
            </View>
          </ScrollView>)
        )}
    </View>
  );
};

export default Movie;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerScroll: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  containerCardTop: {
    elevation: 1,
    borderRadius: 3,
    padding: 12,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  containerCardBottom: {
    elevation: 1,
    marginTop: 16,
    borderRadius: 3,
    padding: 12,
    backgroundColor: 'white',
  },
  containerNoMovieImage: {
    height: 128,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    backgroundColor: 'white',
  },
  MovieImage: {
    height: 180,
    backgroundColor: Colors.mainGreen,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  containerEstab: {
    flex: 4,
  },
  containerNoteAndVotes: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerNote: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 3,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  textNote: {
    color: 'white',
    fontWeight: "bold",
    fontSize: 16,
  },
  textMaxNote: {
    fontSize: 12,
    marginLeft: 3,
    color: 'white',
  },
  textVotes: {
    fontStyle: "italic",
    fontSize: 12,
  },
  textName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  textTitle: {
    fontWeight: 'bold',
    color: Colors.mainGreen,
    fontSize: 16,
    marginTop: 16,
  },
  textContent: {
    fontSize: 16,
  },
});