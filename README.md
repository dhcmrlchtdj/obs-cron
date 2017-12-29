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

## TODO

- [ ] tests
