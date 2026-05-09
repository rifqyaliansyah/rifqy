<template>
    <div class="crt-wrap">
        <canvas ref="canvasRef" class="crt-grain" />
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const canvasRef = ref(null)
let raf = null
let frame = 0

onMounted(() => {
    const canvas = canvasRef.value
    const ctx = canvas.getContext('2d')

    const resize = () => {
        canvas.width = Math.ceil(window.innerWidth / 2)
        canvas.height = Math.ceil(window.innerHeight / 2)
    }

    const draw = () => {
        frame++
        if (frame % 2 === 0) {
            const w = canvas.width
            const h = canvas.height
            const img = ctx.createImageData(w, h)
            const d = img.data
            for (let i = 0; i < d.length; i += 4) {
                const v = Math.random() * 255 | 0
                d[i] = v
                d[i + 1] = v
                d[i + 2] = v
                d[i + 3] = Math.random() * 15 | 0  // was 28
            }
            ctx.putImageData(img, 0, 0)
        }
        raf = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    draw()
})

onUnmounted(() => {
    cancelAnimationFrame(raf)
    window.removeEventListener('resize', resize)
})
</script>

<style scoped>
.crt-wrap {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 9999;
}

.crt-grain {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    image-rendering: pixelated;
    opacity: 0.35;
    mix-blend-mode: screen;
}
</style>