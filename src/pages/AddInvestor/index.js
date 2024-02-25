import React, {  useState } from 'react';
import {
    StyleSheet,
    Keyboard,
  } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { TextInput, Button, useTheme, Appbar } from 'react-native-paper';
import Container from '../../layout/Container';
import DropDown from "react-native-paper-dropdown";
import { useAuth } from '../../hooks/useAuth';
import { serverTimestamp } from "firebase/firestore"; 
import { saveInvestor, updateInvestor } from '../../components/User';

const AddInvestor = ({ navigation }) => {
  const { colors } = useTheme();
  const { user } = useAuth();
  const [showDropDown1, setShowDropDown1] = useState(false);
  const [showDropDown2, setShowDropDown2] = useState(false);
  const [showDropDown3, setShowDropDown3] = useState(false);
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
  const [name, setName] = useState('');
  const [pendanaan, setPendanaan] = useState('');
  const [contact, setContact] = useState('');

  const create = async () => {
    try {
      const updateStatus = await updateInvestor(user.uid, {
        name: name,
        provinsi : provinsi,
        sektorIndustri : sektorIndustri,
        modelBisnis : modelBisnis,
        pendanaan : pendanaan,
        contact : contact,
        updatedAt: serverTimestamp(),
      });
  
      if (updateStatus.error) {
        await saveInvestor (user.uid, {
          name: name,
          sektorIndustri : sektorIndustri,
          provinsi : provinsi,
          modelBisnis : modelBisnis,
          pendanaan : pendanaan,
          contact : contact,
          createdAt : serverTimestamp(),
        });
      };
    } catch(error) {
      console.log(error);
    };
  }

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
        <Appbar.Content title="Investor Registration" />
      </Appbar.Header>
      <ScrollView>
        <Container mt={8}>
          <TextInput
            label="Name"
            value={name}
            onChangeText={setName}
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
            label="Besaran Investasi"
            placeholder='20000000'
            keyboardType='numeric'
            value={pendanaan}
            onChangeText={setPendanaan}
            mode="outlined"
          />
          <TextInput
            label="Contact"
            placeholder='email or phone number'
            value={contact}
            onChangeText={setContact}
            mode="outlined"
          />

          <Button
            onPress={() => {
              create();
              navigation.navigate("MatchingPage", {
                matchName: name,
                matchsektorIndustri: sektorIndustri,
                matchprovinsi: sektorIndustri,
                matchModelBisnis: modelBisnis,
                matchPendanaan: pendanaan,
                matchprovinsi: provinsi,
                matchContact: contact,
                matchId: user.uid
              });
            }}
            mode="contained"
            style={styles.loginButton}
          >
            Add Investor
          </Button>
        </Container>
      </ScrollView>
    </>
  );
};

export default AddInvestor;

const styles = StyleSheet.create({
  scrolViewContent: { paddingBottom: 16, flexGrow: 1, },
  loginButton: { marginTop: 16, marginBottom: 10 },
});  