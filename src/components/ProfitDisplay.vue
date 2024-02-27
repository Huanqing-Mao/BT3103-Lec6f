<template>
    <h2>Current portfolio</h2>
    <table id="table" class="table">
        <thead>
            <tr>
                <th>S.No</th>
                <th>Coin</th>
                <th>Ticker</th>
                <th>Buy_Price</th>
                <th>Buy_Quantity</th>
                <th>Current_Price</th>
                <th>Profit</th>
                <th>Options</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(coin, index) in coins" :key="coin.id">
                <td>{{ index + 1 }}</td>
                <td>{{ coin.Coin }}</td>
                <td>{{ coin.Ticker }}</td>
                <td>{{ coin.Buy_Price }}</td>
                <td>{{ coin.Buy_Quantity }}</td>
                <td>{{ coin.Current_Price }}</td>
                <td>{{ coin.Profit }}</td>
                <td><button @click="deleteInstrument(coin.Coin)">Delete</button></td>
            </tr>

        </tbody>
        

    </table>
    <br><br>
    <h2> Your Total Profit is : $ {{ totalProfit }} </h2>
</template>

<script>
import firebaseApp from "../firebase.js"
import { getFirestore, collection, doc, getDocs, setDoc, deleteDoc } from "firebase/firestore";
import ccxt from "ccxt";

const db = getFirestore(firebaseApp);

export default {
    data() {
        return {
        coins: [],
        totalProfit: 0
        };
    },
    async mounted() {
        await this.display();
    },
    methods: {
        async display() {
            const q = collection(db, "currencies")
            let allDocuments = await getDocs(q)
            this.coins = allDocuments.docs.map( doc => ({
                id: doc.id,
                ...doc.data(),
                Current_Price: 0,
                Profit: 0
            }));
            await Promise.all(this.coins.map(coin => this.calculateProfit(coin)));
        }, 
        async getCurrentPrice(ticker) {
            const binance = new ccxt.binance;
            const x = await binance.fetch_ohlcv(ticker, "5m")
            return x[499][4];

        }, 
        async calculateProfit(coin) {
            const currentPrice = await this.getCurrentPrice(coin.Ticker);
            coin.Current_Price = currentPrice;
            coin.Profit = Math.round((parseInt(coin.Buy_Quantity) * (parseFloat(currentPrice) - parseFloat(coin.Buy_Price))));
            this.totalProfit += parseFloat(coin.Profit);
        },
        async deleteInstrument(name) {
            alert("You are going to delete " + name);
            await deleteDoc(doc(db, "currencies", name));
            this.coins = [];
            this.totalProfit = 0;
            await this.display();
        }
    }
}
</script>