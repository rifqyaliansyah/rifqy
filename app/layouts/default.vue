<template>
    <div class="layout">
        <CrtOverlay />
        <CustomCursor />
        <Header />
        <main class="main">
            <slot />
        </main>
    </div>
</template>

<style>
*,
*::before,
*::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    cursor: none !important;
}

html {
    height: 100%;
}

body {
    height: 100%;
    background-color: #f0ece4;
    color: #1a1612;
    overflow-x: hidden;
}

.layout {
    height: 100%;
}

.main {
    height: 100svh;
    overflow-y: auto;
    overflow-x: hidden;
}

::selection {
    background: #1a1612;
    color: #f0ece4;
}

::-webkit-scrollbar {
    width: 3px;
}

::-webkit-scrollbar-track {
    background: #f0ece4;
}

::-webkit-scrollbar-thumb {
    background: #c8b89a;
}
</style>