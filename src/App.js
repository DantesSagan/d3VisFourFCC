/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';

import InfoText from './Component/InfoText';
import DrawCanvas from './Component/DrawCanvas';

import './App.css';

export default function App() {
  const [urlEducation] = useState(
    'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json'
  );
  const [urlCountry] = useState(
    'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json'
  );
  const [req] = useState(new XMLHttpRequest());
  const width = 1200;
  const height = 800;
  const padding = 80;

  const { infoText } = InfoText();
  const { drawCanvas } = DrawCanvas();

  useEffect(() => {
    req.open('GET', urlEducation, true);
    req.onload = () => {
      data = JSON.parse(req.responseText);
      valuesEducation = data;
      valuesCountry = data;
      infoText();
      drawCanvas();
      const tooltipAndLegend = () => {};
    };
    req.send();

    req.open('GET', urlCountry, true);
    req.onload = () => {
      data = JSON.parse(req.responseText);
      valuesEducation = data;
      valuesCountry = data;
      infoText();
      drawCanvas();
      const generateScales = () => {};
      const tooltipAndLegend = () => {};
      const drawStates = () => {};
      const generateAxis = () => {};
    };
    req.send();
  }, []);
  let data;
  let valuesEducation;
  let valuesCountry;

  let xAxisScale;
  let yAxisScale;
  let svg = d3.select('svg');
  return (
    <div className='App'>
      <h2>Visualize Data with a Choropleth Map</h2>
      <svg>
        <text x={width - 900} y={height - 20}></text>
      </svg>
    </div>
  );
}
