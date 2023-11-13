const IS_PRODUCTION_MODE_ENABLED = false
const BASE_URL = IS_PRODUCTION_MODE_ENABLED ? window.location.origin : "http://localhost:3000"

export default BASE_URL
