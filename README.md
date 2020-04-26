# Database ETL for Reviews-Service

## To migrate all review data
run:<br>
`npm install`<br>
`npm start`<br>
<br>
This will migrate all data to the existing `localhost` Postgres Server named `sdc`<br>
<br>

## Pre ERD Database Layout:<br>
![oldERD](https://github.com/iwantmyhatback/sdc_etl/blob/master/img/old_erd.png)

## ETL Process Breakdown
### Transforming Data from Old Datatbase Tables into the New Database Tables
![ETLexplained](https://github.com/iwantmyhatback/sdc_etl/blob/master/img/ETLexplanation.png)

## Post ERD Database Layout:<br>
![currentERD][ERD]

[ERD]: https://github.com/iwantmyhatback/sdc_etl/blob/master/img/current_erd.png "reviews-erd"
