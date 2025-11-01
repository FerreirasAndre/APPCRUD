import React, { useContext, useState, useEffect  } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import {useNavigation} from "@react-navigation/native"
import {subscribeProdutos} from "../service/ProdutosService";


export default function ListaScreen() {
  const navigation = useNavigation();
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeProdutos((itens) => {
      setProdutos(itens); //atualiza o estado do componente com os novos dados.
      setLoading(false); //indica que os dados foram carregados.
    }, (err) => {
      console.error(err);
      setLoading(false);
    });

    return () => unsubscribe(); // limpar listener ao desmontar
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer}
    onPress={()=>{navigation.navigate('Detalhes', {produto:item.id}); }}
    >
      <Text style={styles.produto}>Produto: {item.nome}</Text>
      <Text style={styles.precoProduto}>Preço: R$ {item.preco.toFixed(2)}</Text>
      <Text style={styles.precoProduto}>Descrição: {item.descricao}</Text>
    </TouchableOpacity>
  );

  //Renderização condicional
  if (loading) return <ActivityIndicator style={{flex:1}} size="large" />; 
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Produtos</Text>

      {produtos.length > 0 ? (
        <FlatList
          data={produtos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text style={styles.noDataText}>Nenhum produto cadastrado!</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f0f0f0" 
},
  title: { fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center"
},
  produto: {
    fontSize: 18,
    fontWeight: "bold"
},

 itemContainer: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },


  precoProduto: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
  },
 noDataText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
    marginTop: 50,
  },

});
