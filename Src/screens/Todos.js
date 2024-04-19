import React from 'react';
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../Context/ThemeContext';
import { deleteTodo } from '../Redux/slices/todoSlice';
import TodoInput from './components/TodoInput';

function Todos() { 
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };
 

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity >
        <Text style={[styles.itemText, item.completed && styles.itemCompleted]}>
          {item.text}
        </Text>
      </TouchableOpacity>
      <Button
        title="Delete"
        onPress={() => handleDelete(item.id)}
        color="#ff6347"
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Todos List</Text>  
      </View>
      <TodoInput />
      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
}

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme === 'dark' ? '#333' : '#FFF',
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
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 18,
    color: theme === 'dark' ? '#fff' : '#000',
  },
  itemCompleted: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  }, 
});

export default Todos;
