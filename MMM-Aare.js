// Copyright 2018 Philipp Bunge
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

Module.register('MMM-Aare', {
  defaults: {
    // Update interval in millseconds.
    // Defaults to every 10min.
    updateIntervalMs: 10 * 60 * 1000,

    // API location.
    api: 'http://aare.schwumm.ch/api/current',
  },

  getScripts: function () {
    // For formatting datetimes.
    return ['moment.js'];
  },

  getStyles: function () {
    return ['MMM-Aare.css'];
  },

  start: function () {
    // Format numbers and dates according to the locale. We format numbers
    // (temperature and flow) to exactly 1 decimal place.
    this.numberFormat = new Intl.NumberFormat(this.config.language, {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });
    moment.locale(this.config.language);

    // Load initial data.
    this.aare = {};
    this.getData();
  },

  getDom: function () {
    var wrapper = document.createElement('div');
    if (this.aare['temperature'] === undefined) {
      wrapper.innerHTML = '<div class="loading">Loading data&hellip;</div>';
      return wrapper;
    }

    const temperature = this.numberFormat.format(this.aare['temperature']);
    const flow = this.numberFormat.format(this.aare['flow']);
    const date = moment(this.aare['date'], 'YYYY-MM-DD hh:mm:ss').format('LLL');

    wrapper.innerHTML = `
<div class="temperature">${temperature}<span class="unit"> &deg;C</span></div>
<div class="flow">${flow}<span class="unit"> m&sup3;/s</div>
<!-- BAFU requires to credit them as the source. -->
<div class="source">${this.aare['source']} / ${date}</div>
`;
    return wrapper;
  },

  getData: function () {
    const request = new XMLHttpRequest();
    request.open('GET', this.config.api, true);
    request.onreadystatechange = () => {
      if (request.readyState != 4) {
        return;
      };

      if (request.status === 200) {
        this.aare = JSON.parse(request.response);
        this.updateDom();
      } else {
        Log.error(`${this.name}: Could not load data`);
      }

      setTimeout(() => this.getData(), this.config.updateIntervalMs);
    };
    request.send();
  },
});
