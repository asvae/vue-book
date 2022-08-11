import ServerSVG from './ServerSVG.vue'
import BarsSVG from './BarsSVG.vue'
import XmarkSVG from './XmarkSVG.vue'
import ArrowLeftSVG from './ArrowLeftSVG.vue'
import MagnifyingGlassSVG from './MagnifyingGlassSVG.vue'
import CircleDotSVG from './CircleDotSVG.vue'
import FileSVG from './FileSVG.vue'
import FolderSVG from './FolderSVG.vue'
import CaretDownSVG from './CaretDownSVG.vue'
import CaretRightSVG from './CaretRightSVG.vue'

export const icons = {
  'server': ServerSVG,
  'bars': BarsSVG,
  'xmark': XmarkSVG,
  'arrow-left': ArrowLeftSVG,
  'magnifying-glass': MagnifyingGlassSVG,
  'circle-dot': CircleDotSVG,
  'file': FileSVG,
  'folder': FolderSVG,
  'caret-down': CaretDownSVG,
  'caret-right': CaretRightSVG,
} as const
