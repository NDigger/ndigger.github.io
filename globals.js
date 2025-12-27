
const configItem = localStorage.getItem('portfolio-config')
const config = configItem ? JSON.parse(configItem) : {
    musicEnabled: false,
    soundEnabled: true,
    nightModeEnabled: false,
    lastStatusSeenId: Number.MAX_VALUE,
    shaderMovementDir: 1,
}
