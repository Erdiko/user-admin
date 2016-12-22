 import { Injectable }             from '@angular/core';
 import { Router, Resolve,
          ActivatedRouteSnapshot } from '@angular/router';

 import { Reward }           from '../shared/models/reward.model';
 import { RewardService }    from '../shared/reward.service';

 @Injectable()
 export class RewardDetailResolve implements Resolve<Reward> {

   constructor(private rs: RewardService, private router: Router) {}

   resolve(route: ActivatedRouteSnapshot): Promise<Reward>|boolean {
     let id = route.params['id'];
     return this.rs.getReward(id).then(reward => {
       if (reward) {
         return reward;
       } else {
         this.router.navigate(['']);
         return false;
       }
     });
   }

 }
