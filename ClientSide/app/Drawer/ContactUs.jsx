import React, { useState } from 'react';
import * as MailComposer from 'expo-mail-composer';
import {View,TextInput,Text,TouchableOpacity,StyleSheet,Alert,ScrollView,Modal,
} from 'react-native';
import { Icon } from '@rneui/themed';

export default function ContactForm() {
  const [language, setLanguage] = useState('en');
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const translations = {
    en: {
      header: 'Contact Us',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      placeholderName: 'Your name',
      placeholderEmail: 'Your email',
      placeholderMessage: 'Your message',
      send: 'Send',
      success: 'Success',
      error: 'Error',
    },
    he: {
      header: 'צור קשר',
      name: 'שם',
      email: 'אימייל',
      message: 'הודעה',
      placeholderName: 'הכנס את שמך',
      placeholderEmail: 'הכנס את האימייל שלך',
      placeholderMessage: 'כתוב את הודעתך כאן',
      send: 'שלח',
      success: 'הצלחה',
      error: 'שגיאה',
    },
  };

  const t = translations[language];

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://homework.somee.com/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.text();
      console.log('Server response:', data);

      if (response.ok) {
        Alert.alert(t.success, data);
        setName('');
        setEmail('');
        setMessage('');

        const options = {
          recipients: ['morjanaboasbi@gmail.com'],
          subject: 'Contact Form me',
          body: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
        };

        MailComposer.composeAsync(options)
          .then((result) => {
            if (result.status === 'sent') {
              Alert.alert('Email sent successfully!');
            }
          })
          .catch((error) => {
            Alert.alert('Failed to send email: ' + error.message);
          });
      } else {
        Alert.alert(t.error, data);
      }
    } catch (error) {
      Alert.alert(t.error, error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.wrapper}>
      {/* Language Selector */}
      <View style={styles.langWrapper}>
        <TouchableOpacity
          style={styles.langButton}
          onPress={() => setShowLanguageMenu(true)}
        >
          <Icon name="language" color="#fff" size={24} />
        </TouchableOpacity>
      </View>

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

      {/* Form */}
      <View style={styles.container}>
        <Text style={styles.header}>{t.header}</Text>

        <Text style={styles.label}>{t.name}</Text>
        <TextInput
          placeholder={t.placeholderName}
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

        <Text style={styles.label}>{t.email}</Text>
        <TextInput
          placeholder={t.placeholderEmail}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={styles.input}
        />

        <Text style={styles.label}>{t.message}</Text>
        <TextInput
          placeholder={t.placeholderMessage}
          value={message}
          onChangeText={setMessage}
          multiline
          style={[styles.input, styles.textArea]}
        />

        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitText}>{t.send}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    flexGrow: 1,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 8,
    elevation: 3,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    color: '#333',
    marginBottom: 15,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  submitBtn: {
    backgroundColor: '#3b6bab',
    paddingVertical: 16,
    borderRadius: 6,
    marginTop: 10,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
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