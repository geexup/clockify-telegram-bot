import { CKLProject } from 'clockify-api/dist/interfaces/project.interface';

export enum FILL_DAY_STATE {
  PROJECT_SELECT = 'PROJECT_SELECT',
  HOURS_SELECT = 'HOURS_SELECT'
}

export interface IFillDayState {
  stateName: FILL_DAY_STATE;
  projects: Array<CKLProject>;
  project?: CKLProject;
}
