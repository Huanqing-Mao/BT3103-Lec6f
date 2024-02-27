<template>
    <div class="second-section">
    
        <form id="userForm">
            <h1>Add Coins</h1>

            <div class = "formli">
                <label for="coin1">Coin Name:</label>
                <input type="text" id="coin1" v-model="coin" placeholder="Enter Coin"><br><br>

                <label for="ticker1">Ticker:</label>
                <input type="text" id="ticker1" v-model="ticker" placeholder="Valid Ticker"><br><br>

                <label for="buy1">Buy Price: </label>
                <input type="text" id="buy1" v-model="buyPrice" placeholder="Buy Price"><br><br>

                <label for="quant1">Buy Quantity:</label>
                <input type="text" id="quant1" v-model="buyQuantity" placeholder="Quantity"><br><br>

                <button id="savebutton" type="button" v-on:click = "saveInfo" >Save</button>
                <br><br>

            </div>

        </form>
    </div>

</template>

<script>
import firebaseApp from "../firebase.js";
import {getFirestore, collection, doc, getDocs, setDoc, deleteDoc} from "firebase/firestore";
const db = getFirestore(firebaseApp);

export default {
    data() {
        return {
            coin: '',
            ticker: '',
            buyPrice: '',
            buyQuantity: ''
        };
    },
    methods: {
        async saveInfo() {            
            const myCollection = collection(db, "currencies");
            const myDocument = doc(myCollection, coin);

            const data = {
                Coin: this.coin,
                Ticker: this.ticker,
                Buy_Price: this.buyPrice,
                Buy_Quantity: this.buyQuantity,
                
            }

            alert("Saving your data for coin: " + this.coin);

            try {
                await setDoc(myDocument, data)
                console.log("Document written successfully")
                console.log(docRef)
                // emit this info, so that the parent component can update the profit value
                this.$emit("added")
                this.resetForm()
                // window.location.reload();

            } catch (error) {
                console.error("Error adding documents");
            }
        }, 
        resetForm() {
            this.coin = '';
            this.ticker = '';
            this.buyPrice = '';
            this.buyQuantity = '';
        }

    }
}
</script>
