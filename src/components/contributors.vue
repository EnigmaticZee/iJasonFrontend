<!-- 
╔═╗┌─┐┌┐┌┌┬┐┬─┐┬┌┐ ┬ ┬┌┬┐┌─┐┬─┐┌─┐
║  │ ││││ │ ├┬┘│├┴┐│ │ │ │ │├┬┘└─┐
╚═╝└─┘┘└┘ ┴ ┴└─┴└─┘└─┘ ┴ └─┘┴└─└─┘                                         
{*=Project Details=============================================================
 |       Name:      iJason Virtual Lab Supervisor
 |       Client:    Jason But
 |       Credits:   Andy Tran
 |       Codepen:   Zaid Shakil
 |=Authors=====================================================================
 |       Ian Adrian
 |       Srisaiyeegharan Kidnapillai
 |       Zaid Shakil
 |       Muhammad Ibrahim
 |       Awais Ghafoor
 |       Anthony Fry
 |=Frameworks===================================================================
 |       Backend:  PHP & MySQL
 |       Frontend: VueJS & Quasar
 |=Note=========================================================================
 |       This component has not been commented as
 |       this is not necessary for the project.
 |==============================================================================
 |       Created: Oct 23, 2017
 |       Updated: Oct 23, 2017
 *===========================================================================-->
<template>
   <div class="container">
      <div class="at-section">
         <div class="at-section__title">
            <a href="index.html" class="at-section">
            <img :src="logo">
            </a>
         </div>
      </div>
      <div class="at-section">
         <div class="at-section__title">Contributors</div>
      </div>
      <div class="at-grid" data-column="3">
         <div class="at-column">
            <div class="at-user">
               <div class="at-user__avatar"><img :src="pic_1"/></div>
               <div class="at-user__name">Muhammad Ibrahim</div>
               <div class="at-user__title"></div>
            </div>
         </div>
         <div class="at-column">
            <div class="at-user">
               <div class="at-user__avatar"><img :src="pic_2"/></div>
               <div class="at-user__name">Ian Adrian</div>
               <div class="at-user__title"></div>
            </div>
         </div>
         <div class="at-column">
            <div class="at-user">
               <div class="at-user__avatar"><img :src="pic_3"/></div>
               <div class="at-user__name">Zaid Shakil</div>
               <div class="at-user__title"></div>
            </div>
         </div>
         <div class="at-column">
            <div class="at-user">
               <div class="at-user__avatar"><img :src="pic_4"/></div>
               <div class="at-user__name">Awais Ghafoor</div>
               <div class="at-user__title"></div>
            </div>
         </div>
         <div class="at-column">
            <div class="at-user">
               <div class="at-user__avatar"><img :src="pic_5"/></div>
               <div class="at-user__name">Srisaiyeegharan Kidnapillai</div>
               <div class="at-user__title"></div>
            </div>
         </div>
         <div class="at-column">
            <div class="at-user">
               <div class="at-user__avatar"><img :src="pic_6"/></div>
               <div class="at-user__name">Anthony Fry</div>
               <div class="at-user__title"></div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
export default {
   data: function(){
      return {
         logo: require('../assets/logo-lowres.jpg'),
         pic_1: require('../contributors/ibi.png'),
         pic_2: require('../contributors/ian.png'),
         pic_3: require('../contributors/zee.png'),
         pic_4: require('../contributors/awi.jpg'),
         pic_5: require('../contributors/sri.jpg'),
         pic_6: require('../contributors/ant.png')
         
      }
   }
}
</script>

<style scoped>
/* Used to align items in continer, horizontal - center */
.at-section__title {
  margin: 0 0 70px;
  color: #000;
  font-family: 'Roboto', sans-serif;
  font-size: 3.5rem;
  font-weight: 300;
  line-height: 2.625rem;
  text-align: center;
}
.at-grid {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
      -ms-flex-direction: row;
          flex-direction: row;
  -ms-flex-wrap: wrap;
      flex-wrap: wrap;
  background: #FFF;
  border: 1px solid #E2E9ED;
}
.at-grid[data-column="1"] .at-column {
  width: 100%;
  max-width: 100%;
  min-width: 100%;
  -ms-flex-preferred-size: 100%;
      flex-basis: 100%;
}
.at-grid[data-column="2"] .at-column {
  width: 50%;
  max-width: 50%;
  min-width: 50%;
  -ms-flex-preferred-size: 50%;
      flex-basis: 50%;
}
.at-grid[data-column="3"] .at-column {
  width: 33.33333%;
  max-width: 33.33333%;
  min-width: 33.33333%;
  -ms-flex-preferred-size: 33.33333%;
      flex-basis: 33.33333%;
}
.at-grid[data-column="4"] .at-column {
  width: 25%;
  max-width: 25%;
  min-width: 25%;
  -ms-flex-preferred-size: 25%;
      flex-basis: 25%;
}
.at-grid[data-column="5"] .at-column {
  width: 20%;
  max-width: 20%;
  min-width: 20%;
  -ms-flex-preferred-size: 20%;
      flex-basis: 20%;
}
.at-grid[data-column="6"] .at-column {
  width: 16.66667%;
  max-width: 16.66667%;
  min-width: 16.66667%;
  -ms-flex-preferred-size: 16.66667%;
      flex-basis: 16.66667%;
}
.at-grid[data-column="7"] .at-column {
  width: 14.28571%;
  max-width: 14.28571%;
  min-width: 14.28571%;
  -ms-flex-preferred-size: 14.28571%;
      flex-basis: 14.28571%;
}
.at-grid[data-column="8"] .at-column {
  width: 12.5%;
  max-width: 12.5%;
  min-width: 12.5%;
  -ms-flex-preferred-size: 12.5%;
      flex-basis: 12.5%;
}
.at-grid[data-column="9"] .at-column {
  width: 11.11111%;
  max-width: 11.11111%;
  min-width: 11.11111%;
  -ms-flex-preferred-size: 11.11111%;
      flex-basis: 11.11111%;
}
.at-column {
  z-index: 0;
  position: relative;
  background: #FFF;
  box-shadow: 0 0 0 1px #E2E9ED;
  padding: 10px;
  box-sizing: border-box;
  -webkit-transition: box-shadow 0.2s ease, z-index 0s 0.2s ease, -webkit-transform 0.2s ease;
  transition: box-shadow 0.2s ease, z-index 0s 0.2s ease, -webkit-transform 0.2s ease;
  transition: box-shadow 0.2s ease, transform 0.2s ease, z-index 0s 0.2s ease;
  transition: box-shadow 0.2s ease, transform 0.2s ease, z-index 0s 0.2s ease, -webkit-transform 0.2s ease;
}
.at-column:before {
  content: "";
  display: block;
  padding-top: 100%;
}
.at-column:hover {
  z-index: 1;
  box-shadow: 0 8px 50px rgba(0, 0, 0, 0.2);
  -webkit-transform: scale(1.05);
          transform: scale(1.05);
  -webkit-transition: box-shadow 0.2s ease, z-index 0s 0s ease, -webkit-transform 0.2s ease;
  transition: box-shadow 0.2s ease, z-index 0s 0s ease, -webkit-transform 0.2s ease;
  transition: box-shadow 0.2s ease, transform 0.2s ease, z-index 0s 0s ease;
  transition: box-shadow 0.2s ease, transform 0.2s ease, z-index 0s 0s ease, -webkit-transform 0.2s ease;
}
.at-column:hover .at-social {
  margin: 16px 0 0;
  opacity: 1;
}
@media (max-width: 800px) {
  .at-column {
    width: 50% !important;
    max-width: 50% !important;
    min-width: 50% !important;
    -ms-flex-preferred-size: 50% !important;
        flex-basis: 50% !important;
  }
}
@media (max-width: 600px) {
  .at-column {
    width: 100% !important;
    max-width: 100% !important;
    min-width: 100% !important;
    -ms-flex-preferred-size: 100% !important;
        flex-basis: 100% !important;
  }
}
.at-user {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  -webkit-transform: translate(0, -50%);
          transform: translate(0, -50%);
  text-align: center;
}
.at-user__avatar {
  width: 200px;
  height: 200px;
  border-radius: 100%;
  margin: 0 auto 20px;
  overflow: hidden;
}
.at-user__avatar img {
  display: block;
  width: 100%;
  max-width: 100%;
}
.at-user__name {
  color: #313435;
  font-family: 'Roboto', sans-serif;
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 2.625rem;
}
.at-user__title {
  color: #6F808A;
  font-family: 'Roboto', sans-serif;
  font-size: 0.875rem;
  line-height: 2.375rem;
}

body {
  background: #FFF;
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.container {
  max-width: 1170px;
  width: 100%;
  margin: 100px auto;
  padding: 0 20px;
  box-sizing: border-box;
  -webkit-transform-origin: top center;
          transform-origin: top center;
  -webkit-transform: scale(0.8);
          transform: scale(0.8);
}
</style>
