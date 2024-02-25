import {
  setStatusBarBackgroundColor,
  setStatusBarStyle,
} from 'expo-status-bar';
import { useEffect, useState, } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useTheme, TextInput, Appbar } from 'react-native-paper';

import MENTOR from '../../_DATA/mentor.json';
import Container from '../../layout/Container';
import MentorList from '../../views/Mentor/MentorList';

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

const Mentor = ({ navigation }) => {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMentors, setFilteredMentors] = useState(MENTOR);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setStatusBarBackgroundColor(colors.surface);
      setStatusBarStyle('dark');
    });

    // Filter mentors every time searchQuery changes
    setFilteredMentors(
      MENTOR.filter(mentor =>
        mentor.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

    return unsubscribe;
  }, [navigation, searchQuery]);

  const handleSearchChange = query => {
    setSearchQuery(query);
  };

  return (
    <>
      <Appbar.Header
        style={{
          backgroundColor: colors.surface,
        }}
      >
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Mentor" />
      </Appbar.Header>

      <ScrollView
        style={{ backgroundColor: colors.surface }}
        contentContainerStyle={styles.scrollViewContent}
      >
        <Container mt={8} mb={16}>
          <TextInput
            placeholder="Search Mentor"
            value={searchQuery}
            onChangeText={handleSearchChange}
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
        <MentorList mentors={filteredMentors} />
      </ScrollView>
    </>
  );
};

export default Mentor;

const styles = StyleSheet.create({
  searchIcon: { top: 2 },
  scrolViewContent: { paddingBottom: 16 },
});
