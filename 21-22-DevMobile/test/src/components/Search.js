import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, FlatList, Keyboard } from 'react-native';

import MovieListItem from '../components/MovieListItem';
import DisplayError from '../components/DisplayError';

import Colors from '../definitions/Colors';

import { getMovies } from '../api/zomato';

const Search = ({ navigation }) => {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [nextOffset, setNextOffset] = useState(0);
  const [isMoreResults, setIsMoreResults] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isError, setIsError] = useState(false);

  const requestMovies = async (prevMovies, offset) => {
    setIsRefreshing(true);
    setIsError(false);
    try {
      const zomatoSearchResult = await getMovies(searchTerm, offset);
      setMovies([...prevMovies, ...zomatoSearchResult.results]);
      if (zomatoSearchResult.page ) {
        setIsMoreResults(true);
        setNextOffset(zomatoSearchResult.results_start + zomatoSearchResult.results_shown);
      } else {
        setIsMoreResults(false);
      }
    } catch (error) {
      setIsError(true);
      setMovies([]);
      setIsMoreResults(true);
      setNextOffset(0);
    }
    setIsRefreshing(false);
  };

  const searchMovies = () => {
    Keyboard.dismiss();
    requestMovies([], 0);
  };

  const loadMoreMovies = () => {
    if (isMoreResults) {
      requestMovies(movies, nextOffset);
    };
  };

  const navigateToMovieDetails = (id) => {
    navigation.navigate("ViewMovie", {
      MovieId : id
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder='Nom du film'
          style={styles.inputMovieName}
          onChangeText={(text) => setSearchTerm(text)}
          onSubmitEditing={searchMovies}
        />
        <Button
          title='Rechercher'
          color={Colors.mainGreen}
          onPress={searchMovies}
        />
      </View>
      {
        isError ?
        (<DisplayError message='Impossible de récupérer les films' />) :
        (<FlatList 
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <MovieListItem movieData={item} onClick={() => navigateToMovieDetails(item.id)} />
          )}
          onEndReached={loadMoreMovies}
          onEndReachedThreshold={0.5}
          refreshing={isRefreshing}
          onRefresh={searchMovies}
        />)
      }
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    marginTop: 16,
  },
  searchContainer: {
    marginBottom: 16,
  },
  inputMovieName: {
    marginBottom: 8,
  },
});