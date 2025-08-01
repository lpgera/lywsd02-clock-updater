import { setTimeout } from 'timers/promises'
import noble from '@abandonware/noble'

noble.on('stateChange', (state) => {
  if (state === 'poweredOn') {
    noble.startScanning(['181a'], false)
    console.log('Scanning...')
  } else {
    noble.stopScanning()
  }
})

noble.on('discover', async (peripheral) => {
  if (peripheral.advertisement.localName === 'LYWSD02') {
    console.log('Found LYWSD02, stopping scan...')
    noble.stopScanning()

    console.log('Connecting...')
    await peripheral.connectAsync()
    await setTimeout(100) // Wait for connection to stabilize
    const [service] = await peripheral.discoverServicesAsync(['ebe0ccb0-7a0a-4b0c-8a1a-6ff2997da3a6'])
    const [characteristic] = await service.discoverCharacteristicsAsync(['ebe0ccb7-7a0a-4b0c-8a1a-6ff2997da3a6'])

    const arrayBuffer = new ArrayBuffer(5)
    const view = new DataView(arrayBuffer)
    const now = new Date()
    // Set time to now + 30 seconds
    view.setUint32(0, Math.floor(now.getTime() / 1000) + 30, true)
    // Set timezone offset in hours
    view.setInt8(4, -Math.floor(now.getTimezoneOffset() / 60))
    console.log('Setting time:', now.toISOString())

    await characteristic.writeAsync(Buffer.from(arrayBuffer), false)
    console.log('Successfully set time!')
    process.exit(0)
  }
})
