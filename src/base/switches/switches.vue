<template>
  <ul class="switch">
    <li class="switch-item"
        v-for="(item , index)  in switches" @click="selectItem(index)"
        :class="{'active':index===currentIndex}"
    >
      <span> {{item.name}} </span>
    </li>
  </ul>
</template>

<script>
  export default {
    props: {
      switches: {
        type: Array,
        default: []
      },
      currentIndex: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {}
    },
    methods: {
      selectItem (index) {
        this.$emit('select', index)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .switch {
    display flex
    width 240px
    margin 0 auto
    border-radius 5px
    border 1px solid $color-highlight-background
    .switch-item {
      flex 1
      padding 8px
      text-align center
      font-size $font-size-medium
      color $color-text-d
      &.active {
        background $color-highlight-background
        color $color-text
      }
    }
  }

</style>
