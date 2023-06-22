'use strict';

const AWS = require('aws-sdk');
const sharp = require('sharp');
const { basename, extname } = require('path')

const S3 = new AWS.S3()

module.exports.handler = async ({ Records: records }) => {
  try {
    await Promise.all(records.map(async record => {
      try {
        const key = decodeURI(record.s3.object.key);
        const userSub = key.split("/")[1]
        
        console.log('Object being processed', key)
        
        const image = await S3.getObject({
          Bucket: process.env.bucket,
          Key: key
        }).promise()

        
        const optimized = await sharp(image.Body)
          .resize(1280, 720, { fit: 'inside', withoutEnlargement: true })
          .toFormat('jpeg', { progressive: true, quality: 50 })
          .toBuffer()

        await S3.putObject({
          Body: optimized,
          Bucket: process.env.bucket,
          ContentType: 'image/jpeg',
          Metadata: {
            originalObjectKey: key
          },
          Key: `optimized/${userSub}/${basename(key, extname(key))}.jpeg`
        }).promise()

      } catch (error) {
        console.log('Error processing optimizing image: ', error)
      }

    }))

    return {
      statusCode: 301,
      body: {

      }
    }
  } catch (error) {
    console.log('Error executing the lambda: ', error)
    return error
  }
};