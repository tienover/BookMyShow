import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { database, auth } from '../../firebase';
import { FontAwesome } from "@expo/vector-icons";
import SHA256 from 'crypto-js/sha256';
import { useNavigation } from '@react-navigation/native';

class Block {
  constructor(prevHash, data) {
    this.prevHash = prevHash;
    this.data = data;
    this.timestamp = new Date();
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return SHA256(this.prevHash + this.timestamp + JSON.stringify(this.data)).toString();
  }
}

class Blockchain {
  constructor() {
    const genesisBlock = new Block("00000", "Genesis Block");
    this.chain = [genesisBlock];
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(data) {
    const lastBlock = this.getLatestBlock();
    const newBlock = new Block(lastBlock.hash, data);
    this.chain.push(newBlock);
  }
}

const coinBlockchain = new Blockchain();

const Profile = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [age, setAge] = useState('');
  const nav = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const snapshot = await database.ref('blockchain/blocks').once('value');
          const blocks = snapshot.val();
          if (blocks) {
            const userBlocks = Object.values(blocks).filter(block => block.data && block.data.id === user.uid);
            const latestUserBlock = userBlocks[userBlocks.length - 1];
            if (latestUserBlock && latestUserBlock.data) {
              setName(latestUserBlock.data.name);
              setAddress(latestUserBlock.data.address);
              setAge(latestUserBlock.data.age);
            }
          }
        }
      } catch (error) {
        console.error('Lỗi khi tải thông tin cá nhân:', error);
      }
    };

    fetchData();
  }, []);

  const handleSaveProfile = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const newBlockData = {
          id: user.uid,
          name: name,
          address: address,
          age: age,
          timestamp: new Date().toLocaleString()
        };

        coinBlockchain.addBlock(newBlockData);
        const newBlockIndex = coinBlockchain.chain.length - 1;

        // Ensure each new block is added sequentially
        const blocksSnapshot = await database.ref('blockchain/blocks').once('value');
        const blocks = blocksSnapshot.val();
        const nextIndex = blocks ? Object.keys(blocks).length : 0;

        await database.ref(`blockchain/blocks/${nextIndex}`).set(coinBlockchain.chain[newBlockIndex]);

        Alert.alert('Thông báo', 'Lưu thông tin thành công');
      }
    } catch (error) {
      console.error('Lỗi khi lưu thông tin cá nhân:', error);
      Alert.alert('Thông báo', 'Có lỗi xảy ra khi lưu thông tin cá nhân!');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ backgroundColor: '#D70B17', height: 50, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#CC3333' }}>
        <View style={{ marginTop: 10, flexDirection: 'row', width: '95%', alignItems: 'center', justifyContent: 'space-between' }}>
          <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => { nav.goBack() }}>
            <FontAwesome name='chevron-left' size={22} color='#fff'></FontAwesome>
          </TouchableOpacity>
          <Text style={{ color: '#fff', fontSize: 22, fontWeight: '700' }}>Hồ sơ cá nhân</Text>
          <Text>    </Text>
        </View>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nhập tên của bạn"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Nhập địa chỉ của bạn"
          value={address}
          onChangeText={setAddress}
        />
        <TextInput
          style={styles.input}
          placeholder="Nhập tuổi của bạn"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />
        <TouchableOpacity style={{ backgroundColor: '#D70B17', padding: 20, borderRadius: 10 }} onPress={handleSaveProfile}>
          <View>
            <Text style={{ color: '#fff', fontSize: 17, fontWeight: 'bold' }}>Lưu thông tin</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});

export default Profile;
