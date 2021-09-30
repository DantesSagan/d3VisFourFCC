/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import * as topojson from 'topojson-client';
import { pointer } from 'd3-selection';
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

  const { infoText } = InfoText();
  const { drawCanvas } = DrawCanvas();
  let dataEducation;
  let dataCounty;

  useEffect(() => {
    let svg = d3.select('svg');
    let colors = ['#ffffcc', '#c2e699', '#78c679', '#238443', '#006837'];
    infoText();
    drawCanvas();

    const drawMap = () => {
      const tooltip = d3
        .select('body')
        .append('div')
        .attr('id', 'tooltip')
        .style('visibility', 'hidden')
        .style('width', 'auto')
        .style('height', 'auto');
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
            ? colors[0]
            : percentage <= 25
            ? colors[1]
            : percentage <= 45
            ? colors[2]
            : percentage <= 55
            ? colors[3]
            : colors[4];
        })
        .attr('data-fips', (itemDataCounty) => {
          return itemDataCounty['id'];
        })
        .attr('data-education', (itemDataCounty) => {
          let id = itemDataCounty['id'];
          let county = dataEducation.find((item) => {
            return item['fips'] === id;
          });
          let percentage = county['bachelorsOrHigher'];
          return percentage;
        })
        .on('mouseover', (event, itemDataCounty) => {
          const [x, y] = pointer(event);
          tooltip.transition().style('visibility', 'visible');

          let id = itemDataCounty['id'];
          let county = dataEducation.find((item) => {
            return item['fips'] === id;
          });
          tooltip
            .attr('data-education', county['bachelorsOrHigher'])
            .style('left', x + 280 + 'px')
            .style('top', y + 30 + 'px')
            .style('position', 'absolute')
            .html(
              `Fips: ${county['fips']}<br/>` +
                `State: ${county['state']}<br/>` +
                `Area_Name: ${county['area_name']}<br/>` +
                `Bachelor's degree: ${county['bachelorsOrHigher']}%<br/>`
            );
        })
        .on('mouseout', () => {
          tooltip.transition().style('visibility', 'hidden');
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
    <div className='App' style={{ color: 'white' }}>
      <h2 id='title'>USA Education Data</h2>
      <h3 id='description'>
        Percentage of adults age 25 and older with a bachelor's degree or higher
        (2010-2014)
      </h3>
      <svg style={{ padding: '25px' }} id='back'>
        {' '}
        <svg id='legend' x='850' y='380'>
          <g>
            <rect x='10' y='0' width='40' height='15' fill='#ffffcc'></rect>
            <text
              x='55'
              y='15'
              fill='white'
            >{`Less then <= 15 Bachelor's degree`}</text>
          </g>
          <g>
            <rect x='10' y='15' width='40' height='15' fill='#c2e699'></rect>
            <text
              x='55'
              y='30'
              fill='white'
            >{`Less then <= 25 Bachelor's degree`}</text>
          </g>
          <g>
            <rect x='10' y='30' width='40' height='15' fill='#78c679'></rect>
            <text
              x='55'
              y='45'
              fill='white'
            >{`Less then <= 45 Bachelor's degree`}</text>
          </g>
          <g>
            <rect x='10' y='45' width='40' height='15' fill='#238443'></rect>
            <text
              x='55'
              y='60'
              fill='white'
            >{`Less then <= 55 Bachelor's degree`}</text>
          </g>
        </svg>
      </svg>
      <br />
      <span style={{ textAlign: 'center', fontSize: '18px' }}>
        Coded and designed by
        <a href='https://github.com/DantesSagan/d3VisFourFCC'>
          @DantesSagan & d3VisFourFCC
        </a>
      </span>
    </div>
  );
}
