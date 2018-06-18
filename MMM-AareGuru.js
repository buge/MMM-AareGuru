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

Module.register('MMM-AareGuru', {
  defaults: {
    // The location for which to retrieve the river temperature. Valid options
    // are 'brienz', 'interlaken', 'thun', 'bern', 'hagneck', 'biel' and
    // 'brugg'.
    city: 'bern',

    // How to display the forecast. Valid options are 'vertical', 'horizontal'
    // or 'none'.
    forecast: 'horizontal',

    // Update interval in millseconds.
    // Defaults to every 10min.
    updateIntervalMs: 10 * 60 * 1000,

    // API location.
    api: 'https://aareguru.existenz.ch/v2018/current?app=MMM-AareGuru',
  },

  requiresVersion: '2.2.1',

  start: function () {
    if (!['horizontal', 'vertical', 'none'].includes(this.config.forecast)) {
      Log.error(
        'Expected forecast setting to be one of "horizontal", "vertical" or ' +
        `"none" but got "${this.config.forecast}"`);
    }

    // Load initial data.
    this.response = {};
    this.getData();
  },

  getTemplate: function () {
    return 'MMM-AareGuru.njk';
  },

  getTemplateData: function () {
    if (this.response['aare'] === undefined) {
      return { loading: true };
    }
    const aare = this.response['aare'];
    aare['loading'] = false;
    aare['forecast'] = this.config.forecast;
    return aare;
  },

  getStyles: function () {
    return ['MMM-AareGuru.css'];
  },

  getData: function () {
    const request = new XMLHttpRequest();
    request.open('GET', `${this.config.api}&city=${this.config.city}`, true);
    request.onreadystatechange = () => {
      if (request.readyState != 4) {
        return;
      };

      if (request.status === 200) {
        this.response = JSON.parse(request.response);
        this.updateDom();
      } else {
        Log.error(`${this.name}: Could not load data`);
      }

      setTimeout(() => this.getData(), this.config.updateIntervalMs);
    };
    request.send();
  },
});
