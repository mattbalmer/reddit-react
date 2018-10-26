import { Config } from '@env/index';
import { Capsule } from '@lib/capsule';

const capsule = new Capsule(`${Config.PROJECT_NAME}:${Config.ENV}`, {});

export {
  capsule,
}
