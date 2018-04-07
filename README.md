# gatsby-starter-dimension
Gatsby starter based on the Dimension site template, designed by [HTML5 UP](https://html5up.net/dimension). Check out https://codebushi.com/gatsby-starters/ for more Gatsby starters and templates.

## Preview
http://gatsby-dimension.surge.sh/

## Installation

1. Clone repo
2. Install dependencies using `npm install`
3. Run `gatsby develop` in the terminal to start.

## Deployment

1. Ensure you have added your credentials to file `~/.aws/credentials`
2. Set NPM_CONFIG_S3_BUCKET="your bucket name goes here" environment variable
3. Set NPM_CONFIG_AWS_CLOUDFRONT_ID="your aws cloudfront id goes here" environment variable (npm will now pick these up when running commands)
3. Run `gatsby deploy` in the terminal, this will deploy the latest static code to S3 on AWS