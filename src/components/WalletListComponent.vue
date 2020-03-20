<template>
    <b-row>
        <b-col offset="3" md="6">
            <div class="card">
                <b-card-header>
                    <div class="card-title row">
                        <b-col md="4" xs="3">
                            <h2 class="text-left">
                                Wallets
                            </h2>
                        </b-col>
                        <b-col offset="6" md="2" xs="2" class="text-right">
                            <span
                                ><b-icon-plus
                                    font-scale="2.5"
                                    class="rounded bg-primary p-1"
                                    variant="light"
                                    @click="show = !show"
                                ></b-icon-plus
                            ></span>
                        </b-col>
                    </div>
                    <transition name="create">
                        <CreateWallet
                            v-if="show"
                            @onsave="show = false"
                        ></CreateWallet>
                    </transition>
                </b-card-header>
                <div class="card-body">
                    <b-col md="12">
                        <b-table
                            stacked="md"
                            :fields="fields"
                            :items="wallets"
                            striped
                            :per-page="perPage"
                            :current-page="currentPage"
                        >
                            <template v-slot:cell(actions)="row">
                                <b-icon-info
                                    variant="light"
                                    class="bg-primary rounded"
                                    font-scale="2"
                                    @click="details(row.item.id)"
                                    >Details</b-icon-info
                                >&nbsp;
                                <b-icon-x-circle
                                    font-scale="2"
                                    variant="light"
                                    @click="deleteW(row.item.id)"
                                    class="rounded bg-danger"
                                ></b-icon-x-circle>
                            </template>
                        </b-table>
                        <b-pagination
                            v-model="currentPage"
                            :total-rows="wallets.length"
                            :per-page="perPage"
                        ></b-pagination>
                    </b-col>
                </div>
            </div>
        </b-col>
    </b-row>
</template>
<script>
import router from '@/router';
import { mapActions } from 'vuex';
import CreateWallet from './CreateWalletComponent';
export default {
    props: ['wallets'],
    methods: {
        ...mapActions(['deleteWallet']),
        details(id) {
            router.push('/details/' + id);
        },
        deleteW(id) {
            this.deleteWallet({ id: id });
        },
        onsave() {
            this.show = false;
        }
    },
    data() {
        return {
            show: false,
            fields: [
                {
                    key: 'name',
                    label: 'Name'
                },
                { key: 'balance', label: 'Balance' },
                { key: 'actions', label: '' }
            ],
            perPage: 5,
            currentPage: 1
        };
    },
    components: {
        CreateWallet
    }
};
</script>
<style scoped>
.create-enter {
    opacity: 0;
    width: 0px;
}
.create-enter-active {
    transition: all 0.2s ease-out;
}
.create-leave-active {
    transition: all 0.2s ease-out;
    width: 0px;
    opacity: 0;
}
</style>
