import ActiveData from '@/models/ActiveData'
import GymSpaceApi from '~/services/oblyk-api/GymSpaceApi'
import GymSector from '@/models/GymSector'
import GymRoute from '@/models/GymRoute'
import Gym from '@/models/Gym'

export default class GymSpace extends ActiveData {
  toJSON () {
    return this._buildJsonObject(GymSpace)
  }

  _find (gymId, spaceId) {
    return this._apiFind(GymSpaceApi, gymId, spaceId)
  }

  get className () {
    return 'GymSpace'
  }

  get path () {
    return `/gyms/${this.gym.id}/${this.gym.slug_name}/spaces/${this.id}/${this.slug_name}`
  }

  get gymPath () {
    return `/gyms/${this.gym.id}/${this.gym.slug_name}`
  }

  get planUrl () {
    if (this.plan) {
      return this.plan
    } else {
      return '/images/gym-default-banner.jpg'
    }
  }

  get planThumbnailUrl () {
    if (this.plan) {
      return this.plan_thumbnail_url
    } else {
      return '/images/gym-default-banner.jpg'
    }
  }

  get planTinyThumbnailUrl () {
    if (this.plan) {
      return this.plan_tiny_thumbnail_url
    } else {
      return '/images/gym-default-banner.jpg'
    }
  }

  get pictureTinyUrl () {
    if (this.representation_type === '3d' && this.three_d_picture_tiny_thumbnail_url) {
      return this.three_d_picture_tiny_thumbnail_url
    } else if (this.representation_type === '2d_picture' && this.plan_tiny_thumbnail_url) {
      return this.plan_tiny_thumbnail_url
    } else {
      return null
    }
  }

  get pictureThumbnailUrl () {
    if (this.representation_type === '3d' && this.three_d_picture_thumbnail_url) {
      return this.three_d_picture_thumbnail_url
    } else if (this.representation_type === '2d_picture' && this.plan_thumbnail_url) {
      return this.plan_thumbnail_url
    } else {
      return null
    }
  }

  get Gym () {
    return new Gym({ attributes: this.gym })
  }

  get GymSectors () {
    const sectors = []
    if (!this.gym_sectors) { return sectors }

    for (const sector of this.gym_sectors) {
      sectors.push(new GymSector({ attributes: sector }))
    }
    return sectors
  }

  get GymRoutes () {
    const routes = []
    if (!this.gym_routes) { return routes }

    for (const route of this.gym_routes) {
      routes.push(new GymRoute({ attributes: route }))
    }
    return routes
  }
}
