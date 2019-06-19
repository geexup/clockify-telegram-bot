import { CKLId } from 'clockify-api/dist/interfaces/id.type';
import { CKLProject } from 'clockify-api/dist/interfaces/project.interface';
import { ContextMessageUpdate } from 'telegraf';
import { getClockify } from '../../../utils/get-clockify';

const PAGE_SIZE = 12;

export async function getProjects(ctx: ContextMessageUpdate, workspace: CKLId, page: number): Promise<{
  previous: boolean;
  next: boolean;
  projects: Array<CKLProject>
}> {
  const projects = await getClockify(ctx)
    .workspaces(workspace)
    .projects
    .get({
      page,
      'page-size': PAGE_SIZE + 1
    });

  return {
    next: projects.length > PAGE_SIZE,
    previous: page > 1,
    projects: projects.slice(1)
  };
}
