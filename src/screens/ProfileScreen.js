import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../app/reducers/auth';
import { IMG } from '../utils';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const authData = useSelector(state => state.auth?.data);
  const user = authData?.user;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.logoMark}>
            <Text style={styles.logoIcon}>◈</Text>
          </View>
          <View>
            <Text style={styles.brandName}>Moodura</Text>
            <Text style={styles.brandSub}>SCENTS</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.logoutBtn} onPress={() => dispatch(userLogout())}>
          <Text style={styles.logout}>Logout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Hero Identity Banner */}
        <View style={styles.heroBanner}>
          <View style={styles.avatarWrapper}>
            <Image source={{ uri: IMG.LOGO }} style={styles.avatar} />
            <View style={styles.avatarRing} />
          </View>
          <Text style={styles.displayName}>
            {user?.firstName ? `${user.firstName} ${user.lastName}` : 'Mood Enthusiast'}
          </Text>
          <Text style={styles.tagline}>"Every mood, Every you"</Text>
          <View style={styles.personaBadge}>
            <Text style={styles.personaBadgeText}>✦ Mysterious Serenity</Text>
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          {[
            { number: '12', label: 'Collections' },
            { number: '8',  label: 'Favorites' },
            { number: '4',  label: 'Reviews' },
          ].map((s, i) => (
            <View key={i} style={[styles.statBlock, i === 1 && styles.statBlockCenter]}>
              <Text style={styles.statNumber}>{s.number}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Scent Persona */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Scent Persona</Text>
          <View style={styles.personaCard}>
            <View style={styles.personaAccent} />
            <View style={styles.personaBody}>
              <Text style={styles.personaHeading}>Mysterious Serenity</Text>
              <Text style={styles.personaText}>
                You connect deeply with scents that balance elegance and mystery.
                Lavender, oud, and warm musk define your essence — calm yet intriguing.
              </Text>
            </View>
          </View>
        </View>

        {/* Recent Reflections */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Reflections</Text>

          {[
            {
              name: 'Silky Wood Elixir',
              review: 'Lives up to the name — smooth, earthy, and perfect for late evenings.',
              stars: 5,
            },
            {
              name: 'Juliette Has a Gun',
              review: 'A bold floral twist that gives confidence and softness in one breath.',
              stars: 4,
            },
          ].map((r, i) => (
            <View key={i} style={styles.reviewCard}>
              <View style={styles.reviewTop}>
                <Text style={styles.productName}>{r.name}</Text>
                <View style={styles.starsRow}>
                  {[1,2,3,4,5].map(n => (
                    <Text key={n} style={[styles.star, n <= r.stars ? styles.starFilled : styles.starEmpty]}>★</Text>
                  ))}
                </View>
              </View>
              <Text style={styles.reviewText}>"{r.review}"</Text>
            </View>
          ))}
        </View>

        {/* CTA */}
        <TouchableOpacity style={styles.exploreButton} activeOpacity={0.85}>
          <Text style={styles.exploreText}>Discover More Scents</Text>
          <Text style={styles.exploreArrow}>→</Text>
        </TouchableOpacity>

        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
};

const DEEP   = '#2E073F';
const VIOLET = '#A976D1';
const LAVENDER = '#F0E8F7';
const MUTED  = '#6A5177';
const CARD   = '#FFFFFF';
const BG     = '#F6F1F8';

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
  brandName: {
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
  logout: {
    color: LAVENDER,
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 0.3,
  },

  /* ── Content ── */
  content: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },

  /* ── Hero Banner ── */
  heroBanner: {
    alignItems: 'center',
    backgroundColor: DEEP,
    marginHorizontal: -20,
    paddingBottom: 28,
    paddingTop: 28,
    marginBottom: 24,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 14,
  },
  avatar: {
    width: 82,
    height: 82,
    borderRadius: 41,
    borderWidth: 3,
    borderColor: VIOLET,
  },
  avatarRing: {
    position: 'absolute',
    top: -6,
    left: -6,
    width: 94,
    height: 94,
    borderRadius: 47,
    borderWidth: 1,
    borderColor: VIOLET,
    opacity: 0.4,
  },
  displayName: {
    fontFamily: 'Playfair Display',
    fontSize: 22,
    color: LAVENDER,
    fontWeight: '700',
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  tagline: {
    fontFamily: 'Roboto',
    color: VIOLET,
    fontSize: 13,
    fontStyle: 'italic',
    marginBottom: 14,
  },
  personaBadge: {
    borderWidth: 1,
    borderColor: VIOLET,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 5,
  },
  personaBadgeText: {
    color: VIOLET,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },

  /* ── Stats ── */
  statsRow: {
    flexDirection: 'row',
    backgroundColor: CARD,
    borderRadius: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E0CCE9',
    overflow: 'hidden',
  },
  statBlock: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
  },
  statBlockCenter: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#E0CCE9',
  },
  statNumber: {
    fontFamily: 'Playfair Display',
    fontSize: 24,
    color: DEEP,
    fontWeight: '700',
  },
  statLabel: {
    fontFamily: 'Roboto',
    color: MUTED,
    fontSize: 11,
    marginTop: 3,
    letterSpacing: 0.5,
  },

  /* ── Section ── */
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Playfair Display',
    color: DEEP,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    letterSpacing: 0.2,
  },

  /* ── Persona Card ── */
  personaCard: {
    backgroundColor: CARD,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E0CCE9',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  personaAccent: {
    width: 4,
    backgroundColor: VIOLET,
  },
  personaBody: {
    flex: 1,
    padding: 16,
  },
  personaHeading: {
    fontFamily: 'Playfair Display',
    fontSize: 16,
    color: VIOLET,
    fontWeight: '700',
    marginBottom: 6,
  },
  personaText: {
    fontFamily: 'Roboto',
    color: '#4A375A',
    lineHeight: 21,
    fontSize: 14,
  },

  /* ── Review Cards ── */
  reviewCard: {
    backgroundColor: CARD,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E0CCE9',
    marginBottom: 12,
  },
  reviewTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  productName: {
    fontFamily: 'Playfair Display',
    color: DEEP,
    fontSize: 15,
    fontWeight: '700',
    flex: 1,
    marginRight: 8,
  },
  starsRow: {
    flexDirection: 'row',
  },
  star: {
    fontSize: 14,
    marginLeft: 1,
  },
  starFilled: {
    color: VIOLET,
  },
  starEmpty: {
    color: '#D9C5E8',
  },
  reviewText: {
    fontFamily: 'Roboto',
    fontSize: 13,
    color: '#4A375A',
    lineHeight: 20,
    fontStyle: 'italic',
  },

  /* ── CTA ── */
  exploreButton: {
    backgroundColor: DEEP,
    borderRadius: 30,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginTop: 4,
  },
  exploreText: {
    color: LAVENDER,
    fontFamily: 'Playfair Display',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  exploreArrow: {
    color: VIOLET,
    fontSize: 18,
  },
});

export default ProfileScreen;