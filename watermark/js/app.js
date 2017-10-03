function toggleGoButton() {
    const name = document.getElementById('name').value
    const button = document.getElementById('go')

    if(name)
        button.className = 'btn'
    else
        button.className = 'btn disabled-btn'
}

function callGenerator() {
    let name = document.getElementById('name').value
    window.open('generate.html?name=' + name + '')
}

function replaceName() {
    let name = readURLParamter('name')

    if (name) {
        const divName = document.getElementById('watermark_name')
        name = decodeURI(name)
        divName.innerHTML = name.toUpperCase()
    }
}

function generate () {
    replaceName()

    html2canvas(document.getElementById('watermark'), {
        onrendered: function (canvas) {
            let link = document.getElementById('downloadlink')
            link.href = canvas.toDataURL()
            link.download = "watermark.png"
            link.click()
        },
        useCORS: true,
        allowTaint: true
    })
    return false
}

// Helpers
function readURLParamter(param) {
	let vars = {}
	window.location.href.replace( location.hash, '' ).replace(
		/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
		function( m, key, value ) { // callback
			vars[key] = value !== undefined ? value : ''
		}
	);

	if ( param ) {
		return vars[param] ? vars[param] : null
	}
	return vars
}
