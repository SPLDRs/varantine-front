import Vue from 'vue'
import {VueMasonryPlugin} from 'vue-masonry';

Vue.use(VueMasonryPlugin)

let masonryScript = document.createElement('script')
masonryScript.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/masonry/4.0.0/masonry.pkgd.min.js')
    document.head.appendChild(masonryScript)