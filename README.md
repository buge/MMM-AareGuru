# MMM-AareGuru

*Don't speak Bärndütsch? [See this README in English](README-en.md).*

Mit em MMM-AareGuru chasch d [aare.guru](https://aare.guru/) Tämperatur uf
dim [MagicMirror²](https://github.com/MichMich/MagicMirror/) Spigu aazeige.

![Display](display.png)


## Installiere

```shell
cd ~/MagicMirror/modules
```

Repo kloone:
```shell
git clone https://github.com/buge/MMM-AareGuru
```

Konfigurier ds Modul in dim `config.js`:
```js
modules: [
	{
		module: 'MMM-AareGuru',
		position: 'top_right',
		header: 'aare.guru',
		config: {
			city: 'bern',
			forecast: 'vertical',
		}
	},
]
```


## Konfigurationsoptione

|      Option      | Beschribig
|------------------|-------------
| city             | Vo welem Standort du ds Wätter wosch wüsse. Müglechi Optione si 'brienz', 'interlaken', 'thun', 'bern', 'hagneck', 'biel' u 'brugg'
| forecast         | I welem Layout d Vorhärsag söu aazeigt wärde ('vertical', 'horizontal' odr 'none')
| updateIntervalMs | I welem Intervau sech ds Modul söu aktualisiere (au 10min per Default)
