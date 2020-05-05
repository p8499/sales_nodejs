<template>
    <div id="app">
        <div>
            <div>
                <span>DEMO管理系统</span>
            </div>
            <div style="margin-left: 48px;">
                <img src="" alt="" @click="menuShown = !menuShown"/>
                <pac-menu :shown="menuShown" :value="menuModel"/>
            </div>
        </div>
        <keep-alive>
            <router-view v-if="$route.meta['alive']"/>
        </keep-alive>
        <router-view v-if="!$route.meta['alive']"/>
    </div>
</template>
<script lang="ts">
    import {Vue} from "vue-property-decorator";
    import Component from "vue-class-component";
    import menu from "@/menu";
    import pages from "@/pages";

    @Component({name: 'app'})
    export default class App extends Vue {
        menuModel = menu;
        pagesModel = pages;
        menuShown = false;

        created(): void {
            // debugger
        }
    }
</script>
<style lang="scss">
    html, body {
        width: 100%;
        height: 100%;
        margin: 0;
    }

    #app {
        width: 100%;
        height: 100%;
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;

        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: stretch;
        align-items: stretch;

        //bar
        > :nth-child(1) {
            flex-shrink: 0;
            height: 45px;
            background-color: #1e4a6d;
            padding: 0 16px 0 16px;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: stretch;
            align-items: center;

            //title
            > :nth-child(1) {
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                justify-content: start;
                align-items: center;

                > span {
                    font-size: 16px;
                    font-weight: bold;
                    color: white;
                }
            }

            //icons
            > :nth-child(2) {
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                justify-content: start;
                align-items: center;

                > img:nth-of-type(1) {
                    content: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3NpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NDkxMSwgMjAxMy8xMC8yOS0xMTo0NzoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphNjYzNjljOS1lN2RjLTRhNWQtYWEyMy03MmNmNzQxZGZhYTQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Q0Y2RENFNTdFMkJDMTFFMzgyQURENzhBRThFOTNERTkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Q0Y2RENFNTZFMkJDMTFFMzgyQURENzhBRThFOTNERTkiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OGZhNDA2ZDctNzFlYi00Yzk5LTk5MzUtNTBlOGRlZGEzMmNmIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOmE2NjM2OWM5LWU3ZGMtNGE1ZC1hYTIzLTcyY2Y3NDFkZmFhNCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pp3jroUAAAHFSURBVHja7JaxSsNQFIYbKa1DID6Ak1CIiyjGKZMO3TsJnWIhs/gE+gYFoVMhZOrg0r2DuIhiCxURLAgu+gKBTlWp/4G/EC73JkVoXAx83KT3nvP33HvOSaz5fF5a9bVWKuAqRKSct+B2PNnG0AJ14IIKmIEJGIDI33NfsnxYpjOBcwdDGwSyLjWVACf1LA5icAaxZOntgsAmhgdwAj5BB/igCkcbMvK5w3lZN6RdfiSMYAhq4Ak04PgtYzu3MPTBDngFB2pEukjaKQFfBOCoDNZ1IvwDPtfXaG/eLh5ywIOVCKacssEY855BSNY1aBfQjzGSFg+5q9kiyaw7OLiQyAwRdWnfyhKpc+xlpPw5uIeQq5nvKX60IgvDUU757INHCNnK7yPFj1ZECi1B6LMlCrmqFjPtEvoxisgiB/+w8pv2QTuHfowiE45qFkn2XILvHB1P8aMVGXBsKtvwBU5xuwtuMkSaih+tSMReFLKS1TR9Boe4PQbvmsoPaR8ZRdhNYx5cX5M9i3VXzKApBWy2FrGL1a5cSO/Stnp202sKzVjJUmgjSVNmkcczCBmBCBxh/uNP3idW3ofESt+M/18ruutHgAEAz1TKENYUzFQAAAAASUVORK5CYII=");
                    cursor: pointer;

                    &:hover {
                        content: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3NpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NDkxMSwgMjAxMy8xMC8yOS0xMTo0NzoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphNjYzNjljOS1lN2RjLTRhNWQtYWEyMy03MmNmNzQxZGZhYTQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RjEwRDQzRDhFMkM5MTFFMzgyQURENzhBRThFOTNERTkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RjEwRDQzRDdFMkM5MTFFMzgyQURENzhBRThFOTNERTkiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ZmExOWFjOWUtYjY3Zi00YzQ2LWI2N2MtOWMwMGNjOWM3ZmRiIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOmE2NjM2OWM5LWU3ZGMtNGE1ZC1hYTIzLTcyY2Y3NDFkZmFhNCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PqboMzkAAAFjSURBVHja7JYxTsMwFIYTVBmEKjkDIxMT2Rgy5SAMvQRXYM+GMucgTByAJRPQsRcoSCwO0PBb+oPMk+00QyMGnvQpym/7/X2un9u07/vk0HGUzBB/xiQHFWiBAT2fLfV8NIP9TgJo0IBd/ztexfuO83QoV8jgHLwwiQE1KIHiuOJ7zXEba67by0RzgY0WXESqTTjeOkZ6H5PGMVhSW4CTiNHSMWrGTHLusREVZOAJFCMVGa7PYyYVP00t9Iz6B7hlZT6jmvOqmMlQchkwGeIRXHpMSmerf/RUXCv2/CtwDDpHz8BWnH479wy8O5qi3jGHtxntpDdhEAqbZCG0jutVrOPtJC0nTQjF9V3M5JnPQuh2S+7A14hJIfJ4Te75XAn9E9yAK/AQMVmJPN67K9Qnkmuw4amb3Cehjvdx6vTLpI6f7e4abuH1IW/h2X5P5GGouCXGqa6lno/lSP//rUyJbwEGAAF8SdijHO4MAAAAAElFTkSuQmCC");
                    }
                }
            }
        }

        //body
        > :nth-child(2) {
            flex-shrink: 1;
            /*flex-grow: 1;*/
        }
    }


</style>
