import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View, StyleSheet, ScrollView, TextInput } from 'react-native';
import { IMG } from '../utils';

const CATEGORIES = ['All', 'Mysterious', 'Rage', 'Bliss', 'Melancholy'];

const PRODUCTS = [
  { id: 1, title: 'Silky Wood Elixir',   mood: 'Mysterious', price: '$29.99', originalPrice: '$39.99', discount: '25% OFF', rating: 4.8, reviews: 1247, image: IMG.MYSTERIOUS },
  { id: 2, title: 'Juliette Has A Gun',  mood: 'Rage',       price: '$19.99', originalPrice: null,     discount: null,      rating: 4.9, reviews: 2156, image: IMG.RAGE },
  { id: 3, title: 'Impadia',             mood: 'Bliss',      price: '$39.99', originalPrice: null,     discount: null,      rating: 4.7, reviews: 987,  image: IMG.BLISS },
  { id: 4, title: 'Rouge Smoking',       mood: 'Melancholy', price: '$49.99', originalPrice: null,     discount: null,      rating: 4.8, reviews: 1234, image: IMG.MELANCHOLY },
];

const StarRating = ({ rating }) => (
  <View style={styles.starsRow}>
    {[1,2,3,4,5].map(n => (
      <Text key={n} style={[styles.star, n <= Math.round(rating) ? styles.starFilled : styles.starEmpty]}>★</Text>
    ))}
  </View>
);

