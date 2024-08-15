<template>
  <div>
    <MarkdownViewer filename="test.md" title="Markdown Test" />
  </div>
</template>

<script>
import MarkdownViewer from '@/components/MarkdownViewer.vue';

export default {
  components: {
    MarkdownViewer
  }
}
</script>