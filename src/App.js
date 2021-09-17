/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import * as topojson from 'topojson-client';
import * as d3 from 'd3';

import InfoText from './Component/InfoText';
import DrawCanvas from './Component/DrawCanvas';

import './App.css';

export default function App() {
  let [urlEducation] = useState(
    'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json'
  );
  let [urlCountry] = useState(
    'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json'
  );

  const width = 1200;
  const height = 800;
  const padding = 80;

  const { infoText } = InfoText();
  const { drawCanvas } = DrawCanvas();
  let dataEducation;
  let dataCounty;

  let valuesEducation;
  let valuesCountry;

  useEffect(() => {
    let svg = d3.select('svg');
    let colors = ['#ffffcc', '#c2e699', '#78c679', '#238443'];
    let colorScale = d3.scaleQuantize().range(colors);
    // const educationBrew = () => {
    //   svg
    //     .selectAll('path')
    //     .data(dataEducation)
    //     .enter()
    //     .append('path')
    //     .attr('d', d3.geoPath());
    // };
    infoText();
    drawCanvas();
    const tooltipAndLegend = () => {};
    const drawMap = () => {
      svg
        .selectAll('path')
        .data(dataCounty)
        .enter()
        .append('path')
        .attr('d', d3.geoPath())
        .attr('class', 'county')
        .attr('fill', (itemDataCounty) => {
          let id = itemDataCounty['id'];
          let county = dataEducation.find((item) => {
            return item['fips'] === id;
          });
          let percentage = county['bachelorsOrHigher'];
          return percentage <= 15
            ? '#ffffcc'
            : percentage <= 25
            ? '#c2e699'
            : percentage <= 45
            ? '#78c679'
            : percentage <= 55
            ? '#238443'
            : '#006837';
        });
      // let perofBach = [15, 25, 45, 55];
      // if (percentage <= perofBach[0]) {
      //   if (colors[0] !== perofBach[0]) {
      //     return colorScale((item) => {
      //       return item.bachelorsOrHigher;
      //     });
      //   }
      // } else if (percentage <= perofBach[1]) {
      //   if (colors[1] !== perofBach[1]) {
      //     return colorScale((item) => {
      //       return item.bachelorsOrHigher;
      //     });
      //   }
      // } else if (percentage <= perofBach[2]) {
      //   if (colors[2] !== perofBach[2]) {
      //     return colorScale((item) => {
      //       return item.bachelorsOrHigher;
      //     });
      //   }
      // } else if (percentage <= perofBach[3]) {
      //   if (colors[3] !== perofBach[3]) {
      //     return colorScale((item) => {
      //       return item.bachelorsOrHigher;
      //     });
      //   }
      // }
    };
    d3.json(urlCountry).then((data, error) => {
      if (error) {
        console.log(data);
      } else {
        dataCounty = topojson.feature(data, data.objects.counties).features;
        console.log(dataCounty);

        d3.json(urlEducation).then((data, error) => {
          if (error) {
            console.log(data);
          } else {
            dataEducation = data;
            console.log(dataEducation);
            drawMap();
            // educationBrew();
          }
        });
      }
    });
  }, []);

  return (
    <div className='App' >
      <h2 id='title'>USA Education Data</h2>
      <h3 id='description'>
        Percentage of adults age 25 and older with a bachelor's degree or higher
        (2010-2014)
      </h3>
      <svg style={{ background: 'black', padding: '25px'}} id='back'></svg>
    </div>
  );
}
