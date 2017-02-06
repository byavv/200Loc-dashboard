import { Component } from '@angular/core';

@Component({
    template: `
       
    <div class="l-groups" flexy [bottom]='50'>
        <div class="l__page-header">
            <span class="title">Groups</span>
        </div>
        <div class='l__page-body'>
            <div class="groups">
                <h4>// TBD</h4>
                <router-outlet></router-outlet>   
            </div> 
        </div> 
    </div>  
     
    `
})
export class GroupsBaseComponent { }