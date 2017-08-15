<template>
    <q-layout>
            <!-- Banner logo (iJason) -->
            <div class="row logo">
                <div>
                    <img v-bind:src="img">
                </div>
            </div>

            <!-- Form Input -->
            <div class="row formInput">
                <div class="auto">
                    <div class="row">
                        <p><input type="text" placeholder="Username"/></p>
                    </div>
                    <div class="row">
                        <p><input type="password" input placeholder="Password"/></p>
                    </div>
                    <div class="row">
                        <p><button class="primary">Sign In</button></p>
                    </div>
                </div>
          </div>

          <div slot="footer" class="toolbar">
              <div class="auto flex justify-center">
                <button @click="testMethod">
                  About iJason
                </button>
              </div>
        </div>
    </q-layout>
</template>

<script>
    export default{
        data: function(){
            return {
                img: require('../assets/logo.jpg')
            };
        },
        methods: {
            testMethod: function()
            {
                alert("TBA");
            }
        }
    }
</script>

<style scoped>

    .formInput{
        top: 45%;
        left: 45%;
        position:fixed;
    }

    .logo{
        top: 10%;
        left: 35%;
        position:fixed;
    }

    .container{
        display: flex;
    }
</style>
