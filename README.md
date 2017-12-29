# obs-cron

---

## usage

```typescript
import cron from 'obs-cron';

cron("* * * * *").subscribe(_ => {
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

---

## TODO

- [ ] tests
