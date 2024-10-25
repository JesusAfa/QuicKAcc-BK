import 'dotenv/config';
import * as joi from 'joi';

/**
 * The environment variables type.
 */
type EnvType = {
  DB_HOST: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_DATABASE: string;
  AWS_BUCKET: string;
  AWS_ACCESS_KEY: string;
  AWS_SECRET_KEY: string;
  AWS_REGION: string;
  NODE_ENV: string;
};

/**
 * The environment variables schema.
 */
const envSchema = joi
  .object({
    DB_HOST: joi.string().required(),
    DB_USERNAME: joi.string().required(),
    DB_PASSWORD: joi.string().required(),
    DB_DATABASE: joi.string().required(),
    AWS_BUCKET: joi.string(),
    AWS_ACCESS_KEY: joi.string(),
    AWS_SECRET_KEY: joi.string(),
    AWS_REGION: joi.string(),
    NODE_ENV: joi.string().required(),
  })
  .unknown(true);

/**
 * The environment variables validation result.
 */
const { error, value } = envSchema.validate(process.env);

/**
 * Throws an error if the environment variables are invalid.
 */
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

/**
 * The environment variables.
 */
const envsVars: EnvType = value;

/**
 * The environment variables exports.
 */
export const envs = {
  DB_HOST: envsVars.DB_HOST,
  DB_USERNAME: envsVars.DB_USERNAME,
  DB_PASSWORD: envsVars.DB_PASSWORD,
  DB_DATABASE: envsVars.DB_DATABASE,
  AWS_BUCKET: envsVars.AWS_BUCKET,
  AWS_ACCESS_KEY: envsVars.AWS_ACCESS_KEY,
  AWS_SECRET_KEY: envsVars.AWS_SECRET_KEY,
  AWS_REGION: envsVars.AWS_REGION,
  NODE_ENV: envsVars.NODE_ENV,
};
