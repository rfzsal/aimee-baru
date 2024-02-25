import React, { useState } from 'react';
import {
    StyleSheet,
    Keyboard,
  } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { TextInput, Button, useTheme, Appbar } from 'react-native-paper';
import { collection, addDoc, updateDoc } from "firebase/firestore"; 
import { db, fbStorage } from '../../../firebase';
import Container from '../../layout/Container';
import DropDown from "react-native-paper-dropdown";
import * as ImagePicker from "expo-image-picker";
import {ref,
  uploadBytesResumable,
  getDownloadURL } from "firebase/storage";
import Spinner from 'react-native-loading-spinner-overlay/lib';

const AddStartup = ({ navigation }) => {
  const { colors } = useTheme();
  const [ loading, setLoading ] = useState(false);
  const [showDropDown1, setShowDropDown1] = useState(false);
  const [showDropDown2, setShowDropDown2] = useState(false);
  const [showDropDown3, setShowDropDown3] = useState(false);
  const [showDropDown4, setShowDropDown4] = useState(false);
  const [sektorIndustri, setSektorIndustri] = useState (null);
  const [provinsi, setProvinsi] = useState(null);
  const [modelBisnis, setModelBisnis] = useState(null);
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
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState('');
  const [ukuranTim, setUkuranTim] = useState('');
  const [keahlian, setKeahlian] = useState('');
  const [pendanaan, setPendanaan] = useState('');
  const [contact, setContact] = useState('');

  const collectionRef = collection(db, "StartupList");

  const data = {
    name: name,
    description: description,
    provinsi : provinsi,
    location: location,
    sektorIndustri: sektorIndustri,
    ukuranTim: ukuranTim,
    modelBisnis: modelBisnis,
    keahlian: keahlian,
    pendanaan: pendanaan,
    image: image,
    contact: contact,
  };

  function create () {
    setLoading(true);
    addDoc(collectionRef, data)
  .then((docRef) => {
    const id = docRef.id;
    const updatedData = { ...data, id: id };
    return updateDoc(docRef, updatedData);
  }).then(() => {
      setName('');
      setDescription('');
      setProvinsi('');
      setLocation('');
      setSektorIndustri('');
      setUkuranTim('');
      setModelBisnis('');
      setKeahlian('');
      setPendanaan('');
      setImage('');
      setContact('');
      Keyboard.dismiss;
      window.alert("Data Submitted Successfully!");
      setLoading(false);
    }).catch((error) => {
      window.alert('Error submitting your data. Please try again.');
    });
  }

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
        <Appbar.Content title="Startup Registration" />
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
            value={description}
            onChangeText={setDescription}
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
          <TextInput
            label="Startup Location"
            value={location}
            onChangeText={setLocation}
            mode="outlined"
          />
          <DropDown
            label={"Industres Sector"}
            mode={"outlined"}
            visible={showDropDown2}
            showDropDown={() => setShowDropDown2(true)}
            onDismiss={() => setShowDropDown2(false)}
            value={sektorIndustri}
            setValue={setSektorIndustri}
            list={sektorIndustriList}
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
            label="Team Size"
            placeholder='10'
            keyboardType="numeric"
            value={ukuranTim}
            onChangeText={setUkuranTim}
            mode="outlined"
          />
          <TextInput
            label="Required Funds"
            placeholder='20000000'
            keyboardType="numeric"
            value={pendanaan}
            onChangeText={setPendanaan}
            mode="outlined"
          />
          <DropDown
            label={"Required Talents"}
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
            placeholder='email, phone number or social media'
            value={contact}
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
            onPress={create}
            mode="contained"
            style={styles.loginButton}
          >
            Add Startup
          </Button>
        </Container>
      </ScrollView>
      {loading && <Spinner visible />}
    </>
  );
};

export default AddStartup;

const styles = StyleSheet.create({
  scrolViewContent: { paddingBottom: 16, flexGrow: 1, },
  loginButton: { marginTop: 16, marginBottom: 10 },
});