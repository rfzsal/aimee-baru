import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { TextInput, Button, useTheme, Appbar } from 'react-native-paper';
import Container from '../../layout/Container';
import DropDown from "react-native-paper-dropdown";
import { updateDoc, doc } from "firebase/firestore";
import { db, fbStorage } from "../../../firebase";
import * as ImagePicker from "expo-image-picker";
import {ref,
  uploadBytesResumable,
  getDownloadURL } from "firebase/storage";
import Spinner from "react-native-loading-spinner-overlay/lib";

export default function UpdateDetail({ route, navigation }) {
    const { colors } = useTheme();
	const { item } = route.params;
	const id = item.id;
    const [name, setName] = useState(item.name);
    const [description, setDescription] = useState(item.description);
    const [location, setLocation] = useState(item.location);
    const [image, setImage] = useState(item.image);
    const [ukuranTim, setUkuranTim] = useState(item.ukuranTim);
    const [keahlian, setKeahlian] = useState(item.keahlian);
    const [pendanaan, setPendanaan] = useState(item.pendanaan);
    const [contact, setContact] = useState(item.contact);
    const [sektorIndustri, setSektorIndustri] = useState (item.sektorIndustri);
    const [provinsi, setProvinsi] = useState(item.provinsi);
    const [modelBisnis, setModelBisnis] = useState(item.modelBisnis);

    const [showDropDown1, setShowDropDown1] = useState(false);
    const [showDropDown2, setShowDropDown2] = useState(false);
    const [showDropDown3, setShowDropDown3] = useState(false);
    const [showDropDown4, setShowDropDown4] = useState(false);
    const [loading, setLoading] = useState(false);
    const ProvinsiList = [ 
      {label: 'Bali', value: 'Bali'},
      {label: 'Banten', value: 'Banten'},
      {label: 'Bengkulu', value: 'Bengkulu'},
      {label: 'DI Yogyakarta', value: 'DI Yogyakarta'},
      {label: 'DKI Jakarta', value: 'DKI Jakarta'},
      {label: 'Gorontalo', value: 'Gorontalo'},
      {label: 'Jambi', value: 'Jambi'},
      {label: 'Jawa Barat', value: 'Jawa Barat'},
      {label: 'Jawa Tengah', value: 'Jawa Tengah'},
      {label: 'Jawa Timur', value: 'Jawa Timur'},
      {label: 'Kalimantan Barat', value: 'Kalimantan Barat'},
      {label: 'Kalimantan Selatan', value: 'Kalimantan Selatan'},
      {label: 'Kalimantan Tengah', value: 'Kalimantan Tengah'},
      {label: 'Kalimantan Timur', value: 'Kalimantan Timur'},
      {label: 'Kalimantan Utara', value: 'Kalimantan Utara'},
      {label: 'Kepulauan Bangka Belitung', value: 'Kepulauan Bangka Belitung'},
      {label: 'Kepulauan Riau', value: 'Kepulauan Riau'},
      {label: 'Lampung', value: 'Lampung'},
      {label: 'Maluku', value: 'Maluku'},
      {label: 'Maluku Utara', value: 'Maluku Utara'},
      {label: 'Nanggroe Aceh Darussalam', value: 'Nanggroe Aceh Darussalam'},
      {label: 'Nusa Tenggara Barat', value: 'Nusa Tenggara Barat'},
      {label: 'Nusa Tenggara Timur', value: 'Nusa Tenggara Timur'},
      {label: 'Papua', value: 'Papua'},
      {label: 'Papua Barat', value: 'Papua Barat'},
      {label: 'Papua Barat Daya', value: 'Papua Barat Daya'},
      {label: 'Papua Pegunungan', value: 'Papua Pegunungan'},
      {label: 'Papua Selatan', value: 'Papua Selatan'},
      {label: 'Papua Tengah', value: 'Papua Tengah'},
      {label: 'Riau', value: 'Riau'},
      {label: 'Sulawesi Barat', value: 'Sulawesi Barat'},
      {label: 'Sulawesi Selatan', value: 'Sulawesi Selatan'},
      {label: 'Sulawesi Tenggara', value: 'Sulawesi Tenggara'},
      {label: 'Sulawesi Utara', value: 'Sulawesi Utara'},
      {label: 'Sumatera Barat', value: 'Sumatera Barat'},
      {label: 'Sumatera Selatan', value: 'Sumatera Selatan'},
      {label: 'Sumatera Utara', value: 'Sumatera Utara'},
    ];
    const sektorIndustriList = [
      {label: 'Agriculture', value: 'Agriculture'},
      {label: 'Aquaculture', value: 'Aquaculture'},
      {label: 'Beauty', value: 'Beauty'},
      {label: 'Blockchain', value: 'Blockchain'},
      {label: 'Consultant Services', value: 'Consultant Services'},
      {label: 'Digital Business Development', value: 'Digital Business Development'},
      {label: 'EduTech', value: 'EduTech'},
      {label: 'Electronic', value: 'Electronic'},
      {label: 'Farms', value: 'Farms'},
      {label: 'Fashion', value: 'Fashion'},
      {label: 'Fisheries', value: 'Fisheries'},
      {label: 'Food and Beverage', value: 'Food and Beverage'},
      {label: 'Food Processing', value: 'Food Processing'},
      {label: 'Graphic Design and Creative', value: 'Graphic Design and Creative'},
      {label: 'Green Technology', value: 'Green Technology'},
      {label: 'Herbs', value: 'Herbs'},
      {label: 'Hospitality', value: 'Hospitality'},
      {label: 'Internet', value: 'Internet'},
      {label: 'Open Journal System', value: 'Open Journal System'},
      {label: 'Petshop', value: 'Petshop'},
      {label: 'Production', value: 'Production'},
      {label: 'Retail', value: 'Retail'},
      {label: 'Services', value: 'Services'},
      {label: 'Sport & Music', value: 'Sport & Music'},
      {label: 'Technology and Information', value: 'Technology and Information'},
      {label: 'Textile', value: 'Textile'},
    ];
    const modelBisnisList = [
      {label: 'B2B', value: 'B2B'},
      {label: 'B2C', value: 'B2C'},
      {label: 'Hybrid B2B and B2C', value: 'Hybrid B2B and B2C'},
      {label: 'SaaS', value: 'SaaS'},
    ];
    const keahlianList = [
      {label: 'Teknologi dan Pengembangan Produk', value: 'Teknologi dan Pengembangan Produk'},
      {label: 'Pemasaran dan Strategi Penjualan', value: 'Pemasaran dan Strategi Penjualan'},
      {label: 'Manajemen Operasional dan Skalabilitas', value: 'Manajemen Operasional dan Skalabilitas'},
      {label: 'Kemitraan dan Pengembangan Bisnis', value: 'Kemitraan dan Pengembangan Bisnis'},
      {label: 'Keuangan dan Akuntansi', value: 'Keuangan dan Akuntansi'},
      {label: 'Hukum dan Regulasi', value: 'Hukum dan Regulasi'},
      {label: '-', value: '-'},
    ];

    const handleImageSelection = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });


        if (!result.canceled) {
            await uploadToFirebase(result.assets[0].uri);
        }
    };

    async function uploadToFirebase (uri) {
        const fetchResponse = await fetch(uri);
        const theBlob = await fetchResponse.blob();
        
        const imageRef = ref(fbStorage, `logos/` + new Date().getTime());
        
        const uploadTask = uploadBytesResumable(imageRef, theBlob);
        
        uploadTask.on(
            "state_changed",
            (snapshot) => {
            const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            setLoading(true);
            },
            (error) => {
            // Handle unsuccessful uploads
            console.log(error);
            },
            () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            setImage (downloadURL);
            window.alert("Upload completed successfully!");
            setLoading(false);
            });
            }
        );
    };

	const onUpdate = async () => {
		try {
      setLoading(true);
			await updateDoc(doc(db, "StartupList", id), {
                name: name,
                description: description,
                location: location,
                sektorIndustri : sektorIndustri,
                provinsi : provinsi,
                ukuranTim : ukuranTim,
                modelBisnis : modelBisnis,
                keahlian : keahlian,
                pendanaan : pendanaan,
                image : image,
                contact : contact,
                updatedAt: new Date(),
            });
			alert("Update Successful");
      setLoading(false);
		} catch (error) {
			alert("Error Updating Data");
		}
		navigation.navigate("Startup");
	};

    return (
        <>
          <Appbar.Header
            style={{
              backgroundColor: colors.surface,
            }}
          >
            <Appbar.BackAction
              onPress={() => {
                navigation.goBack();
              }}
            />
            <Appbar.Content title="Update Data" />
          </Appbar.Header>
          <ScrollView>
            <Container mt={8}>
              <TextInput
                label="Startup Name"
                value={name}
                onChangeText={setName}
                mode="outlined"
              />
              <TextInput
                label="Startup Description"
                multiline={true}
                value={description}
                onChangeText={setDescription}
                mode="outlined"
              />
              <TextInput
                label="Startup Location"
                value={location}
                onChangeText={setLocation}
                mode="outlined"
              />
              <DropDown
                label={"Provinces"}
                mode={"outlined"}
                visible={showDropDown1}
                showDropDown={() => setShowDropDown1(true)}
                onDismiss={() => setShowDropDown1(false)}
                value={provinsi}
                setValue={setProvinsi}
                list={ProvinsiList}
              />
              <DropDown
                label={"Industry Sector"}
                mode={"outlined"}
                visible={showDropDown2}
                showDropDown={() => setShowDropDown2(true)}
                onDismiss={() => setShowDropDown2(false)}
                value={sektorIndustri}
                setValue={setSektorIndustri}
                list={sektorIndustriList}
              />
              <TextInput
                label="Team Size"
                placeholder='10'
                keyboardType="numeric"
                value={ukuranTim}
                onChangeText={setUkuranTim}
                mode="outlined"
              />
              <DropDown
                label={"Business Model"}
                mode={"outlined"}
                visible={showDropDown3}
                showDropDown={() => setShowDropDown3(true)}
                onDismiss={() => setShowDropDown3(false)}
                value={modelBisnis}
                setValue={setModelBisnis}
                list={modelBisnisList}
              />
              <TextInput
                label="Required Funds"
                placeholder='20000000'
                keyboardType="numeric"
                defaultValue={pendanaan}
                onChangeText={setPendanaan}
                mode="outlined"
              />
              <DropDown
                label={"Required Talent"}
                mode={"outlined"}
                visible={showDropDown4}
                showDropDown={() => setShowDropDown4(true)}
                onDismiss={() => setShowDropDown4(false)}
                value={keahlian}
                setValue={setKeahlian}
                list={keahlianList}
              />
              <TextInput
                label="Contact"
                placeholder='Email, Phone Number or Social Media'
                defaultValue={contact}
                onChangeText={setContact}
                mode="outlined"
              />
              <Button
                onPress={handleImageSelection}
                mode="contained"
                style={styles.loginButton}
              >
                Upload Logo
              </Button>
              <Button
                onPress={onUpdate}
                mode="contained"
                style={styles.loginButton}
              >
                Update Data
              </Button>
            </Container>
          </ScrollView>
          {loading && <Spinner visible />}
        </>
      );
}

const styles = StyleSheet.create({
    scrolViewContent: { paddingBottom: 16, flexGrow: 1, },
    loginButton: { marginTop: 16, marginBottom: 10 },
});  
