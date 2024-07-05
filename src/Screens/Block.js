import firebase from 'firebase/app';
import 'firebase/database';
import CryptoJS from 'crypto-js';

class Block {
    constructor(prevHash, data) {
        this.prevHash = prevHash;
        this.data = data;
        this.timestamp = new Date().toISOString();
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return CryptoJS.SHA256(this.prevHash + this.timestamp + JSON.stringify(this.data)).toString();
    }

    async addToFirebase() {
        try {
            const database = firebase.database();
            const blocksRef = database.ref('blocks');

            const newBlockRef = blocksRef.push();
            await newBlockRef.set({
                prevHash: this.prevHash,
                data: this.data,
                timestamp: this.timestamp,
                hash: this.hash,
            });

            console.log('Block added to Firebase Realtime Database');
        } catch (error) {
            console.error('Error adding block to Firebase Realtime Database:', error);
        }
    }
}

export default Block;
