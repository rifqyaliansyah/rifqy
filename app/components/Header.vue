<script setup>
const navItems = ['About', 'Timeline', 'Works', 'Contact']
</script>

<template>
    <Motion as="header" class="header" :initial="{ opacity: 0 }" :animate="{ opacity: 1 }"
        :transition="{ duration: 0.8, ease: 'easeOut' }">
        <Motion as="a" href="#" class="brand" :initial="{ opacity: 0, x: -16 }" :animate="{ opacity: 1, x: 0 }"
            :transition="{ delay: 0.3, duration: 0.6, ease: 'easeOut' }">
            <span class="brand-at">@</span>rifqy
        </Motion>

        <nav class="nav">
            <template v-for="(item, i) in navItems" :key="item">
                <Motion as="a" :href="`#${item.toLowerCase()}`" class="nav-item" :initial="{ opacity: 0, y: -8 }"
                    :animate="{ opacity: 1, y: 0 }"
                    :transition="{ delay: 0.4 + i * 0.07, duration: 0.4, ease: 'easeOut' }">
                    {{ item }}
                </Motion>
                <span v-if="i < navItems.length - 1" class="sep">//</span>
            </template>
        </nav>
    </Motion>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=VT323&family=Share+Tech+Mono&display=swap');

.header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    height: 72px;
    padding: 0 2.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 0.5px solid #1e1e1e;
    background: rgba(10, 10, 10, 0.9);
    backdrop-filter: blur(10px);
}

.brand {
    font-family: 'VT323', monospace;
    font-size: 2.1rem;
    line-height: 1;
    color: #f0f0f0;
    text-decoration: none;
    letter-spacing: 0.02em;
    text-shadow: 0 0 12px rgba(255, 255, 255, 0.2);
}

.brand-at {
    color: transparent;
    -webkit-text-stroke: 1.5px #f0f0f0;
}

.nav {
    display: flex;
    align-items: center;
    gap: 2px;
}

.nav-item {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.68rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #888;
    /* <-- dari #404040 jadi #888 */
    text-decoration: none;
    padding: 4px 14px;
    position: relative;
    transition: color 0.2s ease;
}

/* underline tumbuh dari tengah */
.nav-item::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 50%;
    transform: translateX(-50%) scaleX(0);
    width: 60%;
    height: 0.5px;
    background: #f0f0f0;
    transition: transform 0.25s ease;
    transform-origin: center;
}

.nav-item:hover {
    color: #f0f0f0;
}

.nav-item:hover::after {
    transform: translateX(-50%) scaleX(1);
}

.sep {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.5rem;
    color: #282828;
    user-select: none;
}
</style>