// Blockchain.js
import SHA256 from 'crypto-js/sha256';
import { database, auth } from '../firebase'; // Đường dẫn tới file firebase.js

class Block {
  constructor(id, name, age, address, prevHash) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.address = address;
    this.timestamp = new Date().toString();
    this.prevHash = prevHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return SHA256(this.id + this.timestamp + JSON.stringify({ name: this.name, age: this.age, address: this.address })).toString();
  }
}

class Blockchain {
  constructor() {
    this.chain = []; // Mảng chứa các block
    this.createGenesisBlock(); // Tạo block Genesis khi khởi tạo blockchain
  }

  createGenesisBlock() {
    const genesisBlock = new Block("0", "Genesis Block", "0", "0", "00000"); // Tạo block Genesis
    this.chain.push(genesisBlock); // Thêm block Genesis vào chuỗi blockchain
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(name, age, address) {
    const id = Date.now().toString(); // Tạo id duy nhất cho mỗi hồ sơ
    const prevHash = this.getLatestBlock().hash; // Lấy hash của block trước đó
    const newBlock = new Block(id, name, age, address, prevHash);
    this.chain.push(newBlock); // Thêm block mới vào chuỗi blockchain

    // Lưu block mới nhất vào Firebase Realtime Database
    const user = auth.currentUser;
    if (user) {
        const userBlockchainRef = database.ref(`users/${user.uid}/blockchain/blocks/${id}`);
        console.log("Trying to set data to Firebase at path:", userBlockchainRef.toString());
        userBlockchainRef.set(newBlock)
          .then(() => {
            console.log("Block added to blockchain in Firebase");
          })
          .catch(error => {
            console.error("Error adding block:", error);
            Alert.alert('Thông báo', 'Có lỗi xảy ra khi lưu dữ liệu vào Firebase!');
          });
        
    }
  }
}

// Export đối tượng Blockchain để có thể sử dụng ở các component khác
const coinBlockchain = new Blockchain();
export default coinBlockchain;
