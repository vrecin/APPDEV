import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View, StyleSheet, ScrollView, Alert } from 'react-native';
import { IMG } from '../utils';

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, title: 'Silky Wood Elixir',  price: 29.99, quantity: 1, image: IMG.MYSTERIOUS },
    { id: 2, title: 'Juliette Has A Gun', price: 19.99, quantity: 2, image: IMG.RAGE },
    { id: 3, title: 'Impadia',            price: 39.99, quantity: 1, image: IMG.BLISS },
  ]);

  const updateQuantity = (id, change) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from your cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => setCartItems(items => items.filter(item => item.id !== id)),
        },
      ]
    );
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax      = subtotal * 0.08;
  const total    = subtotal + shipping + tax;

  return (
    <View style={styles.container}>

      {/* ── Header ── */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerEyebrow}>MOODURA SCENTS</Text>
          <Text style={styles.headerTitle}>Your Cart</Text>
        </View>
        {cartItems.length > 0 && (
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{cartItems.length}</Text>
          </View>
        )}
      </View>

      {cartItems.length === 0 ? (
        /* ── Empty State ── */
        <View style={styles.emptyState}>
          <View style={styles.emptyIconWrap}>
            <Text style={styles.emptyIcon}>🛍</Text>
          </View>
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySubtitle}>Discover a scent that matches your mood.</Text>
          <TouchableOpacity style={styles.shopNowBtn}>
            <Text style={styles.shopNowText}>Explore Scents</Text>
            <Text style={styles.shopNowArrow}>→</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {/* ── Cart Items ── */}
          <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
            <View style={styles.itemsList}>
              {cartItems.map((item) => (
                <View key={item.id} style={styles.cartItem}>
                  <Image source={{ uri: item.image }} style={styles.itemImage} resizeMode="cover" />

                  <View style={styles.itemDetails}>
                    <Text style={styles.itemTitle} numberOfLines={2}>{item.title}</Text>
                    <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>

                    <View style={styles.qtyRow}>
                      <TouchableOpacity
                        style={styles.qtyBtn}
                        onPress={() => updateQuantity(item.id, -1)}
                      >
                        <Text style={styles.qtyBtnText}>−</Text>
                      </TouchableOpacity>
                      <Text style={styles.qtyValue}>{item.quantity}</Text>
                      <TouchableOpacity
                        style={styles.qtyBtn}
                        onPress={() => updateQuantity(item.id, 1)}
                      >
                        <Text style={styles.qtyBtnText}>+</Text>
                      </TouchableOpacity>
                      <Text style={styles.itemLineTotal}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    style={styles.removeBtn}
                    onPress={() => removeItem(item.id)}
                  >
                    <Text style={styles.removeIcon}>✕</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            {/* Free shipping nudge */}
            {subtotal <= 50 && (
              <View style={styles.freeShippingBar}>
                <Text style={styles.freeShippingText}>
                  Add <Text style={styles.freeShippingAmt}>${(50 - subtotal).toFixed(2)}</Text> more for free shipping
                </Text>
              </View>
            )}

            <View style={{ height: 16 }} />
          </ScrollView>

          {/* ── Order Summary ── */}
          <View style={styles.summary}>
            <Text style={styles.summaryTitle}>Order Summary</Text>

            {[
              { label: 'Subtotal',  value: `$${subtotal.toFixed(2)}` },
              { label: 'Shipping',  value: shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}` },
              { label: 'Tax (8%)', value: `$${tax.toFixed(2)}` },
            ].map((row) => (
              <View key={row.label} style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>{row.label}</Text>
                <Text style={[styles.summaryValue, row.value === 'FREE' && styles.freeText]}>
                  {row.value}
                </Text>
              </View>
            ))}

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
            </View>

            <TouchableOpacity style={styles.checkoutBtn} activeOpacity={0.85}>
              <Text style={styles.checkoutText}>Proceed to Checkout</Text>
              <Text style={styles.checkoutArrow}>→</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.continueBtn} activeOpacity={0.85}>
              <Text style={styles.continueText}>Continue Shopping</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
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
  countBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: VIOLET,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  countText: {
    color: CARD,
    fontSize: 16,
    fontWeight: '800',
  },

  /* ── Empty State ── */
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyIconWrap: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: LAVENDER,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: BORDER,
  },
  emptyIcon: {
    fontSize: 44,
  },
  emptyTitle: {
    fontFamily: 'Playfair Display',
    fontSize: 22,
    fontWeight: '700',
    color: DEEP,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontFamily: 'Roboto',
    fontSize: 14,
    color: MUTED,
    textAlign: 'center',
    marginBottom: 28,
    lineHeight: 21,
  },
  shopNowBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: DEEP,
    borderRadius: 30,
    paddingHorizontal: 24,
    paddingVertical: 13,
    gap: 8,
  },
  shopNowText: {
    color: LAVENDER,
    fontFamily: 'Playfair Display',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  shopNowArrow: {
    color: VIOLET,
    fontSize: 17,
  },

  /* ── Scroll ── */
  scroll: {
    flex: 1,
  },
  itemsList: {
    paddingHorizontal: 20,
    paddingTop: 16,
    gap: 12,
  },

  /* ── Cart Item ── */
  cartItem: {
    flexDirection: 'row',
    backgroundColor: CARD,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: BORDER,
    overflow: 'hidden',
    shadowColor: DEEP,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  itemImage: {
    width: 90,
    height: 100,
    backgroundColor: LAVENDER,
  },
  itemDetails: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    justifyContent: 'space-between',
  },
  itemTitle: {
    fontFamily: 'Playfair Display',
    fontSize: 14,
    fontWeight: '700',
    color: DEEP,
    lineHeight: 19,
  },
  itemPrice: {
    fontFamily: 'Roboto',
    fontSize: 13,
    color: MUTED,
    fontWeight: '500',
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: LAVENDER,
    borderWidth: 1,
    borderColor: BORDER,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyBtnText: {
    fontSize: 17,
    color: DEEP,
    fontWeight: '700',
    lineHeight: 20,
  },
  qtyValue: {
    fontFamily: 'Roboto',
    fontSize: 15,
    fontWeight: '700',
    color: DEEP,
    minWidth: 20,
    textAlign: 'center',
  },
  itemLineTotal: {
    fontFamily: 'Playfair Display',
    fontSize: 14,
    fontWeight: '700',
    color: VIOLET,
    marginLeft: 4,
  },
  removeBtn: {
    padding: 12,
    justifyContent: 'flex-start',
  },
  removeIcon: {
    color: MUTED,
    fontSize: 14,
    fontWeight: '700',
  },

  /* ── Free shipping bar ── */
  freeShippingBar: {
    marginHorizontal: 20,
    marginTop: 14,
    backgroundColor: LAVENDER,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: BORDER,
  },
  freeShippingText: {
    fontFamily: 'Roboto',
    fontSize: 12,
    color: MUTED,
    textAlign: 'center',
  },
  freeShippingAmt: {
    color: DEEP,
    fontWeight: '700',
  },

  /* ── Order Summary ── */
  summary: {
    backgroundColor: CARD,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 22,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderColor: BORDER,
    shadowColor: DEEP,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 8,
  },
  summaryTitle: {
    fontFamily: 'Playfair Display',
    fontSize: 18,
    fontWeight: '700',
    color: DEEP,
    marginBottom: 14,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontFamily: 'Roboto',
    fontSize: 14,
    color: MUTED,
  },
  summaryValue: {
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: '600',
    color: DEEP,
  },
  freeText: {
    color: VIOLET,
    fontWeight: '700',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: BORDER,
    paddingTop: 14,
    marginTop: 6,
    marginBottom: 18,
  },
  totalLabel: {
    fontFamily: 'Playfair Display',
    fontSize: 18,
    fontWeight: '700',
    color: DEEP,
  },
  totalValue: {
    fontFamily: 'Playfair Display',
    fontSize: 18,
    fontWeight: '700',
    color: DEEP,
  },
  checkoutBtn: {
    backgroundColor: DEEP,
    borderRadius: 30,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  checkoutText: {
    color: LAVENDER,
    fontFamily: 'Playfair Display',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  checkoutArrow: {
    color: VIOLET,
    fontSize: 18,
  },
  continueBtn: {
    borderWidth: 1.5,
    borderColor: DEEP,
    borderRadius: 30,
    paddingVertical: 12,
    alignItems: 'center',
  },
  continueText: {
    color: DEEP,
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});

export default CartScreen;