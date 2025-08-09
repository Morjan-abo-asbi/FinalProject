import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Button, Icon } from '@rneui/themed';
import { router } from 'expo-router';
import { TextInput } from 'react-native'; 

export default function IndexPage() {
  const [language, setLanguage] = useState('en');
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [birthDate, setBirthDate] = useState('');




const handleSubmit = () => {
  const userData = {
    phoneNumber,
    firstName,
    lastName,
    birthDate,
  };

  console.log('Submitting:', userData);
  // Later: send to backend
};
   //// translation  words
  const translations = {
    en: {
      signup: 'Sign Up',
      list: 'List',
      contact: 'Contact',
      home: 'Home',
      history: 'History',
      settings: 'Settings',
    },
    he: {
      signup: 'הרשמה',
      list: 'רשימה',
      contact: 'צור קשר',
      home: 'בית',
      history: 'היסטוריה',
      settings: 'הגדרות',
    },
  };

  return (
  <View style={styles.container}>
    {/* Language Button */}
    <View style={styles.langWrapper}>
      <TouchableOpacity style={styles.langButton} onPress={() => setShowLanguageMenu(true)}>
        <Icon name="language" color="#fff" size={24} />
      </TouchableOpacity>
    </View>

    {/* Language Modal */}
    <Modal visible={showLanguageMenu} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={() => { setLanguage('en'); setShowLanguageMenu(false); }}>
            <Text style={styles.modalText}>🇬🇧 English</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { setLanguage('he'); setShowLanguageMenu(false); }}>
            <Text style={styles.modalText}>🇮🇱 עברית</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>

    {/* 👇 ADD FORM HERE 👇 */}
    <View style={{ marginTop: 100, paddingHorizontal: 20 }}>
      <TextInput
        style={styles.input}
        placeholder={language === 'en' ? 'Phone Number' : 'מספר טלפון'}
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <TextInput
        style={styles.input}
        placeholder={language === 'en' ? 'First Name' : 'שם פרטי'}
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder={language === 'en' ? 'Last Name' : 'שם משפחה'}
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder={language === 'en' ? 'Birth Date (YYYY-MM-DD)' : 'תאריך לידה'}
        value={birthDate}
        onChangeText={setBirthDate}
      />

      <Button
        title={language === 'en' ? 'Submit' : 'שלח'}
        onPress={handleSubmit}
        buttonStyle={{ marginTop: 20, backgroundColor: '#3b6bab', borderRadius: 10 }}
      />
    </View>

   
  </View>
);
}

const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: '#fff',
  position: 'relative',
},
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    width: 150,
  },

  
  modalText: {
    fontSize: 18,
    paddingVertical: 10,
    textAlign: 'center',
  },
 bottomBar: {
  position: 'absolute',
  bottom: 50,
  left: 0,
  right: 0,
  flexDirection: 'row',
  justifyContent: 'space-around',
  paddingVertical: 20,
  backgroundColor: '#fff',
  borderTopWidth: 1,
  borderColor: '#fff',
},
  navButton: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 8,
    backgroundColor: '#1e252eff',
  },
  langWrapper: {
  position: 'absolute',
  top: 20,
  left: 20,
  zIndex: 10,
},
//langauge button
langButton: {
  backgroundColor: '#3b6bab',
  padding: 10,
  borderRadius: 10,
},

input: {
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 8,
  padding: 12,
  marginBottom: 15,
  backgroundColor: '#f9f9f9',
}
});