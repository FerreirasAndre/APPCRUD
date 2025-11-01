// src/services/produtosService.js
import {
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  query,
  orderBy,
  onSnapshot,
  updateDoc,
  deleteDoc,
  serverTimestamp,

} from "firebase/firestore";

const produtosCollection = collection(db, "produtos");
import { db } from "./firebaseConnections";
// criar
export const criarProduto = async (produto) => {
  const payload = {
    nome: produto.nome,
    preco: produto.preco,
    descricao: produto.descricao,
    createdAt: serverTimestamp()
  };
  const ref = await addDoc(produtosCollection, payload);
  return ref.id;
};

// ler todos (snapshot em tempo real)
export const subscribeProdutos = (callback) => {
  const q = query(produtosCollection, orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    const itens = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    callback(itens);
  });
};

// ler todos uma vez
export const obterProdutos = async () => {
  const snap = await getDocs(produtosCollection);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

// ler um por id
export const obterProdutoPorId = async (id) => {
  const docRef = doc(db, "produtos", id);
  const d = await getDoc(docRef);
  if (!d.exists()) return null;
  return { id: d.id, ...d.data() };
};

// atualizar
export const atualizarProduto = async (id, dados) => {
  const docRef = doc(db, "produtos", id);
  await updateDoc(docRef, { ...dados, updatedAt: serverTimestamp() });
};

// deletar
export const deletarProduto = async (id) => {
  const docRef = doc(db, "produtos", id);
  await deleteDoc(docRef);
};
