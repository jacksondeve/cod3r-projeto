import vue from 'vue'
import VueMq from 'vue-mq'

vue.use(VueMq, {
    breakpoints:{
        xs576,
        sm:768,
        md:960,
        lg:1140,
        xl:Infinity 
    }
})