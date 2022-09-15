<template>
  <div class="site-main">

    <div class="top-container">
      <div class="header-box">
        top
      </div>
    </div>

    <div class="left-container">
      <div class="left-sidebar">

        <div class="sidebar-buttons sidebar-buttons-shown">

          <button class="sidebar-button"
           :class="(panel === 'text' ? 'selected': '')" @click="showPanel('text')">
            <div class="sidebar-button-icon">
              <ChatBubbleBottomCenterTextIcon/>
            </div>
            <div class="sidebar-text">
              Text
            </div>
          </button>

          <button class="sidebar-button"
           :class="(panel === 'image' ? 'selected': '')" @click="showPanel('image')">
            <div class="sidebar-button-icon">
              <PhotoIcon/>
            </div>
            <div class="sidebar-text">
              Image
            </div>
          </button>

        </div>

        <PanelLeft title="Image" caption="lorem ipsum" nameRef="image" v-show="panel == 'image'" :show="panel">
          <button @click="addRect">click</button>
        </PanelLeft>

        <PanelLeft title="Text" caption="lorem ipsum" nameRef="text" v-show="panel == 'text'" :show="panel">
          <button @click="addRect">click</button>
        </PanelLeft>

      </div>
    </div>

    <div class="right-container"></div>

    <div class="bottom-container">
      bottom
    </div>

    <!-- <div :style="{
      backgroundImage: `url(${image})`
    }"> -->
      <canvas id="canvas"></canvas>
    <!-- </div> -->

  </div>
</template>

<script>
import { fabric } from "fabric";
import { ChatBubbleBottomCenterTextIcon, PhotoIcon } from '@heroicons/vue/24/outline'
import image from '@/assets/tshirt.jpg'
import PanelLeft from '@/components/PanelLeft'

// const width = window.innerWidth
// const height = window.innerHeight

// console.log(width)
let canvas
// let rect
// let ctx
export default {
  name: 'HomeView',
  components: {
    ChatBubbleBottomCenterTextIcon,
    PhotoIcon,
    PanelLeft
  },
  data() {
    return {
      canvas: {
        width: null,
        height: null,
      },
      panel: 'image',
      image: image
    }
  },
  mounted() {
    canvas = new fabric.Canvas('canvas',{
        // width: width,
        // height: height,
        backgroundColor: 'white',
        // preserveObjectStacking: true,
        // isDrawingMode: true,
        // overlayColor: {
        //   source: 'http://fabricjs.com/assets/escheresque_ste.png'
        // },

        controlsAboveOverlay : true,
    })
    fabric.Object.prototype.transparentCorners = false
    // canvas.setWidth(width)
    // canvas.setHeight(height)

    fabric.Image.fromURL(image, function (img) {
      console.log(img)

      const width = img.width
      const height = img.height

      canvas.setWidth(width)
      canvas.setHeight(height)
      // img.centeredScaling = true
      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
        scaleX: 1,
        scaleY: 1
      })
      // canvas.setOverlayImage(img, canvas.renderAll.bind(canvas), {
      //   // Needed to position overlayImage at 0/0
      //   opacity: 0.9,
      //   originX: 'left',
      //   originY: 'top',
      //   scaleX: 1,
      //   scaleY: 1,
      // })
      // img.scale(0.5).set({
      //   width: height,
      //   height: width,
      //   // left: height,
      //   // top: width/12,
      // })
      // img.scaleToWidth(300, false)

      // canvas.insertAt(img, 0)

      // const boundingBox = new fabric.Rect({
      //   fill: "white",
      //   width: width/2,
      //   height: height/2,
      //   hasBorders: false,
      //   hasControls: false,
      //   lockMovementX: true,
      //   lockMovementY: true,
      //   evented: false,
      //   stroke: "red"
      // })
      // canvas.add(boundingBox)
      // canvas.centerObject(boundingBox)

      // canvas.on('object:moving', (e) => {
      //   var obj = e.target;

      //   obj.set({
      //     top: Math.min(Math.max(obj.top, 0), boundingBox.height - boundingBox.height),
      //     left: Math.min(Math.max(obj.left, 0), boundingBox.width - boundingBox.width),
      //   })
      //   obj.setCoords();
      // });

      // const rect = new fabric.Rect({
      //     top : width/5,
      //     left : height/4,
      //     width : width/2,
      //     height : height/2,
      //     // fill: 'rgba(0, 0, 0, 0)',
      //     selectable: false,
      //     // stroke: 'rgba(0,255,0,1)',
      //     strokeWidth: 1,
      //     // evented: false
      // })
      // canvas.clipPath = rect
      // canvas.add(rect)
      // canvas.centerObject(rect)


      // canvas.on("mouse:down", function () {
      //   // ctx = canvas.getContext("2d");
      //   // ctx.beginPath();
      //   // ctx.rect(
      //   //   width/4, 60, width/2, 390
      //   // ); //specify bounded rectangle
      //   // ctx.closePath();
      //   // ctx.clip();
      //   // ctx.save();
      // })

      // const rect = new fabric.Rect({
      //     top : width/5,
      //     left : height/4,
      //     width : width/2,
      //     height : height/2,
      //     fill: 'green',
      //     selectable: false,
      //     strokeWidth: 1,
      // })
      // const cliptObj = new fabric.Rect({
      //     // top : 0,
      //     // left : 0,
      //     width : width,
      //     height : height,
      //     fill : 'red'
      // })
      // const group = new fabric.Group([cliptObj, rect])
      // canvas.add(group)
      // canvas.centerObject(cliptObj)
      // canvas.bringToFront(cliptObj)
    })

