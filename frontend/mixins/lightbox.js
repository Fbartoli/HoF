import { mapActions, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('lightbox', ['getLightboxImage', 'getLightboxImageWidth']),
  },
  methods: {
    ...mapActions('lightbox', ['clearLightbox', 'addImageToLightbox']),
    open_lightbox(image, width=null) {
      this.addImageToLightbox({image, width})
      this.toggle_page_scroll(true)
    },
    close_lightbox() {
      this.clearLightbox()
      this.toggle_page_scroll(false)
    },
  },
}