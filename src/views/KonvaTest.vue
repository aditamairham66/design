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

            <button class="sidebar-button selected">
                <div class="sidebar-button-icon">
                <ChatBubbleBottomCenterTextIcon/>
                </div>
                <div class="sidebar-text">
                Text
                </div>
            </button>

            <button class="sidebar-button">
                <div class="sidebar-button-icon">
                <PhotoIcon/>
                </div>
                <div class="sidebar-text">
                Image
                </div>
            </button>

            </div>

            <div class="sidebar-panels sidebar-panels-shown">
            <div class="floating-sidebar-panel button-icon-visibility">
                
                <div class="studio-panel-content studio-text-panel-content">
                <h1 class="panel-title">Title Panel</h1>
                <p class="panel-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

                <button @click="addRect">click</button>
                </div>

            </div>
            </div>

        </div>
        </div>

        <div class="right-container">

        </div>

        <div class="bottom-container">
            bottom
        </div>

        <!-- <v-stage :config="configKonva">
            <v-layer>

                <v-rect
                    :config="rectConfig"
                />
            </v-layer>
        </v-stage> -->

        <div id="container"></div>
    </div>
</template>

<script>
import { ChatBubbleBottomCenterTextIcon, PhotoIcon } from '@heroicons/vue/24/outline'
import Konva from 'konva';

const width = window.innerWidth;
const height = window.innerHeight;
const PADDING = 5
export default {
    name: 'konvaTest',
    components: {
        ChatBubbleBottomCenterTextIcon,
        PhotoIcon,
    },
    data() {
        return {
            // configKonva: {
            //     width: width,
            //     height: height
            // },
            // rectConfig: {
            //     x: width/3,
            //     y: height/5,
            //     width: Math.abs(850),
            //     height: Math.abs(850),
            //     fill: 'rgb(0,0,0,0)',
            //     stroke: 'black',
            //     strokeWidth: 3,
            //     draggable: true,
            // },
        }
    },
    mounted() {
        const stage = new Konva.Stage({
            container: 'container',
            width: width,
            height: height
        });

        const layer = new Konva.Layer();
        stage.add(layer);

        const rectConfig = new Konva.Rect({
            x: width/3,
            y: height/5,
            width: Math.abs(850),
            height: Math.abs(850),
            fill: 'rgb(0,0,0,0)',
            stroke: 'black',
            strokeWidth: 3,
            draggable: true,
        });
        layer.add(rectConfig);
    
        const scrollLayers = new Konva.Layer();
        stage.add(scrollLayers);

        const verticalBar = new Konva.Rect({
            width: 10,
            height: 100,
            fill: 'grey',
            opacity: 0.8,
            x: stage.width() - PADDING - 10,
            y: height/7,
            draggable: true,
            dragBoundFunc: function(pos) {
                pos.x = stage.width() - PADDING - 10;
                pos.y = Math.max(
                    Math.min(pos.y, stage.height() - this.height() - PADDING),
                    PADDING
                );
                return pos;
            }
        });
        scrollLayers.add(verticalBar);
        scrollLayers.draw();

        verticalBar.on('dragmove', function() {
            // delta in %
            const availableHeight =
            stage.height() - PADDING * 10 - verticalBar.height();
            var delta = (verticalBar.y() - PADDING * 20) / availableHeight;

            layer.y(-stage.height() * delta);
            layer.batchDraw();
        });
    }
}
</script>

<style lang="scss">
    *{margin: 0; padding: 0;}
  
    body {
        background: #f8f8f8 !important;
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
  
      .left-container,
      .right-container
       {
          height: calc(100vh - 90px - 52px);
          pointer-events: none;
          top: 90px;
          width: -webkit-min-content;
          width: min-content;
      }
  
      .bottom-container, 
      .left-container, 
      .right-container
       {
          position: fixed;
          z-index: 2;
      }

      .bottom-container {
          bottom: 0;
          width: 100%;
      }
  
      .right-container {
        // min-height: max-content;
        right: 0;
        // pointer-events: all;
        // padding: 50px 50px;
      }
    }
</style>
  