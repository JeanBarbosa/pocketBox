const os = require("os")
const fs = require("fs")

function getIPAddress() {
  const interfaces = os.networkInterfaces()
  for (let name of Object.keys(interfaces)) {
    for (let iface of interfaces[name]) {
      if ("IPv4" === iface.family && !iface.internal) {
        return iface.address
      }
    }
  }
  return "127.0.0.1"
}

function getOS() {
  const platform = os.platform()
  switch (platform) {
    case "win32":
      return "Windows"
    case "darwin":
      return "macOS"
    case "linux":
      return "Linux"
    default:
      return "Unknown"
  }
}

function createEnvFile(ip, osType) {
  const port = 3000
  const envContent = `EXPO_PUBLIC_API_URL=http://${ip}:${port}/\nOS_TYPE=${osType}\n`
  fs.writeFileSync(".env", envContent)
  console.log(".env file created with IP address and OS type.")
}

const ipAddress = getIPAddress()
const osType = getOS()
createEnvFile(ipAddress, osType)
