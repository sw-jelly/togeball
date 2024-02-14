import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'

const MatchingQueue = ( props ) => {
  
  const { data } = props

  const svgRef = useRef<SVGSVGElement | null>( null );
  const [ bubbleData, setBubbleData ] = useState<{ label: string; value: number }[]>([]);

  useEffect(() => {
    if (!svgRef.current) return;
    const parentHeight = svgRef.current.parentElement.clientHeight

    const svg = d3.select( svgRef.current )
    const width = +svg.attr( 'width' )
    const height = parentHeight

    const newBubbleData = data.hashtags.map(( tagName ) => ({
      label: tagName,
      value: data?.counts[ tagName ],
      x: Math.random() * width, // X 좌표를 랜덤하게 설정
      y: Math.random() * height, // Y 좌표를 랜덤하게 설정
      
    }))

    setBubbleData( newBubbleData )

    const simulation = d3.forceSimulation( newBubbleData )
      .force( 'charge', d3.forceManyBody().strength(5))
      .force( 'x', d3.forceX( width / 2 ).strength(0.1))
      .force( 'y', d3.forceY( height / 2 ).strength(0.1))
      .force( 'collision', d3.forceCollide().radius(d => Math.sqrt( d.value ) * 90))
    
   
      
      
    const filter = svg.append('defs').append('filter').attr('id', 'blur-filter').append('feGaussianBlur').attr('stdDeviation', 5)  

    const circles = svg.selectAll( 'circle' ).data( newBubbleData )
    

    circles.enter().append( 'circle' )
      .attr( 'fill', 'white' )
      .attr('stroke', '#E48BF4') // 테두리 색 설정
      .attr('stroke-width', 4) // 테두리 두께 설정
      .style('filter', 'url(#blur-filter)')
      .merge( circles )
      .attr( 'cx', d => d.x )
      .attr( 'cy', d => d.y )
      .attr( 'r', d => Math.sqrt( d.value ) * 90 )

    // 텍스트 추가
    const texts = svg.selectAll( 'text' ).data( newBubbleData );

    texts.enter().append( 'text' )
      .attr( 'x', d => d.x )
      .attr( 'y', d => d.y )
      .attr( 'dy', '0.35em' )  // 텍스트의 세로 중앙 정렬
      .attr( 'text-anchor', 'middle' )  // 텍스트의 가로 중앙 정렬
      .text( d => d.label )
      

    circles.exit().remove()
    texts.exit().remove()

    simulation.on( 'tick', () => {
      circles.attr( 'cx', d => d.x ).attr( 'cy', d => d.y )
      texts.attr( 'x', d => d.x ).attr( 'y', d => d.y )
    });
  }, [ data ])

  return (
    <svg ref={ svgRef } width={ 1000 } height='100%' style={{ backgroundColor:'#7D74B4'}}>
      <style>
        {`
          text {
            font-size: 22px;
          }
        `}
      </style>
    </svg>
  )
}

export default MatchingQueue
