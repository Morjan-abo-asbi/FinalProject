import React, { useState } from 'react';
import {View,Text,StyleSheet, TouchableOpacity,Modal,Dimensions,FlatList,} from 'react-native';
import { Icon } from '@rneui/themed';

const screenWidth = Dimensions.get('window').width;
const numColumns = 2;

export default function EmergencyGrid() {
  const [language, setLanguage] = useState('en');
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const translations = {
    en: {
      title: 'Emergency Numbers',
      close: 'Close',
      services: {
        Police: 'Police',
        Ambulance: 'Ambulance',
        Fire: 'Fire Dept.',
        HomeFront: 'Home Front',
        Electric: 'Electric Co.',
        Municipal: 'Municipal',
        Poison: 'Poison Center',
        Roadside: 'Roadside Help',
        Mental: 'Mental Health',
        Violence: 'Violence Hotline',
      },
    },
    he: {
      title: 'מספרי חירום',
      close: 'סגור',
      services: {
        Police: 'משטרה',
        Ambulance: 'אמבולנס',
        Fire: 'מכבי אש',
        HomeFront: 'פיקוד העורף',
        Electric: 'חברת חשמל',
        Municipal: 'מוקד עירוני',
        Poison: 'מוקד רעלים',
        Roadside: 'סיוע בדרכים',
        Mental: 'קו נפשי',
        Violence: 'אלימות במשפחה',
      },
    },
  };

  const emergencyNumbers = [
    { key: 'Police', number: '100' },
    { key: 'Ambulance', number: '101' },
    { key: 'Fire', number: '102' },
    { key: 'HomeFront', number: '104' },
    { key: 'Electric', number: '103' },
    { key: 'Municipal', number: '106' },
    { key: 'Poison', number: '04-777-1900' },
    { key: 'Roadside', number: '*2120' },
    { key: 'Mental', number: '1201' },
    { key: 'Violence', number: '118' },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.square}
      onPress={() => setSelectedItem(item)}
    >
      <Text style={styles.service}>
        {translations[language].services[item.key]}
      </Text>
      <Text style={styles.number}>{item.number}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Language Selector */}
      <View style={styles.langWrapper}>
        <TouchableOpacity
          style={styles.langButton}
          onPress={() => setShowLanguageMenu(true)}
        >
          <Icon name="language" color="#fff" size={24} />
        </TouchableOpacity>
      </View>

      {/* Language Modal */}
      <Modal visible={showLanguageMenu} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => {
                setLanguage('en');
                setShowLanguageMenu(false);
              }}
            >
              <Text style={styles.modalText}>🇬🇧 English</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setLanguage('he');
                setShowLanguageMenu(false);
              }}
            >
              <Text style={styles.modalText}>🇮🇱 עברית</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Title */}
      <Text style={styles.title}>{translations[language].title}</Text>

      {/* Grid */}
      <FlatList
        data={emergencyNumbers}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        numColumns={numColumns}
        contentContainerStyle={styles.grid}
      />

      {/* Expanded Modal */}
      <Modal visible={!!selectedItem} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalBox}>
            <Text style={styles.modalService}>
              {translations[language].services[selectedItem?.key]}
            </Text>
            <Text style={styles.modalNumber}>{selectedItem?.number}</Text>
            <TouchableOpacity
              onPress={() => setSelectedItem(null)}
              style={styles.closeButton}
            >
              <Text style={styles.closeText}>
                {translations[language].close}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    marginLeft: 15,
    color: '#2c3e50',
  },
  grid: {
    alignItems: 'center',
  },
  square: {
    backgroundColor: '#82a9e4ff',
    width: screenWidth / numColumns - 30,
    height: 120,
    margin: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  service: {
    fontSize: 16,
    fontWeight: '600',
    color: '#130f40',
    textAlign: 'center',
  },
  number: {
    fontSize: 18,
    color: '#d6cdccff',
    marginTop: 5,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
    width: '80%',
  },
  modalService: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  modalNumber: {
    fontSize: 28,
    color: '#3b6bab',
    marginVertical: 10,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#130f40',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  closeText: {
    color: '#fff',
    fontSize: 16,
  },
  langWrapper: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
  },
  langButton: {
    backgroundColor: '#3b6bab',
    padding: 10,
    borderRadius: 10,
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
});
