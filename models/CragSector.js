import ActiveData from '@/models/ActiveData'
import CragSectorApi from '~/services/oblyk-api/CragSectorApi'
import Crag from '@/models/Crag'

export default class CragSector extends ActiveData {
  toJSON () {
    return this._buildJsonObject(CragSector)
  }

  _find (cragSectorId) {
    return this._apiFind(CragSectorApi, cragSectorId)
  }

  get className () {
    return 'CragSector'
  }

  get path () {
    return `/crag-sectors/${this.id}/${this.slug_name}`
  }

  get aPath () {
    return `/crags/${this.crag.id}/${this.crag.slug_name}/sectors/${this.id}/${this.slug_name}`
  }

  get nameAndGap () {
    return `${this.name} (${this.gradeGap})`
  }

  get gradeGap () {
    const grade = (this.routes_figures || {}).grade
    return `${(grade || {}).min_text || '?'} > ${(grade || {}).max_text || '?'}`
  }

  get orientations () {
    const list = []
    if (this.north) { list.push('north') }
    if (this.north_east) { list.push('north_east') }
    if (this.east) { list.push('east') }
    if (this.south_east) { list.push('south_east') }
    if (this.south) { list.push('south') }
    if (this.south_west) { list.push('south_west') }
    if (this.west) { list.push('west') }
    if (this.north_west) { list.push('north_west') }
    return list
  }

  get Crag () {
    return new Crag({ attributes: this.crag })
  }
}
