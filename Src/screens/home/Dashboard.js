import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../Context/ThemeContext';
import { Button } from 'native-base';
function Dashboard({ navigation }) {
    const { theme, toggleTheme } = useTheme();
    const styles = getStyles(theme);
 return (
    <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.headerText}>Dashboard</Text>  
    <TouchableOpacity onPress={toggleTheme}>
         <Ionicons name={theme === 'dark' ? "moon" : "moon-outline"} size={20} color="white" />
     </TouchableOpacity>
     </View>

     <View style={{margin:40}}> 
     <Button style={{height:100}} mt="2" colorScheme="indigo" onPress={() => navigation.navigate('Todos')}>Todo</Button> 
     <Button style={{height:100,marginTop:20}} mt="2" colorScheme="indigo" onPress={() => navigation.navigate('Movies')}>Movies</Button>
     </View>

    </View>
    );
}

const getStyles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme === 'dark' ? '#333' : '#fff',
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#333',
    }, 
});

export default Dashboard;
