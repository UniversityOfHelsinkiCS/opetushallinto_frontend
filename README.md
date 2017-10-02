# component for oodi-kurki transfer

Shows errors in last transfer and makes it possible to create all missing metadata.

## dev

```npm watch```

## dep

Run

```npm compile```

copy _dist/app.js_ to server. Add the following to page where to embed:

```
    <div id="root"></div>
    <script type="text/javascript" src="./app.js"></script>
```

Currently in [oodi_integration/views/tktl_hallinto.erb](https://github.com/UniversityOfHelsinkiCS/opetushallinto/blob/master/oodi_integration/views/tktl_hallinto.erb)