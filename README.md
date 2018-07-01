# obs-cron

[![license][license-image]][license-url]
[![ci][ci-image]][ci-url]
[![coverage][coverage-image]][coverage-url]
[![version][version-image]][version-url]

[license-image]: https://img.shields.io/npm/l/obs-cron.svg?style=flat-square
[license-url]: http://opensource.org/licenses/MIT
[ci-image]: https://img.shields.io/travis/dhcmrlchtdj/obs-cron.svg?style=flat-square
[ci-url]: https://travis-ci.org/dhcmrlchtdj/obs-cron
[coverage-image]: https://img.shields.io/coveralls/dhcmrlchtdj/obs-cron.svg?style=flat-square
[coverage-url]: https://coveralls.io/r/dhcmrlchtdj/obs-cron
[version-image]: https://img.shields.io/npm/v/obs-cron.svg?style=flat-square
[version-url]: https://www.npmjs.com/package/obs-cron

---

## usage

```typescript
import cron from 'obs-cron';

cron("* * * * *").subscribe(() => {
    console.log(new Date());
});
```

---

## crontab format

```
 # ┌──────────── minute
 # │ ┌────────── hour
 # │ │ ┌──────── day of month
 # │ │ │ ┌────── month
 # │ │ │ │ ┌──── day of week
 # │ │ │ │ │
 # * * * * *
```

| field        | allowed values    |
|--------------|-------------------|
| minute       | 0-59              |
| hour         | 0-23              |
| day of month | 1-31              |
| month        | 1-12              |
| day of week  | 0-6 (0 is Sunday) |


more: https://www.freebsd.org/cgi/man.cgi?crontab(5)
