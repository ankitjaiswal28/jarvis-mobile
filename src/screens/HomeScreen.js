/**
 * HomeScreen — Sprint 1 placeholder.
 * Confirms the app builds and talks to the backend's /health endpoint.
 */
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {checkBackendHealth} from '../services/api';

export default function HomeScreen() {
  const [status, setStatus] = useState('checking');

  useEffect(() => {
    checkBackendHealth()
      .then(() => setStatus('ok'))
      .catch(() => setStatus('error'));
  }, []);

  return (
    <View style={styles.center}>
      <Text style={styles.title}>JARVIS</Text>
      {status === 'checking' && <ActivityIndicator color="#2FE6E0" />}
      {status === 'ok' && <Text style={styles.ok}>Backend connected ✓</Text>}
      {status === 'error' && (
        <Text style={styles.err}>
          Could not reach backend. Check API_BASE_URL in src/services/api.js
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  center: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  title: {color: '#2FE6E0', fontSize: 40, fontWeight: '800', marginBottom: 20, letterSpacing: 2},
  ok: {color: '#6EE7B7', fontSize: 14},
  err: {color: '#FF6B6B', fontSize: 13, textAlign: 'center', paddingHorizontal: 30},
});
