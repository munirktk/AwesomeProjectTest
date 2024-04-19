import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { addTodo } from '../../Redux/slices/todoSlice'; 
import { useTheme } from '../../Context/ThemeContext';

function TodoInput() {
    const [input, setInput] = useState('');
    const dispatch = useDispatch();
    const { theme } = useTheme();
    const styles = getStyles(theme);
    const handleAddTodo = () => {
      if (input.trim()) {
        dispatch(addTodo(input));
        setInput(''); 
      }
    };
  
    return (
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new todo..."
          placeholderTextColor='gray'
          value={input}
          onChangeText={setInput}
          onSubmitEditing={handleAddTodo}
        />
        <Button 
          title="Add"
          onPress={handleAddTodo}
          color="#007BFF" 
        />
      </View>
    );
  }
  const getStyles = (theme) => StyleSheet.create({
    inputContainer: {
      flexDirection: 'row',
      padding: 10,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    input: {
      flex: 1,
      marginRight: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      borderRadius: 5,
      color: theme === 'dark' ? '#fff' : '#000',
    },
  });
  export default TodoInput;
