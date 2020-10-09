<template>
  <div class="home page-layout qui-fx">
   首页
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import Tools from '@u/tools'
export default {
  name: 'Home',
  components: {

  },
  data() {
    return {
 
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  mounted() {
  },
  methods: {
  
  }
}
</script>
<style lang="less" scoped>

</style>
