// screens/HomeScreen.tsx — HS4 FIXED
// [MIGLIORATA] Stili più visibili, separatori tra card e fix dell'errore di testo

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { API_URL } from "../utils/constants";
import { useNavigation } from "@react-navigation/native";


type Post = {
  id: number;
  title: string;
  body: string;
};

export default function HomeScreen() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const navigation = useNavigation();


  useEffect(() => {
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

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="blue" />
        <Text style={styles.loadingText}>Caricamento post...</Text>
      </View>
    );
  }

  // Funzione che definisce come disegnare ogni card
  const renderItem = ({ item }: { item: Post }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("DetailScreen" as never, { post: item } as never)}

    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.body} numberOfLines={2}>
        {item.body}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={styles.separator} />} // [NUOVO] Spazio tra card
        contentContainerStyle={{ padding: 12 }}
      />
    </View>
  );
}

// [NUOVO] Stili locali, per test visivo chiaro
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // sfondo bianco principale
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
  card: {
    backgroundColor: "#f2f2f2",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3, // ombra Android
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
    color: "#000",
  },
  body: {
    color: "#444",
  },
  separator: {
    height: 10, // spazio visivo tra card
  },
});
