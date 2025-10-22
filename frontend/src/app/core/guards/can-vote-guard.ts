import { CanActivateFn } from '@angular/router';

export const canVoteGuard: CanActivateFn = (route, state) => {
  return true;
};
