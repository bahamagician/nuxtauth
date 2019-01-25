<template>
    <div>
        This is the secret page
    </div>
</template>
<script>
    export default {
        middleware: 'authenticated',
        async asyncData({ $axios }) {
            const ip = await $axios.$get('https://sc-api-v2.dev/api/validate-token');
        }
    }
</script>