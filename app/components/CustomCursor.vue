<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const cursorRef = ref(null)
const dotRef = ref(null)
const ringRef = ref(null)

let mouseX = -100, mouseY = -100
let ringX = -100, ringY = -100
let raf = null

function onMouseMove(e) {
    mouseX = e.clientX
    mouseY = e.clientY
}

function onMouseOver(e) {
    const el = e.target.closest('a, button')
    if (!el) return
    if (el.tagName === 'A') cursorRef.value.setAttribute('data-state', 'link')
    if (el.tagName === 'BUTTON' || el.classList.contains('cta-btn')) cursorRef.value.setAttribute('data-state', 'btn')
}

function onMouseOut(e) {
    const el = e.target.closest('a, button')
    if (!el) return
    cursorRef.value.removeAttribute('data-state')
}

function animate() {
    dotRef.value.style.transform = `translate(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%))`

    ringX += (mouseX - ringX) * 0.12
    ringY += (mouseY - ringY) * 0.12
    ringRef.value.style.transform = `translate(calc(${ringX}px - 50%), calc(${ringY}px - 50%))`

    raf = requestAnimationFrame(animate)
}

onMounted(() => {
    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout', onMouseOut)
    animate()
})

onUnmounted(() => {
    window.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseover', onMouseOver)
    document.removeEventListener('mouseout', onMouseOut)
    cancelAnimationFrame(raf)
})
</script>

<template>
    <div ref="cursorRef" class="cursor" aria-hidden="true">
        <div ref="dotRef" class="cursor-dot" />
        <div ref="ringRef" class="cursor-ring" />
    </div>
</template>

<style scoped>
.cursor {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 99999;
}

.cursor-dot {
    position: fixed;
    top: 0;
    left: 0;
    width: 5px;
    height: 5px;
    background: #ffffff;
    border-radius: 50%;
    will-change: transform;
    transition: width 0.15s, height 0.15s;
    mix-blend-mode: difference;
}

.cursor-ring {
    position: fixed;
    top: 0;
    left: 0;
    width: 28px;
    height: 28px;
    border: 0.8px solid rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    will-change: transform;
    transition: width 0.2s, height 0.2s, border-color 0.2s;
    mix-blend-mode: difference;
}

.cursor[data-state='link'] .cursor-ring {
    width: 40px;
    height: 40px;
    border-color: rgba(255, 255, 255, 0.9);
}

.cursor[data-state='link'] .cursor-dot {
    width: 2px;
    height: 2px;
}

.cursor[data-state='btn'] .cursor-ring {
    width: 50px;
    height: 50px;
    border-color: rgba(255, 255, 255, 1);
}

.cursor[data-state='btn'] .cursor-dot {
    width: 2px;
    height: 2px;
}
</style>