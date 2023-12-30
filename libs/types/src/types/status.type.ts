import { Common } from './common.type';

export interface Status extends Common {
  id: string;
  name: string;
  description: string;
  color: string;
}
