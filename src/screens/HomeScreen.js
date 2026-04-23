import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { resetLogin } from '../app/reducers/auth';
import { IMG } from '../utils';

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const featuredItems = [
    { id: 1, title: 'Silky Wood Elixir',  mood: 'Mysterious', price: '$29.99', image: IMG.MYSTERIOUS },
    { id: 2, title: 'Juliette Has A Gun', mood: 'Rage',       price: '$19.99', image: IMG.RAGE },
    { id: 3, title: 'Impadia',            mood: 'Bliss',      price: '$39.99', image: IMG.BLISS },
    { id: 4, title: 'Rouge Smoking',      mood: 'Melancholy', price: '$49.99', image: IMG.MELANCHOLY },
  ];

  const categories = [
    { id: 1, name: 'Mysterious', icon: '࿇' },
    { id: 2, name: 'Rage',       icon: '☠︎︎' },
    { id: 3, name: 'Bliss',      icon: '☘︎' },
    { id: 4, name: 'Melancholy', icon: '𓇢𓆸' },
  ];

  return (
    <View style={styles.container}>

      {/* ── Header ── */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.logoMark}>
            <Text style={styles.logoIcon}>◈</Text>
          </View>
          <View>
            <Text style={styles.brandTitle}>Moodura</Text>
            <Text style={styles.brandSub}>SCENTS</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => dispatch(resetLogin())}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* ── Hero ── */}
        <View style={styles.heroBanner}>
          <Text style={styles.heroEyebrow}>✦ NEW COLLECTION</Text>
          <Text style={styles.heroTitle}>Every Mood,{'\n'}Every You</Text>
          <Text style={styles.heroSubtitle}>
            Fragrances inspired by moods and personalities — for everyday wear or special occasions.
          </Text>
          <TouchableOpacity style={styles.heroBtn}>
            <Text style={styles.heroBtnText}>Explore Collection</Text>
            <Text style={styles.heroBtnArrow}>→</Text>
          </TouchableOpacity>
        </View>

        {/* ── Mood Categories ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Explore Moods</Text>
          <View style={styles.categoryGrid}>
            {categories.map((cat) => (
              <TouchableOpacity key={cat.id} style={styles.categoryCard} activeOpacity={0.85}>
                <View style={styles.categoryIconWrap}>
                  <Text style={styles.categoryIcon}>{cat.icon}</Text>
                </View>
                <Text style={styles.categoryName}>{cat.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ── Featured Scents ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Scents</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See all →</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.grid}>
            {featuredItems.map((item) => (
              <TouchableOpacity key={item.id} style={styles.card} activeOpacity={0.9}>
                <View style={styles.moodTag}>
                  <Text style={styles.moodTagText}>{item.mood}</Text>
                </View>
                <Image source={{ uri: item.image }} style={styles.cardImage} resizeMode="cover" />
                <View style={styles.cardBody}>
                  <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
                  <Text style={styles.cardPrice}>{item.price}</Text>
                  <TouchableOpacity style={styles.cardBtn}>
                    <Text style={styles.cardBtnText}>Add to Cart</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ── Promo Card ── */}
        <View style={styles.promoCard}>
          <Image source={{ uri: IMG.CHERRY }} style={styles.promoImage} resizeMode="cover" />
          <View style={styles.promoOverlay}>
            <Text style={styles.promoEyebrow}>LIMITED OFFER</Text>
            <Text style={styles.promoTitle}>Cherry Blitz</Text>
            <Text style={styles.promoDiscount}>10% Off</Text>
            <TouchableOpacity style={styles.promoBtn}>
              <Text style={styles.promoBtnText}>Shop Now</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

