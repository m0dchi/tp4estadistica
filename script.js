let graficoActual = null

async function loadData() {
    const selector = document.getElementById("selector")
    const numero = selector.value
    const response = await fetch(`https://apidemo.geoeducacion.com.ar/api/testing/control/${numero}`)
    const data = await response.json()

    if (data.success) {
        const { media, lsc, lic, valores } = data.data[0]
        drawChart(media, lsc, lic, valores)
        anomalias(valores, media, lsc, lic)
    }
}

function drawChart(media, lsc, lic, valores) {
    const context = document.getElementById('myChart').getContext('2d')
    const labels = valores.map(point => point.x)
    const data = valores.map(point => point.y)

    if (graficoActual) {
        graficoActual.destroy()
    }

    graficoActual = new Chart(context, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Valores',
                    data: data,
                    borderColor: 'blue',
                    fill: false
                },
                {
                    label: 'Media',
                    data: Array(labels.length).fill(media),
                    borderColor: 'green',
                    borderDash: [5, 5],
                    fill: false
                },
                {
                    label: 'LSC',
                    data: Array(labels.length).fill(lsc),
                    borderColor: 'red',
                    borderDash: [5, 5],
                    fill: false
                },
                {
                    label: 'LIC',
                    data: Array(labels.length).fill(lic),
                    borderColor: 'red',
                    borderDash: [5, 5],
                    fill: false
                }
            ]
        },
        options: {
            scales: {
                x: {
                    beginAtZero: true
                },
                y: {
                    min: 80,
                    max: 100
                }
            }
        }
    })
}

function anomalias(valores, media, lsc, lic) {
    let mensaje = ""

    document.getElementById("alert").innerText = mensaje
}
