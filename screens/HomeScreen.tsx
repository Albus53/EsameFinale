import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Pressable,
  StyleSheet,
} from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../utils/constants";

type Post = {
  id: number;
  title: string;
  body: string;
};

const FAVORITES_KEY = "favorites_posts";

export default function HomeScreen() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

  const navigation = useNavigation<any>();
  const isFocused = useIsFocused();

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (isFocused) loadFavorites();
  }, [isFocused]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(API_URL);
      const data: Post[] = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Errore nel caricamento dei post:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadFavorites = async () => {
    try {
      const stored = await AsyncStorage.getItem(FAVORITES_KEY);
      if (!stored) return setFavoriteIds([]);
      setFavoriteIds(JSON.parse(stored));
    } catch (error) {
      console.log("Errore caricamento preferiti (home)", error);
    }
  };

  const toggleFavoriteFromList = async (postId: number) => {
    try {
      // se già presente lo rimuove, altrimenti lo aggiunge
      const updated = favoriteIds.includes(postId)
        ? favoriteIds.filter((id) => id !== postId)
        : [...favoriteIds, postId];

      setFavoriteIds(updated); // aggiorna UI
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    } catch (error) {
      console.log("Errore salvataggio preferiti (home)", error);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="blue" />
        <Text style={styles.loadingText}>Caricamento post...</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: Post }) => {
    const isFavorite = favoriteIds.includes(item.id);

    return (
      <View style={styles.cardWrapper}>
        <Pressable
          style={styles.card}
          onPress={() => navigation.navigate("DetailScreen", { post: item })}
        >
          <View style={styles.cardHeaderRow}>
            <Text style={styles.title} numberOfLines={1}>
              {item.title}
            </Text>

            <Pressable onPress={() => toggleFavoriteFromList(item.id)}>
              <Ionicons
                name={isFavorite ? "star" : "star-outline"}
                size={20}
                color={isFavorite ? "#ffd166" : "#888"}
              />
            </Pressable>
          </View>

          <Text style={styles.body} numberOfLines={2}>
            {item.body}
          </Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={{ padding: 12 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  loadingText: {
    marginTop: 8,
    fontSize: 16,
    color: "#333",
  },
  cardWrapper: {
    borderRadius: 12,
    overflow: "hidden",
  },
  card: {
    backgroundColor: "#f2f2f2",
    padding: 16,
    borderRadius: 12,
  },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#000",
    flex: 1,
    marginRight: 8,
  },
  body: {
    color: "#444",
  },
  separator: {
    height: 10,
  },
});
