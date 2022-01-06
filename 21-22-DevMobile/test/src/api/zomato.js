const API_KEY = 'f60dc1588d1b92e483f83fa137b9f5ab';
const LONDON_ID = '61';


/*export async function getMovies(searchTerm = '', offset = 0) {
  try {
    const myHeaders = new Headers({ 'user-key': API_KEY });
    const url = `https://developers.zomato.com/api/v2.1/search?`;
    const response = await fetch(url, { headers: myHeaders });
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(`Error with function getRestaurants ${error.message}`);
    throw error;
  }
};*/


export async function getMovies(searchTerm = '', offset = 0) {
  try {
    let response;
    switch (offset) {
      case 0:
        console.log('0');
        response = require('../helpers/PopularMovies_p1.json');
        break;
      case 20:
        console.log('20');
        response = require('../helpers/PopularMovies_p2.json');
        break;
      default:
        console.log("default");
        response = require('../helpers/PopularMovies_p1.json');
    }
    // To do search how to filter
    if(searchTerm != '')response = response.results.filter(x => x.original_title === searchTerm);
    // It is possible to remove the filter if searchTerm is empty
    return response;
  } catch (error) {
    console.log(`Error with function getMovies ${error.message}`);
    throw error;
  }
};

//I don't know why movieID is undefined
export async function getMovieDetails(movieID=634649) {
  try {
    let response;
    console.log('0');
    response = require('../helpers/PopularMovies_p1.json');

    // To get the right Movie
    //console.log(response.results);
    response = response.results.filter(x => x.id === movieID);
    console.log(movieID);
    console.log(response);
    return response;
  } catch (error) {
    console.log(`Error with function getMovies ${error.message}`);
    throw error;
  }
};