const ShopScreen = () => {
  const [searchQuery, setSearchQuery]     = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = PRODUCTS.filter(p =>
    (activeCategory === 'All' || p.mood === activeCategory) &&
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>

      {/* ── Header ── */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerEyebrow}>MOODURA SCENTS</Text>
          <Text style={styles.headerTitle}>Shop</Text>
        </View>
        <TouchableOpacity style={styles.cartBtn}>
          <Text style={styles.cartIcon}>🛍</Text>
        </TouchableOpacity>
      </View>

      {/* ── Search Bar ── */}
      <View style={styles.searchWrapper}>
        <View style={styles.searchContainer}>
          <Text style={styles.searchIconLeft}>⌕</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search fragrance or mood…"
            placeholderTextColor="#9B7BAE"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Text style={styles.clearBtn}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* ── Category Filters ── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {CATEGORIES.map((cat) => {
            const active = activeCategory === cat;
            return (
              <TouchableOpacity
                key={cat}
                style={[styles.categoryChip, active && styles.categoryChipActive]}
                onPress={() => setActiveCategory(cat)}
                activeOpacity={0.8}
              >
                <Text style={[styles.categoryText, active && styles.categoryTextActive]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* ── Results Count ── */}
        <View style={styles.resultsRow}>
          <Text style={styles.resultsCount}>{filtered.length} fragrances</Text>
          <TouchableOpacity>
            <Text style={styles.sortBtn}>Sort ↓</Text>
          </TouchableOpacity>
        </View>

        {/* ── Product Grid ── */}
        <View style={styles.grid}>
          {filtered.map((product) => (
            <TouchableOpacity key={product.id} style={styles.productCard} activeOpacity={0.9}>

              {/* Discount Badge */}
              {product.discount && (
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>{product.discount}</Text>
                </View>
              )}

              {/* Mood Tag */}
              <View style={styles.moodTag}>
                <Text style={styles.moodText}>{product.mood}</Text>
              </View>

              {/* Image */}
              <Image source={{ uri: product.image }} style={styles.productImage} resizeMode="cover" />

              {/* Info */}
              <View style={styles.productInfo}>
                <Text style={styles.productTitle} numberOfLines={2}>{product.title}</Text>

                <View style={styles.ratingRow}>
                  <StarRating rating={product.rating} />
                  <Text style={styles.ratingCount}>({product.reviews.toLocaleString()})</Text>
                </View>

                <View style={styles.priceRow}>
                  <Text style={styles.currentPrice}>{product.price}</Text>
                  {product.originalPrice && (
                    <Text style={styles.originalPrice}>{product.originalPrice}</Text>
                  )}
                </View>

                <TouchableOpacity style={styles.addToCartBtn} activeOpacity={0.85}>
                  <Text style={styles.addToCartText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

const DEEP    = '#2E073F';
const VIOLET  = '#A976D1';
const LAVENDER = '#F0E8F7';
const MUTED   = '#6A5177';
const CARD    = '#FFFFFF';
const BG      = '#F6F1F8';
const BORDER  = '#E0CCE9';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
  },

  /* ── Header ── */
  header: {
    backgroundColor: DEEP,
    paddingTop: 52,
    paddingBottom: 20,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  headerEyebrow: {
    color: VIOLET,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 3,
    marginBottom: 2,
  },
  headerTitle: {
    fontFamily: 'Playfair Display',
    fontSize: 32,
    fontWeight: '700',
    color: LAVENDER,
    letterSpacing: 0.3,
  },
  cartBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: VIOLET,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  cartIcon: {
    fontSize: 18,
  },

  /* ── Search ── */
  searchWrapper: {
    backgroundColor: DEEP,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(169,118,209,0.15)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: VIOLET,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  searchIconLeft: {
    color: VIOLET,
    fontSize: 20,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: LAVENDER,
    fontFamily: 'Roboto',
  },
  clearBtn: {
    color: VIOLET,
    fontSize: 14,
    paddingLeft: 8,
  },

  /* ── Scroll ── */
  scroll: {
    flex: 1,
  },

  /* ── Categories ── */
  categoriesContainer: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 6,
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: BORDER,
    backgroundColor: CARD,
    marginRight: 8,
  },
  categoryChipActive: {
    backgroundColor: DEEP,
    borderColor: DEEP,
  },
  categoryText: {
    fontFamily: 'Roboto',
    fontSize: 13,
    fontWeight: '600',
    color: MUTED,
    letterSpacing: 0.3,
  },
  categoryTextActive: {
    color: LAVENDER,
  },

  /* ── Results Row ── */
  resultsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 10,
  },
  resultsCount: {
    fontFamily: 'Roboto',
    fontSize: 13,
    color: MUTED,
    letterSpacing: 0.2,
  },
  sortBtn: {
    fontFamily: 'Roboto',
    fontSize: 13,
    color: DEEP,
    fontWeight: '700',
  },

  /* ── Grid ── */
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 14,
    gap: 12,
  },
  productCard: {
    width: '47%',
    backgroundColor: CARD,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: BORDER,
    overflow: 'hidden',
    shadowColor: DEEP,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },

  /* Badges */
  discountBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: DEEP,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    zIndex: 2,
  },
  discountText: {
    color: VIOLET,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  moodTag: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(240,232,247,0.92)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    zIndex: 2,
  },
  moodText: {
    color: DEEP,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },

  /* Image */
  productImage: {
    width: '100%',
    height: 150,
    backgroundColor: LAVENDER,
  },

  /* Product Info */
  productInfo: {
    padding: 12,
  },
  productTitle: {
    fontFamily: 'Playfair Display',
    fontSize: 14,
    fontWeight: '700',
    color: DEEP,
    marginBottom: 7,
    lineHeight: 19,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 4,
  },
  starsRow: {
    flexDirection: 'row',
  },
  star: {
    fontSize: 11,
  },
  starFilled: {
    color: VIOLET,
  },
  starEmpty: {
    color: BORDER,
  },
  ratingCount: {
    fontFamily: 'Roboto',
    fontSize: 10,
    color: MUTED,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  currentPrice: {
    fontFamily: 'Playfair Display',
    fontSize: 16,
    fontWeight: '700',
    color: DEEP,
  },
  originalPrice: {
    fontFamily: 'Roboto',
    fontSize: 12,
    color: MUTED,
    textDecorationLine: 'line-through',
  },
  addToCartBtn: {
    backgroundColor: DEEP,
    paddingVertical: 9,
    borderRadius: 10,
    alignItems: 'center',
  },
  addToCartText: {
    color: LAVENDER,
    fontFamily: 'Roboto',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
});

export default ShopScreen;