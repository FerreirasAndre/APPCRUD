import React from "react";
import { View, Text, StyleSheet, ScrollView, Platform, Alert } from "react-native";

export default function DetalhesScreen({ route }) {
  const produto = route.params?.produto;

  if (!produto) {
    Platform.OS === "web"
      ? window.alert("Lista de produtos vazia.")
      : Alert.alert("Erro!", "Lista de produtos vazia.");
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{produto.nome}</Text>

      <View style={styles.cards}>
        <Text style={styles.label}>Preço:</Text>
        <Text style={styles.value}>R$ {Number(produto.preco).toFixed(2)}</Text>
      </View>

      <View style={styles.cards}>
        <Text style={styles.label}>Descrição:</Text>
        <Text style={styles.value}>{produto.descricao}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  cards: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: "#555",
  },
});