//     var h = new fabric.Rect({width: canvas.width, height: canvas.height, fill: 'rgba(0,0,0,0.5)'})
// var z = new fabric.Circle({radius: 100, top:100, left: 100, globalCompositeOperation: 'destination-out'})
// canvas.add(h).add(z)

    // canvas.on ("object:moving", function (event) {
    //     var el = event.target;
    //     console.log(el)

    //     // suppose el coords is center based

    //     // el.left = el.left < el.getBoundingRectWidth() / 2 ? el.getBoundingRectWidth() / 2 : el.left;
    //     // el.top = el.top < el.getBoundingRectHeight () / 2 ? el.getBoundingRectHeight() / 2 : el.top;

    //     // var right = el.left + el.getBoundingRectWidth() / 2;
    //     // var bottom = el.top + el.getBoundingRectHeight() / 2;

    //     // el.left = right > canvas.width - el.getBoundingRectWidth() / 2 ? canvas.width - el.getBoundingRectWidth() / 2 : el.left;
    //     // el.top = bottom > canvas.height - el.getBoundingRectHeight() / 2 ? canvas.height - el.getBoundingRectHeight() / 2 : el.top;
    // });

    // canvas.on("mouse : up",function(){
    //   ctx.restore(); //restore the context
    // })

    // fabric.Image.fromURL(image,function(img) { 
    //   // oImg.globalCompositeOperation = 'source-atop';
    //   // oImg.width = canvas.width;
    //   // oImg.heigth = canvas.height;
    //   // canvas.add(oImg);
    //   // var rect = new fabric.Rect({
    //   //   width: 200,
    //   //   height: 200,
    //   //   globalCompositeOperation: 'destination-over',
    //   //   fill: 'black'
    //   // });
    //   // canvas.add(rect);  
      
    //   canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
    //     scaleX: canvas.width / img.width,
    //     scaleY: canvas.height / img.height
    //   })
    // })

    const rectObj = new fabric.Rect({
        top : 100,
        left : 100,
        width : 60,
        height : 70,
        fill : 'blue'
        // clipPath: rect
    })
    canvas.add(rectObj)
    canvas.centerObject(rectObj)

    // canvas.setZoom(5)

  //   canvas.setOverlayColor({
  //     source: 'rgba(255, 73, 64, 0.6)',
  //     offsetX: 200,
  // offsetY: 100
  //   }, canvas.renderAll.bind(canvas));

    // canvas.setDimensions({
    //   width: 100,
    //   height: 100,
    // }, {
    //   cssOnly: true
    // })
  },
  methods: {
    addRect() {
      // console.log(canvas)
      const obj = new fabric.Rect({ top: Math.random()*100, left: Math.random()*100, width: 50, height: 50, fill: '#234' })
      obj.clipTo = function(ctx) {
        ctx.rect(
          this.width/5,
          this.height/4,
          this. width/2,
          this.height/2,
        );
      }
      canvas.add(
        obj
      )
      canvas.centerObject(obj)
    },


    showPanel(name) {
      this.panel = name
    },
  }
}
</script>
<style lang="scss">
  *{margin: 0; padding: 0;}

  body {
      background-color: #f8f8f8!important;
  }

  canvas {
    margin: 109px 0px 88px 526px;
    // background: url(image) no-repeat;
  }


  .sidebar-button {
    background-color: unset;
    border: none;
    color: #000;
    cursor: pointer;
    height: auto;
    max-height: 100%;
    min-height: auto;
    padding: 8px 0;
    width: 80%;

    &.selected {
      font-weight: 700;
    }
    &.selected .sidebar-button-icon {
        background-color: #000;
        color: #FFF;
    }

    .sidebar-button-icon {
      align-items: center;
      border-radius: 50%;
      display: flex;
      height: 24px;
      justify-content: center;
      line-height: 0;
      margin: auto;
      transition: background-color .2s ease-out;
      vertical-align: middle;
      width: 24px;

      svg {
          width: 14px;
      }
    }

    .sidebar-text {
      font-size: 0.667rem;
      line-height: 1.5;
      letter-spacing: -.01em;
    }
  }

  .site-main {
    display: block;
    min-height: 100vh;
    position: relative;
    z-index: 1;

    .top-container {
      position: fixed;
      width: 100%;
      z-index: 4;

      .header-box {
        align-items: center;
        background: #fff;
        border-bottom: 1px solid #dfdfdf;
        display: flex;
        grid-area: header;
        height: 90px;
        justify-content: space-between;
        position: -webkit-sticky;
        position: sticky;
        top: 0;
        z-index: 1000001;
      }
    }

    .left-sidebar {
      display: flex;
      height: 100%;
      min-width: max-content;
      align-items: flex-start;
      z-index: 10;

      .sidebar-buttons {
        align-items: center;
        -webkit-backdrop-filter: blur(10px);
        backdrop-filter: blur(10px);
        background: #f8f8f8e6;
        flex-direction: column;
        left: -80px;
        opacity: 0;
        overflow-y: auto;
        padding-top: calc(56px + 47px);
        pointer-events: all;
        position: relative;
        text-align: center;
        transition: left .3s ease-out .5s,opacity .3s ease-out .5s;
        width: 92px;

        &.sidebar-buttons-shown {
          left: 0;
          opacity: 1;
        }
      }

      .sidebar-panels {
        flex-grow: 0;
        left: 62px;
        margin-left: 4px;
        margin-top: 76px;
        opacity: 0;
        pointer-events: all;
        transition: left .3s ease-out .5s,opacity .3s ease-out .5s;

        &.sidebar-panels-shown {
          left: 92px;
          opacity: 1;
        }

        .floating-sidebar-panel {
          align-items: flex-start;
          background: #fff;
          border: 1px solid #f8f8f8;
          border-radius: 16px;
          box-shadow: 0 5px 10px #0000001a;
          display: flex;
          flex-direction: column;
          height: auto;
          max-height: 500px;
          min-height: auto;
          overflow-y: auto;
          position: relative;
          transition: box-shadow .5s;
          width: 330px;

          @media only screen and (min-width: 1440px) {
            max-height: 550px;
          }

          @media only screen and (min-width: 768px) {
            .studio-panel-content {
              padding: 32px 24px;
            }
          }

          // .studio-text-panel-content {
          //   height: calc(100vh - 251px);
          // }

          .add-sheet-panel 
          .studio-image-panel-content, 
          .floating-sidebar-panel 
          .studio-panel-content {
              padding-bottom: 0;
          }

          .studio-text-panel-content {
            height: auto;
            overflow-y: auto;
          }
        }

        .button-icon-visibility {
          max-height: calc(100vh - 90px - 56px - 52px - 0px - 40px);
        }

        .panel-title {
          font-size: 1rem;
          line-height: 1.5;
          font-weight: 700;
          letter-spacing: -.01em;
          margin-bottom: 0;
          padding-bottom: 8px;
        }

        .panel-desc {
          font-size: 0.778rem;
          line-height: 1.5;
          letter-spacing: -.01em;
          color: #666666;
          margin-bottom: 0;
          margin-top: 0;
        }
      }
    }

    .bottom-container {
        bottom: 0;
        width: 100%;
    }

    .right-container {
      right: 0;
    }

    .left-container, 
    .right-container {
        height: calc(100vh - 90px - 52px);
        pointer-events: none;
        top: 90px;
        width: -webkit-min-content;
        width: min-content;
    }

    .bottom-container, 
    .left-container, 
    .right-container {
        position: fixed;
        z-index: 2;
    }
  }
</style>
