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
                        <input type="text" class="full-width" placeholder="Username"/>
                    </p>
                    <p>
                        <input type="password" class="full-width" input placeholder="Password"/>
                    </p>
                    <p>
                        <button class="primary full-width" @click="testMethod">Sign In</button>
                    </p>
                </form>
          </div>

          <!-- Footer-->
          <div slot="footer">
              <div class="auto flex">
                <button @click="testMethod">
                  About iJason
                </button>
              </div>
        </div>
    </div>
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
