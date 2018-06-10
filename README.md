# MMM-Aare

This is a module for the [MagicMirror²](https://github.com/MichMich/MagicMirror/).

The module displays the temperature of the river Aare in Bern. The data is
provided by the Federal Office for the Environment (FOEN) also known as the
*Bundesamt für Umwelt* (BAFU) in German. We read the data through an [API
service of the *Bureau für digitale Existenz*](http://aare.schwumm.ch/api/)
(many thanks!).

We currently don't provide any temperature information for other swimming
locations in Switzerland. If you have a good API source, please let me know and
I'll be happy to add them.

Please see [aare.guru](https://aare.guru/) for more information about swimming
in the river and forecasts.

![Display](display.png)


## Installation

```shell
cd ~/MagicMirror/modules
```

Clone this repository:
```shell
git clone https://github.com/buge/MMM-Aare
```

Configure the module in your config.js file:
```js
modules: [
	{
		module: 'MMM-Aare',
		position: 'top_right',
		header: 'Aare',
	},
]
```


## Configuration Options

|      Option      |                     Description                    |
|------------------|----------------------------------------------------|
| updateIntervalMs | Update interval in milliseconds. Defaults to 10min |
