import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TextInput, Modal, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface Notice {
  id: number;
  title: string;
  content: string;
  date: string;
}

const NoticeBoard: React.FC = () => {
  const [notices, setNotices] = useState<Notice[]>([
    { id: 1, title: 'Sample Notice 1', content: 'This is the content of notice 1.', date: '2024-09-03' },
    { id: 2, title: 'Sample Notice 2', content: 'This is the content of notice 2.', date: '2024-09-05' },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  const handleAddNotice = () => {
    if (newTitle && newContent) {
      const newNotice: Notice = {
        id: notices.length + 1,
        title: newTitle,
        content: newContent,
        date: new Date().toISOString().split('T')[0],
      };
      setNotices([...notices, newNotice]);
      setNewTitle('');
      setNewContent('');
      setModalVisible(false);
    } else {
      alert('Please fill in both the title and content.');
    }
  };

  return (
    <LinearGradient
      colors={['#1c1c1c', '#1c1c1c']} // Solid dark background
      style={styles.container}
    >
      <Text style={styles.header}>Notice Board</Text>
      <FlatList
        data={notices}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.noticeItem}>
            <View style={styles.noticeContentContainer}>
              <Text style={styles.noticeTitle}>{item.title}</Text>
              <Text style={styles.noticeContent}>{item.content}</Text>
            </View>
            <Text style={styles.noticeDate}>{item.date}</Text>
          </View>
        )}
      />
      <View style={styles.buttonContainer}>
        <Button title="Add Notice" onPress={() => setModalVisible(true)} color="#007BFF" /> {/* Blue button */}
      </View>

      {/* Modal for Adding New Notice */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Notice</Text>
            <TextInput
              style={styles.input}
              placeholder="Title"
              placeholderTextColor="#aaa"
              value={newTitle}
              onChangeText={setNewTitle}
            />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Content"
              placeholderTextColor="#aaa"
              value={newContent}
              onChangeText={setNewContent}
              multiline={true}
              numberOfLines={4}
            />
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.submitButton]}
                onPress={handleAddNotice}
              >
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#000000',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#FFFFFF',
  },
  noticeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 8,
    backgroundColor: '#2b2b2b',
  },
  noticeContentContainer: {
    flex: 1,
  },
  noticeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  noticeContent: {
    fontSize: 14,
    color: '#CCCCCC',
  },
  noticeDate: {
    fontSize: 12,
    color: '#AAAAAA',
  },
  buttonContainer: {
    marginTop: 16,
    backgroundColor: '#000000',
    borderRadius: 8,
    overflow: 'hidden',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#333333',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#555555',
    borderRadius: 8,
    backgroundColor: '#444444',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#007BFF',
  },
  cancelButton: {
    backgroundColor: '#444444',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default NoticeBoard;
