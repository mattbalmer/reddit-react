import { Config } from '@env/index';
import { Environment } from '@lib/types';
import { capsule } from '@client/services/StorageService';

if (Config.ENV === Environment.LOCAL) {
  window['Config'] = Config;
  window['capsule'] = capsule;
}