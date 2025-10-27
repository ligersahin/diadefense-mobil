import React from 'react';
import { View, StyleSheet, Modal as RNModal } from 'react-native';
import { Card, Text, Button } from '@ui-kitten/components';
import { useTranslation } from 'react-i18next';
import { DiaDefenseColors } from '../constants/colors';

interface DefiModalProps {
  visible: boolean;
  message: string;
  onClose: () => void;
}

export const DefiModal: React.FC<DefiModalProps> = ({ visible, message, onClose }) => {
  const { t } = useTranslation();
  
  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Card style={styles.card}>
          <View style={styles.header}>
            <Text category="h5" style={styles.title}>
              Defi Says
            </Text>
          </View>
          
          <Text category="p1" style={styles.message}>
            {t(message)}
          </Text>
          
          <Button
            style={styles.button}
            onPress={onClose}
          >
            {t('common.close')}
          </Button>
        </Card>
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 16,
  },
  header: {
    marginBottom: 16,
    alignItems: 'center',
  },
  title: {
    color: DiaDefenseColors.oliveGreen,
    fontWeight: 'bold',
  },
  message: {
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 24,
  },
  button: {
    marginTop: 8,
  },
});