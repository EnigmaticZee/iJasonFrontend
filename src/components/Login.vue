<template>
    <div class="container">
            <!-- Banner logo (iJason) -->
            <div>
                <img v-bind:src="img" class="responsive">
            </div>

            <!-- Form Input -->
            <div class="children">
                <form>
                    <p>
                        <input type="text" class="full-width" v-model.trim="credentials.username" placeholder="Username"/>
                    </p>
                    <p>
                        <input type="password" class="full-width" v-model="credentials.password" placeholder="Password"/>
                    </p>
                    <p>
                        <button class="primary full-width" @click="login()">Sign In</button>
                    </p>
                </form>
          </div>
    </div>
</template>

<script>

    import auth from '../auth'
    export default{
        data: function(){
            return {
                img: require('../assets/logo.jpg'),
                credentials: {
                    username: '',
                    password: ''
                }
            };
        },
        methods: {
            login: function()
            {
                var credentials = {username: this.credentials.username,
                    password: this.credentials.password}

                auth.login(this, credentials, 'units')
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
</style>
