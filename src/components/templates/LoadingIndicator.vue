<template lang="pug">
  b-row(
    class="text-center thumbnail-container")
      b-col(sm="12")
        p Please wait while page loads...
        img(:src="require(`@/assets/loading-trans.gif`)" width="50")
</template>

<script>
export default {
  name: 'LoadingIndicator'
}
</script>
