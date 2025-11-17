// screens/DetailScreen.tsx — Like locale + Preferiti persistenti (AsyncStorage)

import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Post = {
  id: number;
  title: string;
  body: string;
};

const FAVORITES_KEY = "favorites_posts";

export default function DetailScreen() {
  const route = useRoute();
  const { post } = route.params as { post: Post };

  // ❤️ Like: SOLO STATO LOCALE (NON salvato in AsyncStorage)
  const [liked, setLiked] = useState(false);

  // ⭐ Preferito: salvato in AsyncStorage
  const [isFavorite, setIsFavorite] = useState(false);

  // Al montaggio, carichiamo se il post è tra i preferiti
  useEffect(() => {
    loadFavoriteState();
  }, []);

  const loadFavoriteState = async () => {
    try {
      const stored = await AsyncStorage.getItem(FAVORITES_KEY);
      if (!stored) return;

      const arr: number[] = JSON.parse(stored);
      if (arr.includes(post.id)) {
        setIsFavorite(true);
      }
    } catch (error) {
      console.log("Errore caricamento preferiti (detail)", error);
    }
  };

  // ❤️ toggla solo lo stato in memoria
  const toggleLike = () => {
    const newValue = !liked;
    setLiked(newValue);
    if (newValue) {
      Alert.alert("Hai messo Mi piace a questo post!");
    }
  };

  // ⭐ aggiungi/rimuovi dai preferiti e salva in AsyncStorage
  const toggleFavorite = async () => {
    try {
      const stored = await AsyncStorage.getItem(FAVORITES_KEY);
      let favorites: number[] = stored ? JSON.parse(stored) : [];

      if (favorites.includes(post.id)) {
        // rimuovi dai preferiti
        favorites = favorites.filter((id) => id !== post.id);
        setIsFavorite(false);
      } else {
        // aggiungi ai preferiti
        favorites.push(post.id);
        setIsFavorite(true);
        Alert.alert("Post aggiunto ai preferiti!");
      }

      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.log("Errore salvataggio preferiti (detail)", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header + pulsante Preferiti ⭐ */}
      <View style={styles.headerRow}>
        <Text style={styles.header}>Dettaglio del Post</Text>

        <Pressable onPress={toggleFavorite}>
          <Ionicons
            name={isFavorite ? "star" : "star-outline"}
            size={28}
            color={isFavorite ? "#ffd166" : "#444"}
          />
        </Pressable>
      </View>

      {/* Card contenuto */}
      <View style={styles.card}>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.body}>{post.body}</Text>
      </View>

      {/* Bottone Like ❤️ (solo stato locale) */}
      <Pressable
        onPress={toggleLike}
        style={[
          styles.likeButton,
          { backgroundColor: liked ? "#06d6a0" : "#e63946" },
        ]}
      >
        <Text style={styles.likeText}>
          {liked ? "Piace già" : "Mi piace"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1d3557",
  },
  card: {
    backgroundColor: "#f8f9fa",
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginBottom: 10,
  },
  body: {
    fontSize: 16,
    color: "#555",
    lineHeight: 22,
  },
  likeButton: {
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  likeText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
