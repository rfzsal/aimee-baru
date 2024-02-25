import {
  setStatusBarBackgroundColor,
  setStatusBarStyle,
} from 'expo-status-bar';
import { useEffect, useState, } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useTheme, TextInput, Appbar } from 'react-native-paper';

import MITRA from '../../_DATA/mitra.json';
import Container from '../../layout/Container';
import MitraList from '../../views/Mitra/MitraList';


const Search = () => {
  const { colors } = useTheme();
  return (
    <Container mt={8} mb={16}>
      <TextInput
        placeholder="Search activity..."
        left={
          <TextInput.Icon
            name="magnify"
            color={colors.disabled}
            rippleColor={colors.background}
            style={styles.searchIcon}
          />
        }
        mode="outlined"
        style={{ backgroundColor: colors.surface }}
      />
    </Container>
  );
};

const Mitra = ({ navigation }) => {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMitras, setFilteredMitras] = useState(MITRA);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setStatusBarBackgroundColor(colors.surface);
      setStatusBarStyle('dark');
    });

    // Filter mitras every time searchQuery changes
    setFilteredMitras(
      MITRA.filter(mitra =>
        mitra.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

    return unsubscribe;
  }, [navigation, searchQuery]); // Add searchQuery to the dependency array

  const handleSearchChange = query => {
    setSearchQuery(query);
  };

  return (
    <>
      <Appbar.Header style={{ backgroundColor: colors.surface }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Mitra" />
      </Appbar.Header>

      <ScrollView style={{ backgroundColor: colors.surface }} contentContainerStyle={styles.scrollViewContent}>
        <Container mt={8} mb={16}>
          <TextInput
            placeholder="Search activity..."
            value={searchQuery}
            onChangeText={handleSearchChange}
            left={<TextInput.Icon name="magnify" />}
            mode="outlined"
            style={{ backgroundColor: colors.surface }}
          />
        </Container>
        <MitraList mitras={filteredMitras} />
      </ScrollView>
    </>
  );
};



export default Mitra;

const styles = StyleSheet.create({
  searchIcon: { top: 2 },
  scrolViewContent: { paddingBottom: 16 },
});
