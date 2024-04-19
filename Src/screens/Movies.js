import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Image, StyleSheet } from 'react-native';
import axios from '../server/api'
import MovieItem from './components/MovieItem';
import { baseURL } from '../server/env';
function MoviesScreen() {
    const [movies, setMovies] = useState([
        {
            "Title": "Star Wars: Episode IV - A New Hope",
            "Year": "1977",
            "imdbID": "tt0076759",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg"
        },
        {
            "Title": "Star Wars: Episode V - The Empire Strikes Back",
            "Year": "1980",
            "imdbID": "tt0080684",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BYmU1NDRjNDgtMzhiMi00NjZmLTg5NGItZDNiZjU5NTU4OTE0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg"
        },
        {
            "Title": "Star Wars: Episode VI - Return of the Jedi",
            "Year": "1983",
            "imdbID": "tt0086190",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BOWZlMjFiYzgtMTUzNC00Y2IzLTk1NTMtZmNhMTczNTk0ODk1XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"
        }
    ]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // fetchMovies(); 
    }, []);
    const fetchData = async () => {
        const config = {
            baseURL: baseURL,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${''}`
              }
          }; 
          const moviesApi = axios(config); 
          moviesApi.get('/titles')
            .then(data => console.log(data))
            .catch(error => console.error(error));
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Movies List</Text>

            </View>
            <FlatList
                data={movies}
                keyExtractor={item => item.imdbID}
                renderItem={({ item }) => <MovieItem movie={item} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#874CCC',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    movieItem: {
        flexDirection: 'row',
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 8,
        overflow: 'hidden',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    poster: {
        width: 100,
        height: 150,
    },
    infoContainer: {
        padding: 10,
        justifyContent: 'center',
        flex: 1, // ensures the text container expands
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        flexWrap: 'wrap', // Allow the text to wrap within the container
    },
    year: {
        fontSize: 14,
        color: '#666',
    },
    type: {
        fontSize: 12,
        color: '#888',
        marginTop: 5,
    },
});

export default MoviesScreen;