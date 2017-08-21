<template>
    <div>
        <canvas :width="width" :height="height" ref="canvas"></canvas>
    </div>
</template>

<script lang="ts">
  import DemoFile from '../../classes/Main/DemoFile'
  import * as d3 from 'd3'

  import VmFile from './File.vue'
  import {
    Force,
    ForceLink,
    SimulationLinkDatum,
    SimulationNodeDatum,
  } from 'd3-force'

  interface NodeDatum extends SimulationNodeDatum {
    id: string
    file: DemoFile
    dependsOn: Boolean
  }

  interface LinkDatum extends SimulationLinkDatum<NodeDatum> {
    dependsOn: Boolean
    source: NodeDatum
    target: NodeDatum
  }

  export default {
    name: 'VmComponentGraph',
    props: {
      file: {
        type: DemoFile,
        required: true,
      },
    },
    data () {
      return {
        width: 300,
        height: 200,
        context: null,
      }
    },
    watch: {
      file: {
        handler () {
//          console.log('Depends On', this.file.getDependsOnDeep().map(file => file.getFilename()))
//          console.log('Depended By', this.file.getDependedByDeep().map(file => file.getFilename()))
//          console.log('Nodes', this.nodes)
//          console.log('Links', this.links)

          this.startSimulation()
        },
        immediate: true,
      },
    },
    methods: {
      getContext (): CanvasRenderingContext2D {
        return this.context
      },
      drawLink (link: LinkDatum) {
        const context = this.getContext()
        context.beginPath()
        if ((typeof link.source !== 'object') || (typeof link.target !== 'object')) {
          return
        }
        this.context.moveTo(link.source.x, link.source.y)
        this.context.lineTo(link.target.x, link.target.y)
        context.lineWidth = 3
        context.strokeStyle = link.dependsOn ? '#242424' : '#d6d6d6'
        context.stroke()
      },
      drawNode (node: NodeDatum) {
        const context = this.context
        context.beginPath()

        context.moveTo(node.x + 3, node.y)
        const radius = this.file === node.file ? 10 : 5
        context.arc(node.x, node.y, radius, 0, 2 * Math.PI, false)

        context.fillStyle = node.file.getColor()
        context.fill()
      },
      ticked () {
        const width = this.width
        const height = this.height
        const context = this.context
        context.clearRect(0, 0, width, height)
        context.save()
        context.translate(width / 2, height / 2)

        this.links.forEach(link => this.drawLink(link))
        this.nodes.forEach(node => this.drawNode(node))

        context.restore()
      },
      startSimulation () {
        const simulation = d3.forceSimulation()
          .force('link', d3.forceLink().id((node: NodeDatum) => {
            return node.id
          }))
          .force('charge', d3.forceManyBody())
          .force('center', d3.forceCenter())

        simulation
          .nodes(this.nodes)
          .on('tick', () => this.ticked())

        const force = simulation.force('link') as ForceLink<SimulationNodeDatum, SimulationLinkDatum<SimulationNodeDatum>>
        if (force) {
          force.links(this.links)
        }
      },
    },
    mounted () {
      this.context = this.$refs.canvas.getContext('2d')
    },
    computed: {
      links (): LinkDatum[] {
        const result: LinkDatum[] = []
        const nodes: NodeDatum[] = this.nodes
        nodes.forEach((nodeFrom: NodeDatum) => {
          nodes.forEach((nodeTo: NodeDatum) => {
            const fileFrom: DemoFile = nodeFrom.file
            const fileTo: DemoFile = nodeTo.file
            if (!fileFrom.isDirectlyRelatedTo(fileTo)) {
              return
            }
            const isDuplicate = result.some((link: LinkDatum) => {
              return ((link.source === nodeFrom) && (link.target === nodeTo))
                || ((link.target === nodeFrom) && (link.source === nodeTo))
            })
            if (isDuplicate) {
              return
            }
            result.push({
              source: nodeFrom,
              target: nodeTo,
              dependsOn: nodeFrom.dependsOn || nodeTo.dependsOn,
            })
          })
        })
        return result
      },
      nodes (): NodeDatum[] {
        return [
          {id: this.file.getFilename(), file: this.file},
          ...this.file.getDependsOnDeep().map((file: DemoFile) => {
            return {
              id: file.getFilename(),
              file,
              dependsOn: true,
            }
          }),
          ...this.file.getDependedByDeep().map((file: DemoFile) => {
            return {
              id: file.getFilename(),
              file,
              dependsOn: false,
            }
          }),
        ]
      },
    },
  }
</script>

