import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export type DayInfoCard = {
  id: string;
  title: string;
  variant: 'yellow' | 'red';
  onPress?: () => void;
};

type Props = {
  cards: DayInfoCard[];
  style?: object;
};

export default function DayInfoBoard({ cards, style }: Props) {
  if (!cards?.length) return null;

  const cardStyle = (variant: 'yellow' | 'red') =>
    variant === 'yellow' ? styles.cardYellow : styles.cardRed;

  if (cards.length >= 3) {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={[styles.row, style]}
        contentContainerStyle={styles.scrollContent}
      >
        {cards.map((card) => (
          <TouchableOpacity
            key={card.id}
            style={[styles.card, styles.cardScroll, cardStyle(card.variant)]}
            onPress={card.onPress}
            activeOpacity={0.85}
          >
            <Text style={styles.cardText} numberOfLines={1} ellipsizeMode="tail">{card.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }

  return (
    <View style={[styles.row, style]}>
      {cards.map((card) => (
          <TouchableOpacity
            key={card.id}
            style={[styles.card, styles.cardFlex, cardStyle(card.variant)]}
            onPress={card.onPress}
            activeOpacity={0.85}
          >
            <Text style={styles.cardText} numberOfLines={1} ellipsizeMode="tail">{card.title}</Text>
          </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 6,
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 8,
  },
  scrollContent: {
    gap: 6,
    paddingRight: 16,
  },
  card: {
    height: 44,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 0,
    shadowOpacity: 0,
  },
  cardFlex: {
    flex: 1,
  },
  cardScroll: {
    minWidth: 120,
  },
  cardYellow: {
    backgroundColor: '#FFF4C2',
    borderColor: '#F5D36B',
  },
  cardRed: {
    backgroundColor: '#FFE3E3',
    borderColor: '#FF6B6B',
  },
  cardText: {
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
});
