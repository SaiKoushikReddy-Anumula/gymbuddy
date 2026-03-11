import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing, FontSizes, BorderRadius } from '../constants';
import Button from '../components/Button';
import Card from '../components/Card';
import { Routes } from '../navigation/routes';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/routes';

interface AIChatbotScreenProps {
  navigation: any;
  route?: any;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'workout' | 'diet' | 'general' | 'progress';
}

const AIChatbotScreen: React.FC<AIChatbotScreenProps> = ({ navigation }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI fitness coach. How can I help you today?",
      sender: 'ai',
      timestamp: new Date(Date.now() - 600000),
      type: 'general',
    },
    {
      id: '2',
      text: "I need some form tips for my bench press",
      sender: 'user',
      timestamp: new Date(Date.now() - 540000),
    },
    {
      id: '3',
      text: "Great! Focus on keeping your elbows at a 45-degree angle and engage your lats. Keep your feet planted and maintain a slight arch in your back.",
      sender: 'ai',
      timestamp: new Date(Date.now() - 480000),
      type: 'workout',
    },
  ]);
  
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showChatHistory, setShowChatHistory] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const quickActions = [
    { icon: '💪', text: 'Form Tips', type: 'workout' },
    { icon: '🍎', text: 'Nutrition', type: 'diet' },
    { icon: '📊', text: 'Progress', type: 'progress' },
    { icon: '🎯', text: 'Goals', type: 'general' },
  ];

  const chatHistory = [
    { title: 'Bench Press Tips', timestamp: 'today' },
    { title: 'Protein Intake', timestamp: 'yesterday' },
    { title: 'Weekly Progress', timestamp: '2 days ago' },
    { title: 'Goal Setting', timestamp: '3 days ago' },
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(inputText),
        sender: 'ai',
        timestamp: new Date(),
        type: 'general',
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const generateAIResponse = (userInput: string): string => {
    const responses = [
      "That's a great question! Based on your workout history, I'd recommend focusing on progressive overload while maintaining proper form.",
      "I've analyzed your recent performance data, and here's what I suggest...",
      "Excellent progress! Let me break down some personalized recommendations for you.",
      "Based on your goals and current metrics, here's my analysis...",
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleQuickAction = (action: any) => {
    let message = '';
    switch (action.type) {
      case 'workout':
        message = 'Can you give me some form tips for my workouts?';
        break;
      case 'diet':
        message = 'I need some nutrition advice for my goals';
        break;
      case 'progress':
        message = 'How is my progress looking this week?';
        break;
      case 'general':
        message = 'Help me set some new fitness goals';
        break;
    }
    
    setInputText(message);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const renderMessage = (message: Message) => {
    const isUser = message.sender === 'user';
    
    return (
      <View key={message.id} style={[
        styles.messageContainer,
        isUser ? styles.userMessageContainer : styles.aiMessageContainer
      ]}>
        {!isUser && (
          <View style={styles.aiAvatar}>
            <Text style={styles.aiAvatarText}>🤖</Text>
          </View>
        )}
        
        <View style={[
          styles.messageBubble,
          isUser ? styles.userMessage : styles.aiMessage
        ]}>
          <Text style={[
            styles.messageText,
            isUser ? styles.userMessageText : styles.aiMessageText
          ]}>
            {message.text}
          </Text>
          
          {message.type && !isUser && (
            <View style={styles.messageTag}>
              <Text style={styles.messageTagText}>
                {message.type === 'workout' ? '💪 workout' :
                 message.type === 'diet' ? '🍎 diet' :
                 message.type === 'progress' ? '📊 progress' : '💬 general'}
              </Text>
            </View>
          )}
        </View>
        
        <Text style={[
          styles.messageTime,
          isUser ? styles.userMessageTime : styles.aiMessageTime
        ]}>
          {formatTime(message.timestamp)}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      
      {/* Header */}
      <LinearGradient
        colors={[Colors.backgroundSecondary, Colors.backgroundTertiary]}
        style={styles.header}
      >
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => setShowChatHistory(true)}
        >
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        
        <View style={styles.headerCenter}>
          <View style={styles.aiAvatar}>
            <Text style={styles.aiAvatarText}>🤖</Text>
          </View>
          <View>
            <Text style={styles.aiName}>AI Fitness Coach</Text>
            <View style={styles.onlineStatus}>
              <View style={styles.onlineIndicator} />
              <Text style={styles.onlineText}>Online</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.headerRight} />
      </LinearGradient>

      {/* Chat Messages */}
      <KeyboardAvoidingView 
        style={styles.chatContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map(renderMessage)}
          
          {isTyping && (
            <View style={styles.typingContainer}>
              <View style={styles.aiAvatarSmall}>
                <Text style={styles.aiAvatarSmallText}>🤖</Text>
              </View>
              <View style={styles.typingBubble}>
                <Text style={styles.typingText}>AI is typing...</Text>
                <View style={styles.typingDots}>
                  <View style={[styles.typingDot, styles.typingDot1]} />
                  <View style={[styles.typingDot, styles.typingDot2]} />
                  <View style={[styles.typingDot, styles.typingDot3]} />
                </View>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.quickActions}
          >
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={styles.quickActionButton}
                onPress={() => handleQuickAction(action)}
              >
                <Text style={styles.quickActionIcon}>{action.icon}</Text>
                <Text style={styles.quickActionText}>{action.text}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Input Area */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Ask me anything about fitness..."
            placeholderTextColor={Colors.textMuted}
            multiline
            maxLength={500}
          />
          
          <TouchableOpacity
            style={[
              styles.sendButton,
              inputText.trim() ? styles.sendButtonActive : styles.sendButtonInactive
            ]}
            onPress={handleSendMessage}
            disabled={!inputText.trim()}
          >
            <Text style={styles.sendButtonText}>➤</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* Chat History Modal */}
      <Modal
        visible={showChatHistory}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowChatHistory(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.chatHistoryModal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Chat History</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowChatHistory(false)}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.historyList}>
              {chatHistory.map((chat, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.historyItem}
                  onPress={() => setShowChatHistory(false)}
                >
                  <Text style={styles.historyTitle}>{chat.title}</Text>
                  <Text style={styles.historyTimestamp}>{chat.timestamp}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.backgroundSecondary,
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.backgroundTertiary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIcon: {
    fontSize: 18,
    color: Colors.text,
    fontWeight: '600',
  },
  headerCenter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.md,
  },
  headerRight: {
    width: 40,
  },
  aiAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiAvatarText: {
    fontSize: 20,
  },
  aiName: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.text,
  },
  onlineStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  onlineIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.success,
  },
  onlineText: {
    fontSize: FontSizes.xs,
    color: Colors.success,
    fontWeight: '600',
  },

  // Chat Container
  chatContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    gap: Spacing.lg,
  },

  // Messages
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  userMessageContainer: {
    justifyContent: 'flex-end',
    marginLeft: Spacing.xxl,
  },
  aiMessageContainer: {
    justifyContent: 'flex-start',
    marginRight: Spacing.xxl,
  },
  aiAvatarSmall: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiAvatarSmallText: {
    fontSize: 16,
  },
  messageBubble: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
  },
  userMessage: {
    backgroundColor: Colors.primary,
    borderBottomRightRadius: 6,
  },
  aiMessage: {
    backgroundColor: Colors.backgroundTertiary,
    borderBottomLeftRadius: 6,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  messageText: {
    fontSize: FontSizes.md,
    lineHeight: 20,
  },
  userMessageText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  aiMessageText: {
    color: Colors.text,
  },
  messageTag: {
    marginTop: Spacing.sm,
    alignSelf: 'flex-start',
    backgroundColor: Colors.primary + '25',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  messageTagText: {
    fontSize: FontSizes.xs,
    color: Colors.primary,
    fontWeight: '600',
  },
  messageTime: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
    marginTop: Spacing.xs,
  },
  userMessageTime: {
    textAlign: 'right',
  },
  aiMessageTime: {
    textAlign: 'left',
  },

  // Typing Indicator
  typingContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: Spacing.sm,
    marginRight: Spacing.xxl,
    marginBottom: Spacing.sm,
  },
  typingBubble: {
    backgroundColor: Colors.backgroundTertiary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.lg,
    borderBottomLeftRadius: 6,
    borderWidth: 1,
    borderColor: Colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  typingText: {
    fontSize: FontSizes.sm,
    color: Colors.textMuted,
    fontStyle: 'italic',
  },
  typingDots: {
    flexDirection: 'row',
    gap: 2,
  },
  typingDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.primary,
  },
  typingDot1: { opacity: 0.4 },
  typingDot2: { opacity: 0.7 },
  typingDot3: { opacity: 1 },

  // Quick Actions
  quickActionsContainer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.backgroundSecondary,
  },
  quickActions: {
    gap: Spacing.sm,
  },
  quickActionButton: {
    backgroundColor: Colors.backgroundTertiary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  quickActionIcon: {
    fontSize: 16,
  },
  quickActionText: {
    fontSize: FontSizes.sm,
    color: Colors.text,
    fontWeight: '500',
  },

  // Input
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.backgroundSecondary,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  textInput: {
    flex: 1,
    backgroundColor: Colors.backgroundTertiary,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    fontSize: FontSizes.md,
    color: Colors.text,
    maxHeight: 80,
    minHeight: 40,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonActive: {
    backgroundColor: Colors.primary,
  },
  sendButtonInactive: {
    backgroundColor: Colors.border,
  },
  sendButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  chatHistoryModal: {
    backgroundColor: Colors.backgroundSecondary,
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  modalTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.text,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.backgroundTertiary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: '600',
  },
  historyList: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  historyItem: {
    backgroundColor: Colors.backgroundTertiary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  historyTitle: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  historyTimestamp: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
  },
});

export default AIChatbotScreen;
