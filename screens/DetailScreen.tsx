// screens/DetailScreen.tsx — HS6
// [MIGLIORATO] Layout più leggibile + like interattivo

import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";

export default function DetailScreen() {
  const route = useRoute();
  const { post }: any = route.params || {};

  // [NUOVO] stato del like
  const [liked, setLiked] = useState(false);

  // [NUOVO] gestore del tocco
  const toggleLike = () => {
    setLiked((prev) => !prev);
    if (!liked) {
      Alert.alert("💖", "Hai messo Mi piace a questo post!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Dettaglio del Post</Text>

      <View style={styles.card}>
        <Text style={styles.title}>{post?.title}</Text>
        <Text style={styles.body}>{post?.body}</Text>
      </View>

      <Pressable
        onPress={toggleLike}
        style={[
          styles.likeButton,
          { backgroundColor: liked ? "#06d6a0" : "#e63946" },
        ]}
      >
        <Text style={styles.likeText}>
          {liked ? "💚 Piace già" : "❤️ Mi piace"}
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
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#1d3557",
  },
  card: {
    backgroundColor: "#f8f9fa",
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginBottom: 10,
  },
  body: {
    fontSize: 16,
    color: "#444",
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
