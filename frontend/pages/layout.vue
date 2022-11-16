<template>
  <CollapsingSidePanelContainer :show_left_panel_toggle="true" :show_right_panel_toggle="true" left_back_text="back" right_back_text="back">
    <template v-slot:left-panel>
      <div class="w-full h-screen bg-green-500"></div>
    </template>
    <template v-slot:main-content>
      <div class="h-[200vh] bg-red-500">
        <h1 class="px-10">TITLE</h1>
        <!-- <div class="w-20 h-20 bg-green-800"></div> -->
      </div>
    </template>
    <template v-slot:right-panel>
      <div class="w-full h-screen bg-blue-500"></div>
    </template>
  </CollapsingSidePanelContainer>
</template>

<script>
export default {}
</script>

<style>
</style>