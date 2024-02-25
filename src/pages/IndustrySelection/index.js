import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'; // pastikan untuk menginstal @react-navigation/native jika belum terinstal
import firebase from 'firebase/app';
import 'firebase/firestore';
import { updateDoc, doc } from "firebase/firestore";
import { db, fbStorage } from "../../../firebase";

// Dapatkan pengguna saat ini


const IndustrySelection = () => {
  const [sectors, setSectors] = useState([
    'Agriculture', 'Aquaculture', 'Beauty', 'Blockchain', 'Consultant Services', 
    'Digital Business Development', 'EduTech', 'Electronic', 'Farms', 'Fashion',
    'Fisheries', 'Green Technology', 'Food and Beverage', 'Food Processing',
    'Graphic Design and Creative', 'Herbs', 'Hospitality', 'Internet', 'Petshop',
    'Open Journal System', 'Production', 'Retail', 'Textile', 'Services',
    'Sport & Music', 'Technology and Information'
    // ... include all sectors here
  ]);
  
  const [selectedSectors, setSelectedSectors] = useState([]);
  

  const handleSelectSector = (sector) => {
    setSelectedSectors(prevSelectedSectors => {
      if (prevSelectedSectors.includes(sector)) {
        return prevSelectedSectors.filter(s => s !== sector);
      } else if (prevSelectedSectors.length < 3) {
        return [...prevSelectedSectors, sector];
      } else {
        return prevSelectedSectors;
      }
    });
  };

  const handleSubmit = async () => {
    if (selectedSectors.length < 3) {
      alert('Please select 3 sectors.');
      return;
    }
    try {
      // Dapatkan referensi ke dokumen pengguna berdasarkan ID pengguna yang sedang login
      const userRef = firebase.firestore().collection('users').doc(currentUser.uid);

      // Update profil pengguna dengan sektor yang dipilih
      setLoading(true);
			await updateDoc(doc(db, "users", id), {sektorIndustri : sektorIndustri});

      // Berpindah ke halaman home
      navigation.navigate('Home'); // Sesuaikan 'Home' dengan nama route halaman home Anda
    } catch (error) {
      console.error("Error saving to Firestore: ", error);
      alert('There was an error saving your preferences.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Industry Sector</Text>
      <Text style={styles.subtitle}>Add your preferred industry sector so we can recommend startups that suit you</Text>
      <Text style={styles.counter}>{selectedSectors.length}/3</Text>
      <FlatList
        data={sectors}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.sectorButton,
              selectedSectors.includes(item) && styles.selectedButton
            ]}
            onPress={() => handleSelectSector(item)}
          >
            <Text style={styles.sectorButtonText}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item}
        numColumns={2}
        contentContainerStyle={{ alignItems: 'flex-start' }}
      />
      <Button mode="contained" onPress={handleSubmit} style={styles.nextButton}>
        NEXT
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40, // Adjust the top margin to align with your design
    paddingHorizontal: 20, // Side padding to align the content
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center', // Ensure title is centered
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 16,
    textAlign: 'center',
  },
  counter: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center', // Ensure counter is centered
  },
  sectorButton: {
    flexGrow: 1,
    margin: 5,
    paddingVertical: 15, // Vertical padding to increase the touch area
    paddingHorizontal: 5, // Horizontal padding to keep content from the edges
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20,
    justifyContent: 'center', // Center the text vertically
    minHeight: 50, // Minimum height for wrapping text
  },
  selectedButton: {
    backgroundColor: 'green',
  },
  sectorButtonText: {
    textAlign: 'center',
  },
  nextButton: {
    backgroundColor: '#34A853', // Updated color to match the screenshot
    borderRadius: 25, // Match button roundness to the screenshot
    marginVertical: 20, // Add vertical margin for spacing
    paddingVertical: 10, // Vertical padding for button size
    width: '100%', // Full width button
  },
});

export default IndustrySelection;
