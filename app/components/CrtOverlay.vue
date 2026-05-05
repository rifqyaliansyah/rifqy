<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const canvasRef = ref(null)
let animFrame = null
let frameCount = 0

onMounted(() => {
    const canvas = canvasRef.value
    const ctx = canvas.getContext('2d')

    const resize = () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const drawNoise = () => {
        const w = canvas.width
        const h = canvas.height
        const img = ctx.createImageData(w, h)
        const d = img.data
        for (let i = 0; i < d.length; i += 4) {
            const v = Math.random() < 0.5 ? 255 : 0
            d[i] = v; d[i + 1] = v; d[i + 2] = v
            d[i + 3] = Math.random() * 90
        }
        ctx.putImageData(img, 0, 0)
    }

    const loop = () => {
        frameCount++
        if (frameCount % 2 === 0) drawNoise()
        animFrame = requestAnimationFrame(loop)
    }
    loop()

    onUnmounted(() => {
        cancelAnimationFrame(animFrame)
        window.removeEventListener('resize', resize)
    })
})
</script>

<template>
    <div class="crt-wrap">
        <canvas ref="canvasRef" class="crt-noise" />
        <div class="crt-scanlines" />
        <div class="crt-vignette" />
    </div>
</template>

<style scoped>
.crt-wrap {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 9999;
}

.crt-noise {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    opacity: 0.08;
}

.crt-scanlines {
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(to bottom,
            transparent 0px,
            transparent 2px,
            rgba(0, 0, 0, 0.2) 2px,
            rgba(0, 0, 0, 0.2) 4px);
}

.crt-vignette {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at center, transparent 55%, rgba(0, 0, 0, 0.7) 100%);
}
</style>