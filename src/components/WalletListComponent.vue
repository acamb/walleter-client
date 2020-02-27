<template>
    <div class='panel panel-default'>
        <h3>Wallets</h3>
        <table class='table table-striped'>
            <tr>
                <th>Name</th>
                <th>Balance</th>
            </tr>
            <tr v-for="wallet in wallets" :key='wallet.id'>
                <td>{{wallet.description}}</td>
                <td>{{wallet.balance}}</td>
            </tr>
        </table>
    </div>
</template>
<script>
export default {
    props:['wallets']
}
</script>