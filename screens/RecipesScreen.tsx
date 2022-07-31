import React, {useState} from 'react';
import {View, Text} from 'react-native';
import Recipe from '../beans/Recipe';
import Header from '../components/Header';
import styles from './ScreenStyles';

export default function RecipesScreen({navigation}: any) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  return (
    <View style={styles.container}>
      <Header title="Recipes" />
      {/* {recipes.length > 0 ? (
        <FlatList
          data={recipes}
          renderItem={({item}) => (
            <Text>{item.title}</Text>
            // <ListItem item={item} completeReminder={completeReminder} />
          )}
        />
      ) : (
        <View style={styles.noItemsContainer}>
          <Text style={styles.noItemsText}>No Recipes</Text>
        </View>
      )} */}
    </View>
  );
}
