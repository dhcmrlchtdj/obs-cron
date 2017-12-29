# cron

---

- https://www.freebsd.org/cgi/man.cgi?crontab(5)

> cron(8) examines cron entries once every minute.

---

| field        | allowed values      |
|--------------|---------------------|
| minute       | 0-59                |
| hour         | 0-23                |
| day of month | 1-31                |
| month        | 1-12                |
| day of week  | 0-7 (0 or 7 is Sun) |

- A field may be an asterisk (*), which always stands for `first-last`.
- Ranges are two numbers separated with a hyphen. The specified range is inclusive. `8-11`
- A list is a set of numbers (or ranges) separated by commas. `1,2,5,9` `0-4,8-12`
- Step values can be used in conjunction with ranges. `0-23/2` `*/2`
