import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const MovieItem = ({ movie }) => {
    return (
        <View style={styles.movieItem}>
            <Image source={{ uri: movie.Poster }} style={styles.poster} />
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{movie.Title}</Text>
                <Text style={styles.year}>{movie.Year}</Text>
                <Text style={styles.type}>{movie.Type}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
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
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        flexWrap: 'wrap',
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

export default MovieItem;
