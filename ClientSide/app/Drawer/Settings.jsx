import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Modal } from 'react-native';
import { Button, Icon } from '@rneui/themed';
import { useRouter } from 'expo-router'; 

export default function SettingsPage() {
  const router = useRouter();
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

      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Settings</Text>
      </View>

      {/* Middle Section */}
      <View style={styles.middleSection}>
        <Button
          icon={<Icon name="person-add" color="#fff" />}
          title={translations[language].signup}
          titleStyle={{ marginLeft: 10 }}
          onPress={() => router.push('/Drawer/SignUp')}
          buttonStyle={styles.middleButton}
        />
        <Button
          icon={<Icon name="list" color="#fff" />}
          title={translations[language].list}
          titleStyle={{ marginLeft: 10 }}
          onPress={() => router.push('/Drawer/List')}
          buttonStyle={styles.middleButton}
        />
        <Button
          icon={<Icon name="email" color="#fff" />}
          title={translations[language].contact}
          titleStyle={{ marginLeft: 10 }}
          onPress={() => router.push('/Drawer/ContactUs')}
          buttonStyle={styles.middleButton}
        />
      </View>

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
          onPress={() => router.push('/Settings')}
          buttonStyle={styles.navButton}
        />
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
    </View>
  );
}


const styles = StyleSheet.create({

  modalOverlay: {
    position: 'absolute',
    top: 60, 
    left: 20,
    backgroundColor: 'transparent',
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
  langButton: {
    backgroundColor: '#3b6babff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    position: 'absolute',
    top: 20,
    left: 20,
  },

  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },

  middleSection: {
    marginTop: 0,
    alignItems: 'center',
    gap: 20,
  },
  middleButton: {
    width: 200,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: '#4172b3ff',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 80,
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
  titleContainer: {
    marginTop: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
});