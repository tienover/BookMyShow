import { StyleSheet, View, SafeAreaView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Text } from 'react-native-elements';
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from 'react';
import React from 'react';
import { database, auth, firestore } from '../../firebase';
import SHA256 from 'crypto-js/sha256';

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

const Evalute = ({ route, navigation }) => {
    const { idRecruit, idKoc, nameRecruit, nameKoc } = route.params;
    const [stars, setStars] = useState([false, false, false, false, false]);
    const [danhgia, setDanhgia] = useState('');
    const [coinRe, setCoinRe] = useState(0);

    useEffect(() => {
        const getCoin = async () => {
            const user = auth.currentUser;
            if (user) {
                const userId = user.uid;
                await database.ref(ListRecuits/${userId}/${idRecruit}).once('value', (snapshot) => {
                    const data = snapshot.val();
                    if (data) {
                        const salaryRe = data.salaryRe;
                        setCoinRe(salaryRe);
                    }
                });
            }
        };
        getCoin();
    }, [idRecruit]);

    const handleStar = (index) => {
        const newStars = Array(5).fill(false).map((_, i) => i <= index);
        setStars(newStars);
    };

    const handleDone = async () => {
        const [star1, star2, star3, star4, star5] = stars;
        if (star1 || star2 || star3 || star4 || star5) {
            if (danhgia.trim() === '') {
                Alert.alert('Thông báo', 'Bạn chưa nhập đánh giá');
            } else {
                await database.ref(User/${idKoc}/apllyRecruit/${idRecruit}).update({
                    status: 'đã đánh giá'
                });
                await database.ref(User/${idKoc}/evalute/${idRecruit}).update({
                    star1, star2, star3, star4, star5,
                    danhgia,
                    nameRecruit,
                    idbrand: auth.currentUser.uid
                });
                await database.ref(Candidate/${auth.currentUser.uid}/${idRecruit}/${idKoc}).update({
                    status: 'đã đánh giá'
                });
                await database.ref(ListRecuits/${auth.currentUser.uid}/${idRecruit}).once('value', (snapshot) => {
                    const data = snapshot.val();
                    if (data) {
                        const countdone = data.countDone;
                        database.ref(ListRecuits/${auth.currentUser.uid}/${idRecruit}).update({
                            countDone: countdone + 1
                        });
                    }
                });
                const currentUserRef = firestore.collection('users').doc(auth.currentUser.uid);
                const kocUserRef = firestore.collection('users').doc(idKoc);
    
                await firestore.runTransaction(async (transaction) => {
                    const currentUserDoc = await transaction.get(currentUserRef);
                    const kocUserDoc = await transaction.get(kocUserRef);
    
                    if (!currentUserDoc.exists || !kocUserDoc.exists) {
                        throw new Error('User does not exist!');
                    }
                    const currentUserCoin = currentUserDoc.data().coin;
                    const kocUserCoin = kocUserDoc.data().coin;
    
                    const newCurrentUserCoin = Number(currentUserCoin) - Number(coinRe);
                    const newKocUserCoin = Number(kocUserCoin) + Number(coinRe);
    
                    transaction.update(currentUserRef, { coin: newCurrentUserCoin });
                    transaction.update(kocUserRef, { coin: newKocUserCoin });
    
                    // Cập nhật state balance trước khi thêm block mới vào blockchain
    
                    // Thêm giao dịch vào blockchain
                    const newBlockData = {
                        from: auth.currentUser.uid,
                        to: nameKoc,
                        amount: coinRe,
                        balance: newCurrentUserCoin, // sử dụng giá trị balance cập nhật
                        timestamp: new Date().toLocaleString()
                    };
                    coinBlockchain.addBlock(newBlockData);
    
                    // Lưu blockchain vào Firebase, thêm block mới vào danh sách
                    const newBlockIndex = coinBlockchain.chain.length - 1;
                    await database.ref(blockchain/blocks/${newBlockIndex}).push(coinBlockchain.chain[newBlockIndex]);
    
                    Alert.alert('Thông báo', 'Đánh giá và trao coin thành công');
                    navigation.navigate('Candidate');
                });
            }
        } else {
            Alert.alert('Thông báo', 'Đánh giá không thành công');
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ backgroundColor: '#fff', height: 93, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#CC3333' }}>
                <View style={{ marginTop: 55, flexDirection: 'row', width: '95%', alignItems: 'center', justifyContent: 'space-between' }}>
                    <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => { navigation.goBack() }}>
                        <FontAwesome name='chevron-left' size={22} color='#CC3333'></FontAwesome>
                    </TouchableOpacity>
                    <Text style={{ color: '#050505', fontSize: 20, fontWeight: '700' }}>Viết đánh giá</Text>
                    <Text>    </Text>
                </View>
            </View>
            <View style={{ margin: 20 }}>
                <View style={{ padding: 10 }}>
                    <Text style={{ fontSize: 16 }}>Tên KOC: <Text style={{ fontWeight: 'bold' }}>{nameKoc}</Text></Text>
                </View>
                <View style={{ padding: 10 }}>
                    <Text style={{ fontSize: 16 }}>Tên chiến dịch: <Text style={{ fontWeight: 'bold' }}>{nameRecruit}</Text></Text>
                </View>
            </View>
            <View style={{ alignItems: 'center', marginTop: 20 }}>
                <View style={{ flexDirection: 'row' }}>
                    {stars.map((star, index) => (
                        <TouchableOpacity key={index} onPress={() => handleStar(index)}>
                            <AntDesign name={star ? 'star' : 'staro'} size={24} color="#FFD700" />
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            <View>
                <Text style={{ margin: 20, fontSize: 16 }}>Đánh giá của bạn</Text>
                <View style={{
                    height: 100,
                    borderRadius: 10,
                    backgroundColor: '#fff',
                    borderColor: '#ccc',
                   

                    borderWidth: 1,
                    marginVertical: 10,
                    paddingHorizontal: 5
                }}>
                    <TextInput
                        placeholder='nhập đánh giá của bạn'
                        multiline={true}
                        style={{ padding: 5, marginTop: 1, fontSize: 17 }}
                        onChangeText={(text) => { setDanhgia(text) }}
                    />
                </View>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#CC3333', width: '40%', padding: 15, borderRadius: 10 }}
                    onPress={handleDone}
                >
                    <Text style={{ fontSize: 16, color: '#fff', fontWeight: 'bold' }}>Trao coin</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Evalute

const styles = StyleSheet.create({})