<template>
  <div class="logo" style="font-size: 22px;">
    <span v-if="!slideTag" style="padding-left: 6px">全品平安校园云平台</span>
    <img v-if="slideTag" style="width: 28px; height: 28px; display: inline-block; margin-left: 5px; margin-top: -5px" :src="logo" alt="">
  </div>
</template>

<script>
import logo from '@a/img/logo.png'
export default {
  name: 'Logo',
  props: {
    slideTag: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      logo
    }
  },
  components: {
  }
}
</script>
