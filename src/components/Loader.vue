<template>
  <div class="loader">
    <div class="loadingio-spinner-ellipsis-at48eveywg6">
      <div class="ldio-ozhk4orlrj">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Loader",
};
</script>

<style scoped>
.loader{
    padding-top: 30vh;
    z-index: 1000;
    display: flex;
    align-items: center;
    flex-direction: column;
    position: fixed;
    height: 100vh;
    width: 100vw;
    background-color: rgba(241, 241, 241, 0.671);
}
@keyframes ldio-ozhk4orlrj {
   0% {
     transform: translate(16.02px, 106.8px) scale(0);
   }

   25% {
     transform: translate(16.02px, 106.8px) scale(0);
   }

   50% {
     transform: translate(16.02px, 106.8px) scale(1);
   }

   75% {
     transform: translate(106.8px, 106.8px) scale(1);
   }

   100% {
     transform: translate(197.57999999999998px, 106.8px) scale(1);
   }
 }

 @keyframes ldio-ozhk4orlrj-r {
   0% {
     transform: translate(197.57999999999998px, 106.8px) scale(1);
   }

   100% {
     transform: translate(197.57999999999998px, 106.8px) scale(0);
   }
 }

 @keyframes ldio-ozhk4orlrj-c {
   0% {
     background: #ffdde2
   }

   25% {
     background: #8daab7
   }

   50% {
     background: #ffa289
   }

   75% {
     background: #ce93d8
   }

   100% {
     background: #ffdde2
   }
 }

 .ldio-ozhk4orlrj div {
   position: absolute;
   width: 53.4px;
   height: 53.4px;
   border-radius: 50%;
   transform: translate(106.8px, 106.8px) scale(1);
   background: #ffdde2;
   animation: ldio-ozhk4orlrj 1.075268817204301s infinite cubic-bezier(0, 0.5, 0.5, 1);
 }

 .ldio-ozhk4orlrj div:nth-child(1) {
   background: #ce93d8;
   transform: translate(197.57999999999998px, 106.8px) scale(1);
   animation: ldio-ozhk4orlrj-r 0.26881720430107525s infinite cubic-bezier(0, 0.5, 0.5, 1), ldio-ozhk4orlrj-c 1.075268817204301s infinite step-start;
 }

 .ldio-ozhk4orlrj div:nth-child(2) {
   animation-delay: -0.26881720430107525s;
   background: #ffdde2;
 }

 .ldio-ozhk4orlrj div:nth-child(3) {
   animation-delay: -0.5376344086021505s;
   background: #ce93d8;
 }

 .ldio-ozhk4orlrj div:nth-child(4) {
   animation-delay: -0.8064516129032258s;
   background: #ffa289;
 }

 .ldio-ozhk4orlrj div:nth-child(5) {
   animation-delay: -1.075268817204301s;
   background: #8daab7;
 }

 .loadingio-spinner-ellipsis-at48eveywg6 {
   width: 267px;
   height: 267px;
   display: inline-block;
   overflow: hidden;
   background: none;
 }

 .ldio-ozhk4orlrj {
   width: 100%;
   height: 100%;
   position: relative;
   transform: translateZ(0) scale(1);
   backface-visibility: hidden;
   transform-origin: 0 0;
   /* see note above */
 }

 .ldio-ozhk4orlrj div {
   box-sizing: content-box;
 }
</style>
