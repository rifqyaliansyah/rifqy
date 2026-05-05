<template>
    <div>
        <CrtOverlay />
        <Header />
        <main>
            <slot />
        </main>
    </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=VT323&family=Share+Tech+Mono&display=swap');

*,
*::before,
*::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

html {
    scroll-behavior: smooth;
}

body {
    background-color: #0a0a0a;
    color: #f0f0f0;
    min-height: 100vh;
    overflow-x: hidden;
}

::selection {
    background: #f0f0f0;
    color: #0a0a0a;
}

::-webkit-scrollbar {
    width: 3px;
}

::-webkit-scrollbar-track {
    background: #0a0a0a;
}

::-webkit-scrollbar-thumb {
    background: #282828;
}
</style>