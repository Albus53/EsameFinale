import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { API_URL } from "../utils/constants";

type Post = {
  id: number;
  title: string;
  body: string;
};

const FAVORITES_KEY = "favorites_posts";

export default function FavoritesScreen() {
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const isFocused = useIsFocused();
  const navigation = useNavigation<any>();

  useEffect(() => {
    fetchAllPosts();
  }, []);

  useEffect(() => {
    if (isFocused) {
      loadFavorites();
    }
  }, [isFocused]);

  const fetchAllPosts = async () => {
    try {
      const response = await fetch(API_URL);
      const data: Post[] = await response.json();
      setAllPosts(data);
    } catch (error) {
      console.log("Errore nel caricamento dei post complessivi", error);
    }
  };

  const loadFavorites = async () => {
    try {
      const stored = await AsyncStorage.getItem(FAVORITES_KEY);
      const arr = stored ? JSON.parse(stored) : [];
      setFavoriteIds(arr);
    } catch (error) {
      console.log("Errore nel caricamento dei preferiti", error);
    }
  };

  const toggleFavorite = async (postId: number) => {
    try {
      let updated = favoriteIds.filter((id) => id !== postId);
      setFavoriteIds(updated);
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    } catch (error) {
      console.log("Errore rimozione preferiti", error);
    }
  };

  const favoritePosts = allPosts.filter((p) => favoriteIds.includes(p.id));

  const renderItem = ({ item }: { item: Post }) => {
    return (
      <View style={styles.card}>
        <Pressable
          style={{ flex: 1 }}
          onPress={() => navigation.navigate("DetailScreen", { post: item })}
        >
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.body} numberOfLines={2}>
            {item.body}
          </Text>
        </Pressable>

        <Pressable onPress={() => toggleFavorite(item.id)}>
          <Ionicons name="star" size={24} color="#ffd166" />
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {favoritePosts.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>Nessun post nei preferiti.</Text>
        </View>
      ) : (
        <FlatList
          data={favoritePosts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ padding: 12 }}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  headerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },

  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1d3557",
  },

  card: {
    backgroundColor: "#f2f2f2",
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontWeight: "600",
    fontSize: 16,
    color: "#000",
    marginBottom: 6,
  },
  body: {
    color: "#444",
    marginRight: 8,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
  },
});
