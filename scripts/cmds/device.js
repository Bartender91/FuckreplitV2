const axios = require('axios');

module.exports = {
	config: {
		name: "device",
		aliases: ["device, android"],
		version: "1.0",
		author: "@Tas33n",
		countDown: 5,
		role: 0,
		shortDescription: "get device data",
		longDescription: " ",
		category: "Android",
		guide: "{pn} {{<name>}}"
	},

	onStart: async function ({ message, args }) {
		const name = args.join(" ");
		if (!name)
			return message.reply(`⚠️ | Please enter device name!`);
		else {
			const BASE_URL = `https://api.misfitsdev.xyz/gsm/device.php?query=${name}`;
			try {
				let res = await axios.get(BASE_URL)


				let res2 = res.data
				let dvic = {}


				res2.data[""].forEach(e => {
					dvic[Object.keys(e)[0]] = e[Object.keys(e)[0]]
				})


				let nam = dvic.name
				let brand = dvic.brand
				let model = dvic.model
				let price = dvic.price
				let ctgry = dvic.category
				let ntr = dvic.network_type
				let ntr2 = dvic.network_2g
				let ntr3 = dvic.network_3g
				let ntr4 = dvic.network_4g
				let speed = dvic.speed
				let gprs = dvic.gprs
				let edge = dvic.edge
				let lunched = dvic.launch_date
				let bodyd = dvic.body_dimensions
				let bodyw = dvic.body_weight
				let ntrs = dvic.network_sim
				let dsp = dvic.display_type
				let dsps = dvic.display_size
				let dspr = dvic.display_resolution
				let dspm = dvic.display_multitouch
				let dspd = dvic.display_density
				let dspp = dvic.display_screen_protection
				let opsys = dvic.operating_system
				let osv = dvic.os_version
				let oem = dvic.user_interface_ui
				let chip = dvic.chipset
				let cpu = dvic.cpu
				let gpu = dvic.gpu
				let internal = dvic.memory_internal
				let external = dvic.memory_external
				let ram = dvic.ram
				let camp = dvic.primary_camera
				let cams = dvic.secondary_camera
				let camf = dvic.camera_features
				let vdo = dvic.video
				let aud = dvic.audio
				let lspkr = dvic.loudspeaker
				let jack = dvic.m_jack
				let wifi = dvic.wifi
				let bt = dvic.bluetooth
				let nfc = dvic.nfc
				let infrared = dvic.infrared
				let usb = dvic.usb
				let gps = dvic.gps
				let fm = dvic.fm_radio
				let sensor = dvic.sensors
				let msg = dvic.messaging
				let btryt = dvic.battery_type
				let btryc = dvic.battery_capacity
				let crg = dvic.charging
				let color = dvic.body_color
				let img = res2.img

				const form = {
					body: `╭「Device Specifications」`
						+ `\│_`
						+ `\❏ Brand: ${brand}`
						+ `\❏ Model: ${model}`
						+ `\❏ Price: ${price}`
						+ `\❏ Category: ${ctgry}`
						+ `\❏ Released: ${lunched}`
						+ `\❏ Body Color: ${color}`
						+ `\╰—————————`

						+ `\\╭「Network」`
						+ `\❏ Network Type: ${ntr}`
						+ `\❏ 2G: ${ntr2}`
						+ `\❏ 3G: ${ntr3}`
						+ `\❏ 4G: ${ntr4}`
						+ `\❏ Speed: ${speed}`
						+ `\❏ GPRS: ${gprs}`
						+ `\❏ EDGE: ${edge}`
						+ `\╰—————————`

						+ `\\╭「Body」`
						+ `\❏ Body Dimensions: ${bodyd}`
						+ `\❏ Weight: ${bodyw}`
						+ `\❏ Network Sim: ${ntrs}`
						+ `\╰—————————`

						+ `\\╭「Display」`
						+ `\❏ Display Type: ${dsp}`
						+ `\❏ Size: ${dsps}`
						+ `\❏ Resolution: ${dspr}`
						+ `\❏ Multitouch: ${dspm}`
						+ `\❏ Density: ${dspd}`
						+ `\❏ Protection: ${dspp}`
						+ `\╰—————————`

						+ `\\╭「Platform」`
						+ `\❏ OS system: ${opsys}`
						+ `\❏ Version: ${osv}`
						+ `\❏ User Interface: ${oem}`
						+ `\❏ Chipset: ${chip}`
						+ `\❏ Cpu: ${cpu}`
						+ `\❏ Gpu: ${gpu}`
						+ `\╰—————————`

						+ `\\╭「Memory」`
						+ `\❏ Internal: ${internal}`
						+ `\❏ External: ${external}`
						+ `\❏ RAM: ${ram}`
						+ `\╰—————————`

						+ `\\╭「Camera」`
						+ `\❏ Primary Camera: ${camp}`
						+ `\❏ Secondary Camera: ${cams}`
						+ `\❏ Camera Features: ${camf}`
						+ `\╰—————————`

						+ `\\╭「Sound」`
						+ `\❏ Audio: ${aud}`
						+ `\❏ Loudspeaker: ${lspkr}`
						+ `\❏ 3.5mm Jack: ${jack}`
						+ `\╰—————————`

						+ `\\╭「Connectivity」`
						+ `\❏ Wifi: ${wifi}`
						+ `\❏ Bluetooth: ${bt}`
						+ `\❏ NFC: ${nfc}`
						+ `\❏ Infrared: ${infrared}`
						+ `\❏ USB: ${usb}`
						+ `\❏ GPS: ${gps}`
						+ `\╰—————————`

						+ `\\╭「Features」`
						+ `\❏ FM: ${fm}`
						+ `\❏ Sensos: ${sensor}`
						+ `\❏ Message: ${msg}`
						+ `\╰—————————`

						+ `\\╭「Battery」`
						+ `\❏ Battery Type: ${btryt}`
						+ `\❏ Battery Capacity: ${btryc}`
						+ `\❏ Cherging: ${crg}`
						+ `\╰—————————`

				};
				if (img)
					form.attachment = await global.utils.getStreamFromURL(img);
				message.reply(form);
			} catch (e) { message.reply(`🥺 Not Found`) }

		}
	}
};