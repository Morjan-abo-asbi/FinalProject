import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Button, Icon } from '@rneui/themed';
import { router } from 'expo-router';

export default function IndexPage() {
  const [language, setLanguage] = useState('en');
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
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

      {/* Language flag */}
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

      {/* Bottom Buttons - home history settings */}
      <View style={styles.bottomBar}>
        <Button
          icon={<Icon name="home" color="#fff" />}
          title={translations[language].home}
          titleStyle={{ marginLeft: 10 }}
          onPress={() => router.push('/')}
          buttonStyle={styles.navButton}
        />
        <Button
          icon={<Icon name="history" color="#fff" />}
          title={translations[language].history}
          titleStyle={{ marginLeft: 10 }}
          onPress={() => router.push('/history')}
          buttonStyle={styles.navButton}
        />
        <Button
          icon={<Icon name="settings" color="#fff" />}
          title={translations[language].settings}
          titleStyle={{ marginLeft: 10 }}
          onPress={() => router.push('/Drawer/Settings')}
          buttonStyle={styles.navButton}
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


});