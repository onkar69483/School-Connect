// src/components/NoticeBoard.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface Notice {
  id: number;
  title: string;
  content: string;
}

const NoticeBoard: React.FC = () => {
  const [notices, setNotices] = useState<Notice[]>([
    { id: 1, title: 'Sample Notice 1', content: 'This is the content of notice 1.' },
    { id: 2, title: 'Sample Notice 2', content: 'This is the content of notice 2.' },
  ]);

  const handleAddNotice = () => {
    const newNotice: Notice = {
      id: notices.length + 1,
      title: `Notice ${notices.length + 1}`,
      content: 'This is a new notice',
    };
    setNotices([...notices, newNotice]);
  };

  return (
    <LinearGradient
      colors={['#FFDEE9', '#B5FFFC']} // Gradient colors
      style={styles.container}
    >
      <Text style={styles.header}>Notice Board</Text>
      <FlatList
        data={notices}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.noticeItem}>
            <Text style={styles.noticeTitle}>{item.title}</Text>
            <Text style={styles.noticeContent}>{item.content}</Text>
          </View>
        )}
      />
      <Button title="Add Notice" onPress={handleAddNotice} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  noticeItem: {
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  noticeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  noticeContent: {
    fontSize: 14,
    color: '#333',
  },
});

export default NoticeBoard;
