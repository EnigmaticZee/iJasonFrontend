<template>
    <div class="container">
            <!-- Banner logo (iJason) -->
            <div>
                <img v-bind:src="img" class="responsive">
            </div>

            <!-- Form Input -->
            <div class="children">
                <form>
                    <div class="floating-label">
                        <input type="text" inverted="true" required class="full-width" v-model.trim="credentials.username" />
                        <label>Username</label>
                    </div>

                    <div class="floating-label">
                        <input type="password" class="full-width" required v-model="credentials.password" />
                        <label>Password</label>
                    </div>
                    <p>
                        <span class="error"> {{error}}</span>
                    </p>
                    <p>
                        <button class="primary full-width" @click="login()"> <i class="fa fa-sign-in" aria-hidden="true"></i>&nbspSign In</button>
                    </p>
                </form>
          </div>
    </div>
</template>

<script>
    //Import Libraries
    import auth from '../auth'

    export default {
        data: function() {
            return {
                img: require('../assets/logo.jpg'),
                credentials: {
                    username: '',
                    password: ''
                },
                error: ''
            };
        },
        methods: {
            login: function() {
                auth.login(this, this.credentials)
            }
        }
    }
</script>

<style scoped>

    .container{
        display: flex;
        flex-direction: column;
        height:100vh;
        justify-content: flex-start;
        align-items: center;
    }

    .children{
        width:300px;
    }

    .border{
        border: 5px solid red;
    }
    .error {
        color : #D8000C;
        background-color: #FFBABA;

    }
</style>
