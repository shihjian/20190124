<template>
    <div>
    <div @click="getCart()"><div @click="openCart()"><img src="@/assets/imgs/shoppingcart.png" class="cart-position"></div></div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light" >
    <a  href="#" class="title-text" ><i class="fas fa-mug-hot mr-1"></i>墨 咖啡</a>
    <div class="collapse navbar-collapse "  id="navbarNav">
        <ul class="navbar-nav ml-auto" >
        <li class="nav-item">
            <a class="nav-link" href="#/login">管理者登入<span class="sr-only">(current)</span></a>
        </li>
        </ul>
    </div>
    </nav>

        <loading :active.sync="isLoading"></loading>
        <div class="container">
        <div class="row ">
        <div class="col-md-4  mt-4"  v-for="item in products" :key="item.id">
            <div class="card border-0 shadow-sm">
                <div style="height: 150px; background-size: cover; background-position: center" :style="{backgroundImage:`url(${item.imageUrl})`}">
                </div>
                <div class="card-body">
                <span class="badge badge-secondary float-right ml-2">{{item.category}}</span>
                <h5 class="card-title">
                    <a href="#" class="text-dark">{{item.title}}</a>
                </h5>
                <p class="card-text">{{item.content}}</p>
                <div class="d-flex justify-content-between align-items-baseline">
                    <div class="h5" v-if="!item.price">{{item.origin_price}}</div>
                    <del class="h6" v-if="item.price">{{item.origin_price}}</del>
                    <div class="h5" v-if="item.price">{{item.price}}</div>
                </div>
                </div>
                <div class="card-footer d-flex">
                <button type="button" class="btn btn-outline-secondary btn-sm" @click="getProduct(item.id)">
                    <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
                    查看更多
                </button>
                <button type="button" class="btn btn-outline-danger btn-sm ml-auto"  @click="addtoCart(item.id)">
                    <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
                    加到購物車
                </button>
                </div>
            </div>
            </div>
            </div>
        </div>
    
        
   
         <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">{{product.title}}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <img :src="product.imageUrl" class="img-fluid" alt="">
                        <blockquote class="blockquote mt-3">
                            <p class="mb-0">{{product.content}}</p>
                            <footer class="blockquote-footer text-right">{{product.description}}</footer>
                        </blockquote>
                        <div class="d-flex justify-content-between align-items-baseline">
                            <div class="h4" v-if="!product.price">{{product.origin_price}}元</div>
                            <div class="h6" v-if="product.price">原價{{product.origin_price}}元</div>
                            <div class="h4" v-if="product.price">現在只要{{product.origin_price}}元</div>
                        </div>
                        <select name="" class="form-control mt-3" v-model="product.num">
                            <option :value="num" v-for="num in 10" :key="num">
                                選購: {{num}} {{product.unit}}
                            </option>
                        </select>
                    </div>
                    <div class="modal-footer">
                        <div class="text-muted text-nowrap mr-3">
                            小計<strong>{{product.num*product.price}}</strong>元
                        </div>
                        <button type="button" class="btn btn-primary" @click="addtoCart(product.id,product.num)">加入到購物車</button>
                    </div>
                </div>
            </div>
        </div>


         <!-- Cart Modal -->
        <div class="modal fade bd-example-modal-lg" id="cartModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">購物車</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-5">
                            <table  class="table mt-5 ml-auto mr-auto">
                                <thead>
                                    <tr>
                                    <th scope="col"  class="text-center"></th>
                                    <th scope="col"  class="text-center">品名</th>
                                    <th scope="col"  class="text-center">數量</th>
                                    <th scope="col"  class="text-center">單價</th>
                                    <th scope="col"  class="text-center">刪除</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in getcarts.carts">
                                        <td class="align-middle" width="100px"><img :src="item.product.imageUrl" class="img-thumbnail" alt=""></td>
                                        <td class="text-center">{{ item.product.title}}</td>
                                        <td class="text-center">{{ item.qty }} {{ item.product.unit }}</td>
                                        <td class="text-center">{{ item.total | currency }}</td>
                                        <td class="text-center"><button type="button" class="btn btn-outline-danger btn-sm" @click="removeCartItem(item.id)"><i class="far fa-trash-alt"></i></button></td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colspan="4" class="text-right">總計</td>
                                        <td class="text-right text-danger"><strong>{{ getcarts.total | currency }}</strong></td>
                                    </tr>
                                </tfoot>
                            </table>
                            <div class="text-center h6 mt-4 text-secondary" >
                                目前尚未選購商品唷！
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" @click="">結帳去</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';
export default {
data(){
        return{
            products:[],
            product:{},
            getcarts:[],
            status:{
                loadingItem:'',
            },
            isLoading:false,
        };
    },
    methods: {
        getProducts(){
        const vm = this;    
        const url = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/products?page`;     
        vm.isLoading=true;
        this.$http.get(url).then((response) => {    
        vm.products=response.data.products;
        console.log(response); 
        vm.isLoading=false;
            });
        },

        getProduct(id){
        const vm = this;    
        const url = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/product/${id}`;     
        vm.status.loadingItem=id;
        this.$http.get(url).then((response) => {    
        vm.product=response.data.product;
        $('#productModal').modal('show');
        console.log(response); 
        vm.status.loadingItem='';
            });
        },
        addtoCart(id,qty = 1){
        const vm = this;    
        const url = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/cart`;     
        vm.isLoading=true;
        const cart ={
            product_id:id,
            qty
        };
        this.$http.post(url,{data:cart}).then((response) => {    
        console.log(response); 
        vm.isLoading=false;
        vm.getCart();
        $('#productModal').modal('hide');
            });
        },
        getCart(){
        const vm = this;    
        const url = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/cart`;     
        vm.isLoading=true;
        this.$http.get(url).then((response) => {    
        vm.getcarts=response.data.data;         
        console.log(response); 
        vm.isLoading=false;
            });    
        },
        openCart(){
        $('#cartModal').modal('show');
        },

        removeCartItem(id){
        const vm = this;    
        const url = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/cart/${id}`;     
        vm.isLoading=true;
        this.$http.delete(url).then((response) => {    
        vm.getCart();     
        console.log(response); 
        vm.isLoading=false;
            });    
        },
    },
    created() {
        this.getProducts();
        this.getCart();
        
    },
};


</script>


<style>

.cart-position{
    position: fixed;
    bottom: 40px;
    right: 40px;
    cursor: pointer;
    
}

.title-text{
    color:black;
    font-weight:900;
}

.animated {
    -webkit-transform: translateY(0);
    transform: translateY(0);
}

.table th, .table td {
    vertical-align:middle;
}
</style>