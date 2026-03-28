import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export type DayInfoCard = {
  id: string;
  title: string;
  variant: 'yellow' | 'red' | 'green';
  onPress?: () => void;
};

type Props = {
  cards: DayInfoCard[];
  style?: object;
};

export default function DayInfoBoard({ cards, style }: Props) {
  if (!cards?.length) return null;

  const cardStyle = (variant: 'yellow' | 'red' | 'green') =>
    variant === 'yellow' ? styles.cardYellow : variant === 'green' ? styles.cardGreen : styles.cardRed;

  const cardTextStyle = (variant: 'yellow' | 'red' | 'green') =>
    variant === 'green' ? styles.cardTextGreen : styles.cardText;

  if (cards.length >= 3) {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={[styles.rowScroll, style]}
        contentContainerStyle={styles.scrollContent}
      >
        {cards.map((card) => (
          <TouchableOpacity
            key={card.id}
            style={[styles.card, cards.length === 3 ? styles.cardCompact : styles.cardScroll, cardStyle(card.variant)]}
            onPress={card.onPress}
            activeOpacity={0.85}
          >
            <Text style={cardTextStyle(card.variant)} numberOfLines={1} ellipsizeMode="tail">{card.title}</Text>
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
            <Text style={cardTextStyle(card.variant)} numberOfLines={2} ellipsizeMode="tail">{card.title}</Text>
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
  rowScroll: {
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 8,
  },
  scrollContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 4,
    paddingRight: 0,
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
  cardCompact: {
    flex: 1,
    minWidth: 0,
    paddingHorizontal: 8,
  },
  cardYellow: {
    backgroundColor: '#FFF4C2',
    borderColor: '#F5D36B',
  },
  cardRed: {
    backgroundColor: '#FFE3E3',
    borderColor: '#FF6B6B',
  },
  cardGreen: {
    backgroundColor: '#ECFDF5',
    borderColor: '#10B981',
  },
  cardText: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  cardTextGreen: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    color: '#065F46',
  },
});
