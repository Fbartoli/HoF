<template>
<style>
  :root {
    --background: {{color_for('background')}};
    --accent: {{color_for('accent')}};
    --container: {{color_for('container')}};
    --container-faded: {{color_for('container-faded')}};
    --card: {{color_for('card')}};
    --stats: {{color_for('stats')}};
    --text: {{color_for('text')}};
    --text-faded: {{color_for('text-faded')}};
    --whale: {{color_for('whale')}};
  }
</style>
</template>

<script>
export default {
  name: 'ColorVariables',
  data() {
    return {
      color_palette_length: 6,
      default_colors: {
        'background': "#101820",
        'container': "#1D252D", 
        'card': "#1D252D", 
        'stats': "#333F48", //smoke
        'accent': "#26D07C",
        'text': "#FFFFFF",
        'whale': "#41B6E6",
      },
      pallete_enum: {
        'background': 0,
        'container': 1,
        'stats': 2,
        'accent': 3,
        'text': 4,
        'whale': 5,
      }
    }
  },
  computed: {
    color_pallete() {
      const theme = decodeURI(this.$route.query.theme || '')
      // console.log("theme", this.$route.query.theme)
      if (theme && theme.split(',').length >= this.color_palette_length) {
        return theme.split(',')
      }
      return null
    },
  },
  methods: {
    color_for(name) {
      var search_name = name
      var alpha = ''
      if (name.includes('-faded')) {
        alpha = '80'
        search_name = name.replace('-faded', '')
      }
      if (this.color_pallete) {
        return `#${this.color_pallete[this.pallete_enum[search_name]]}${alpha}`
      }
      return `${this.default_colors[search_name]}${alpha}`
    }
  },
};
</script>

<style lang="postcss" scoped>

</style>
