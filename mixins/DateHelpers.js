const { DateTime } = require('luxon')

export const DateHelpers = {
  methods: {
    today () {
      return DateTime.now()
    },

    toDateTime (date) {
      return DateTime.fromISO(date)
    },

    isoToday () {
      return DateTime.now().toISODate()
    },

    ISODateToday () {
      return DateTime.now().toISODate()
    },

    humanizeDate (date, format = 'DATE_FULL') {
      const dateParsed = DateTime.fromISO(date).setLocale(this.$vuetify.lang.current)
      if (['DATE', 'TIME'].includes(format.substring(0, 4))) {
        return dateParsed.toLocaleString(DateTime[format])
      } else {
        return dateParsed.toFormat(format)
      }
    },

    dateFromNow (date) {
      return DateTime.fromISO(date)
        .setLocale(this.$vuetify.lang.current)
        .toRelative()
    },

    dateFromToday (date) {
      if (date === DateTime.now().toISO()) {
        return this.$t('common.today')
      } else {
        return this.dateFromNow(date)
      }
    },

    feedDateFromNow (date) {
      const dif = DateTime.now().diff(DateTime.fromISO(date), 'days').toObject()
      if (dif.days > 15) {
        return `${this.$t('common.at')} ${this.humanizeDate(date)}`
      } else {
        return this.dateFromNow(date)
      }
    },

    weekDayAndFromNow (date) {
      const dif = DateTime.now().startOf('day').diff(DateTime.fromISO(date), 'days').toObject()
      let fromNow = null
      if (dif.days === 0) {
        fromNow = this.$t('common.today')
      } else if (dif.days === 1) {
        fromNow = this.$t('common.yesterday')
      } else if (dif.days < 7) {
        fromNow = this.humanizeDate(date, 'cccc')
      } else {
        fromNow = this.dateFromNow(date)
      }
      return `${fromNow.charAt(0).toUpperCase()}${fromNow.slice(1)}`
    },

    dateIsAfterDate (firstDate, secondDate) {
      return DateTime.fromISO(secondDate).diff(DateTime.fromISO(firstDate)).toObject().milliseconds > 0
    },

    dateIsBeforeDate (firstDate, secondDate) {
      return DateTime.fromISO(secondDate).diff(DateTime.fromISO(firstDate)).toObject().milliseconds < 0
    },

    isoDate (date) {
      return DateTime.fromISO(date).toISO()
    },

    ageAt (dateOfBirth, ageAt) {
      ageAt = ageAt || new Date()
      const diff = ageAt.getTime() - dateOfBirth.getTime()
      return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25))
    }
  }
}
