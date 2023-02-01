Highcharts.theme = {
    colors: ['#D6A234', '#00BFB2', '#C64191', '#B5F44A', '#FF1053'],
    chart: {
        backgroundColor: "var(--darkBlue",
    },
    title: {
        style: {
            color: '#FFF',
            font: '16px "Ubuntu-M", sans-serif'
        },
		layout: 'horizontal',
		align: 'center'
    },
    subtitle: {
        style: {
            color: '#FFF',
            font: '16px "Ubuntu-M", sans-serif'
        }
    },
    legend: {
		enabled: false
    },
	xAxis: {
		gridLineColor: 'transparent'
	},
	yAxis: {
		gridLineColor: 'transparent'
	},
};
Highcharts.setOptions(Highcharts.theme);