const DEEP     = '#2E073F';
const VIOLET   = '#A976D1';
const LAVENDER = '#F0E8F7';
const MUTED    = '#6A5177';
const CARD     = '#FFFFFF';
const BG       = '#F6F1F8';
const BORDER   = '#E0CCE9';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
  },

  /* ── Header ── */
  header: {
    backgroundColor: DEEP,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 52,
    paddingBottom: 16,
    paddingHorizontal: 24,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoMark: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: VIOLET,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoIcon: {
    color: CARD,
    fontSize: 16,
  },
  brandTitle: {
    fontFamily: 'Playfair Display',
    color: LAVENDER,
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.5,
    lineHeight: 22,
  },
  brandSub: {
    color: VIOLET,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 3,
  },
  logoutBtn: {
    borderWidth: 1,
    borderColor: VIOLET,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  logoutText: {
    color: LAVENDER,
    fontSize: 13,
    fontWeight: '500',
  },

  /* ── Scroll ── */
  scroll: {
    paddingBottom: 20,
  },

  /* ── Hero ── */
  heroBanner: {
    backgroundColor: DEEP,
    marginHorizontal: 0,
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 36,
    marginBottom: 24,
  },
  heroEyebrow: {
    color: VIOLET,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 3,
    marginBottom: 10,
  },
  heroTitle: {
    fontFamily: 'Playfair Display',
    fontSize: 36,
    fontWeight: '700',
    color: LAVENDER,
    lineHeight: 44,
    marginBottom: 12,
  },
  heroSubtitle: {
    fontFamily: 'Roboto',
    fontSize: 14,
    color: 'rgba(240,232,247,0.7)',
    lineHeight: 22,
    marginBottom: 22,
    maxWidth: '85%',
  },
  heroBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: VIOLET,
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 11,
    gap: 8,
  },
  heroBtnText: {
    color: CARD,
    fontFamily: 'Roboto',
    fontWeight: '700',
    fontSize: 14,
    letterSpacing: 0.3,
  },
  heroBtnArrow: {
    color: CARD,
    fontSize: 16,
  },

  /* ── Section ── */
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontFamily: 'Playfair Display',
    fontSize: 20,
    fontWeight: '700',
    color: DEEP,
    marginBottom: 14,
  },
  seeAll: {
    fontFamily: 'Roboto',
    fontSize: 13,
    color: VIOLET,
    fontWeight: '600',
    marginBottom: 14,
  },

  /* ── Category Grid ── */
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    width: '47%',
    backgroundColor: CARD,
    borderRadius: 14,
    paddingVertical: 22,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: BORDER,
    shadowColor: DEEP,
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  categoryIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: LAVENDER,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryIcon: {
    fontSize: 22,
    color: VIOLET,
  },
  categoryName: {
    fontFamily: 'Roboto',
    fontWeight: '700',
    fontSize: 13,
    color: DEEP,
    letterSpacing: 0.3,
  },

  /* ── Product Grid ── */
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  card: {
    width: '47%',
    backgroundColor: CARD,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: BORDER,
    overflow: 'hidden',
    shadowColor: DEEP,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 2,
  },
  moodTag: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 2,
    backgroundColor: 'rgba(240,232,247,0.92)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  moodTagText: {
    color: DEEP,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  cardImage: {
    width: '100%',
    height: 140,
    backgroundColor: LAVENDER,
  },
  cardBody: {
    padding: 12,
  },
  cardTitle: {
    fontFamily: 'Playfair Display',
    fontSize: 13,
    fontWeight: '700',
    color: DEEP,
    marginBottom: 4,
    lineHeight: 18,
  },
  cardPrice: {
    fontFamily: 'Playfair Display',
    fontSize: 15,
    fontWeight: '700',
    color: VIOLET,
    marginBottom: 10,
  },
  cardBtn: {
    backgroundColor: DEEP,
    borderRadius: 10,
    paddingVertical: 8,
    alignItems: 'center',
  },
  cardBtnText: {
    color: LAVENDER,
    fontFamily: 'Roboto',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.4,
  },

  /* ── Promo Card ── */
  promoCard: {
    marginHorizontal: 20,
    borderRadius: 18,
    overflow: 'hidden',
    height: 160,
    position: 'relative',
  },
  promoImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  promoOverlay: {
    flex: 1,
    backgroundColor: 'rgba(46,7,63,0.72)',
    padding: 20,
    justifyContent: 'center',
  },
  promoEyebrow: {
    color: VIOLET,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 3,
    marginBottom: 4,
  },
  promoTitle: {
    fontFamily: 'Playfair Display',
    fontSize: 22,
    fontWeight: '700',
    color: LAVENDER,
    marginBottom: 2,
  },
  promoDiscount: {
    fontFamily: 'Roboto',
    fontSize: 14,
    color: VIOLET,
    fontWeight: '700',
    marginBottom: 12,
  },
  promoBtn: {
    alignSelf: 'flex-start',
    backgroundColor: VIOLET,
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  promoBtnText: {
    color: CARD,
    fontFamily: 'Roboto',
    fontWeight: '700',
    fontSize: 13,
    letterSpacing: 0.3,
  },
});

export default HomeScreen;